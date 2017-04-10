const gulp = require('gulp');
const del = require('del');
const tsc = require('gulp-typescript');
//const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const browserSync = require('browser-sync');
const replace = require("gulp-replace");
const reload = browserSync.reload;

var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;

//const tsconfig = require('tsconfig-glob');
//var webpack = require('webpack');

var Builder = require('systemjs-builder');
var yaml = require("yamljs");
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');
var merge = require('merge');
var argv = require('yargs').argv;
var yaml = require("yamljs");
var geodash = require("geodash-build-pipeline");
var extract = require("geodash-extract");
var showdown = require("showdown");
var templateCache = require('gulp-angular-templatecache');
showdown.setFlavor('github');
showdown.setOption("prefixHeaderId", "");

var cwd = __dirname;
var ts = (new Date).getTime();

//var variables = {};
var s3 = undefined;
var s3_src_files = undefined;
var s3_patch_targets = undefined;
var s3_patch_files = undefined;

geodash.log.debug(["Extensions supported by require", JSON.stringify(Object.keys(require.extensions))], argv);

var rootConfig = geodash.load.file("./config.yml", cwd);

var system_files = extract("system.files", rootConfig, []);

s3_src_files = extract("s3.src.files", rootConfig);
s3_patch_targets = extract("s3.patch.targets", rootConfig, ["index.html"]);
s3_patch_files = extract("s3.patch.files", rootConfig);

if(argv != undefined && (argv.publish == true || argv.publish == "true" || argv.publish == "t"))
{
  var s3_config = {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: "us-west-1"
  };
  geodash.log.info(["S3 Config \""+JSON.stringify(s3_config)+"\"."]);
  s3 = require('gulp-s3-upload')(s3_config);
}

geodash.log.debug(["rootConfig", yaml.stringify(rootConfig, 8, 2)], argv);

var resources = extract("resources", rootConfig);
if(resources != undefined)
{
  resources = resources.map(function(x){
    return geodash.expand.home(geodash.resolve.path(x, cwd));
  });
}
geodash.log.debug(["resources: ", JSON.stringify(resources)], argv);

var ts_files = extract("src.ts", rootConfig);
if(ts_files != undefined)
{
  ts_files = ts_files.map(function(x){
    return geodash.expand.home(geodash.resolve.path(x, cwd));
  });
}
geodash.log.debug(["ts_files: ", JSON.stringify(ts_files)], argv);
/*
var ts_options = extract("compiler.ts", rootConfig, {});
ts_options["typescript"] = require("typescript");
*/

/*
var rxjs_options = extract("compiler.rxjs", rootConfig, {});
rxjs_options["typescript"] = require("typescript");
*/

var polyfill_files = extract("src.js.polyfill", rootConfig);
if(polyfill_files != undefined)
{
  polyfill_files = polyfill_files.map(function(x){
    return geodash.expand.home(geodash.resolve.path(x, cwd));
  });
}
geodash.log.debug(["polyfill_files: ", JSON.stringify(polyfill_files)], argv);

/*
var template_files = extract("src.template", rootConfig);
if(template_files != undefined)
{
  template_files = template_files.map(function(x){
    return geodash.expand.home(geodash.resolve.path(x, cwd));
  });
}
geodash.log.debug(["template_files: ", JSON.stringify(template_files)], argv);
*/
/*
var less_files = extract("src.less", rootConfig);
if(less_files != undefined)
{
  less_files = less_files.map(function(x){
    return geodash.expand.home(geodash.resolve.path(x, cwd));
  });
}
geodash.log.debug(["less_files: ", JSON.stringify(less_files)], argv);
*/

var deps_bundle = extract(["build", "deps.bundle.js"], rootConfig);

geodash.log.debug(["deps_bundle: ", JSON.stringify(deps_bundle)], argv);

//var webpackConfig = require(extract(["compiler", "webpack", "config"], rootConfig));

var plugins = rootConfig["plugins"];

var project_components = [];
var project_pipes = [];
var project_services = [];
var project_templates = [];
var project_less = [];

for(var j = 0; j < plugins.length; j++)
{
  var pluginName = plugins[j];
  var pluginPath = undefined;
  if(typeof pluginName != "string")
  {
    var uri = pluginName.uri || pluginName.url;
    geodash.log.debug('Plugin '+i+'.'+j+': '+uri, argv);
    if(uri.startsWith("file://"))
    {
      pluginPath = geodash.expand.home(geodash.resolve.path(path.join(uri.slice(6), "config.yml"), cwd));
    }
  }
  else
  {
    geodash.log.debug('Plugin '+j+': '+pluginName, argv);
    if(pluginName.startsWith("file://"))
    {
      pluginPath = geodash.expand.home(geodash.resolve.path(path.join(pluginName.slice(6), "config.yml"), cwd));
    }
  }

  if(pluginPath != undefined)
  {
    geodash.log.debug('Loading plugin from '+pluginPath, argv);
    var geodash_plugin = geodash.load.file(pluginPath, cwd);
    if(geodash_plugin == null || geodash_plugin == undefined)
    {
      geodash.log.error('Could not load plugin '+i+'.'+j+' '+ pluginName);
    }

    var files = geodash.collect.files_all(pluginPath, geodash_plugin, [
      "components",
      "pipes",
      "services",
      "templates",
      "less"
    ]);

    project_components = project_components.concat(files["components"]);
    project_pipes = project_pipes.concat(files["pipes"]);
    //project_schemas = project_schemas.concat(geodash.collect.objects(pluginPath, geodash_plugin, "schemas"));
    project_services = project_services.concat(files["services"]);
    project_templates = project_templates.concat(files["templates"]);
    project_less = project_less.concat(files["less"]);

  }
}

var project_files = [].concat(
  project_components,
  project_pipes,
  project_services
);

//variables['compile_less'] = project_less;
//geodash.log.info(["project_less: ", JSON.stringify(project_less)]);

/* Tasks Start Here */

gulp.task('clean', [], function () {
  return del([
    './temp/**/*',
    './build/**/*'
  ]);
});

gulp.task('lint:ts', [], function() {
  return gulp.src(ts_files)
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('compile:resources', ['clean'], function() {
  return gulp.src(resources).pipe(gulp.dest('./build/resources'))
});

gulp.task('compile:app.css', ['clean'], function () {
  var src = extract(["build", "app.css", "src"], rootConfig, []).concat(project_less);
  return geodash.compile.less({
    src: src,
    dest: extract(["build", "app.css", "dest"], rootConfig, "build/css/"),
    outfile: extract(["build", "app.css", "outfile"], rootConfig, "app.css"),
    paths: extract(["build", "app.css", "paths"], rootConfig, "./src/less/")
  });
});

gulp.task('compile:polyfill.js', ['clean'], function () {
  return geodash.compile.js({
    src: polyfill_files,
    dest: "build/js/",
    outfile: "polyfill.js",
    uglify: true
  });
});

gulp.task('compile:templates.js', ['clean'], function () {
  var outfile = extract(["build", "templates.js", "outfile"], rootConfig, "templates.js");
  var dest = extract(["build", "templates.js", "dest"], rootConfig, "build/templates/");
  return gulp.src(project_templates)
      .pipe(templateCache(outfile, {
        templateHeader: 'geodash.templates = {static:{}};\n',
        templateBody: 'geodash.templates.static["<%= url %>"] = "<%= contents %>";',
        templateFooter: '\n'
      }))
      .pipe(gulp.dest(dest));
});

gulp.task('compile:geodash.config.js', ['clean'], function () {
  return geodash.compile.js({
    "src": ["src/js/geodash.config.js"],
    "dest": "build/js/",
    "outfile": "geodash.config.js",
    "uglify": true
  });
});

gulp.task('compile:app.js', ['clean'], function () {
  var src = extract(["build", "app.js", "src"], rootConfig, []);
  src = src.concat(project_files);
  //geodash.log.info(['src:\n', src]);
  //geodash.log.info(['paths:\n', yaml.stringify(paths, 8, 2)]);
  var paths = {
    "@angular/core": ["node_modules/@angular/core"],
    "@angular/http": ["node_modules/@angular/http"],
    "rxjs/Rx": ["node_modules/rxjs"]
  };
  for(var i = 0; i < project_files.length; i++)
  {
    var parts = path.parse(project_files[i]);
    paths[parts.name] = [parts.dir+"/"+parts.name];
  }
  var outfile = extract(["build", "app.js", "outfile"], rootConfig, "app.js");
  var ts_options = {
    typescript: require("typescript"),
    outFile: outfile,
    target: 'es5',
    module: 'system',
    moduleResolution: 'node',
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    lib: ['es2015', 'dom'],
    noImplicitAny: true,
    suppressImplicitAnyIndexErrors: true,
    baseUrl: ".",
    paths: paths
  };
  var dest = extract(["build", "app.js", "dest"], rootConfig, "build/js");
  return gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(tsc(ts_options))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest));
});

/*gulp.task('compile:webpack', ['clean'], function (callback) {
  webpack(webpackConfig, function (err, stats) {
    if (err)
    {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build] Completed\n' + stats.toString({
      assets: true,
      chunks: false,
      chunkModules: false,
      colors: true,
      hash: false,
      timings: false,
      version: false
    }));
    callback();
  });
});*/

gulp.task('patch:tsconfig.base.json', ['clean'], function (cb) {
  var paths = {
    "@angular/core": ["./../node_modules/@angular/core"],
    "@angular/http": ["./../node_modules/@angular/http"],
    "rxjs/Rx": ["./../node_modules/rxjs"]
  };
  for(var i = 0; i < project_files.length; i++)
  {
    var parts = path.parse(project_files[i]);
    paths[parts.name] = [parts.dir+"/"+parts.name];
  }
  var tsconfig = geodash.load.file("src/tsconfig.base.json", cwd);
  tsconfig.compilerOptions.paths = paths;
  var text = JSON.stringify(tsconfig);
  fs.writeFileSync("src/tsconfig.base.json", text, undefined);
  cb(undefined);
});

gulp.task('compile:ng', ['patch:tsconfig.base.json'], function (cb) {
  exec("ng build", function(err, stdout, stderr){
    geodash.log.info(stdout);
    geodash.log.info(stderr);
    cb(err);
  });
});

gulp.task('compile:deps.bundle.js', ['clean', 'compile:templates.js', 'compile:geodash.config.js'], function () {
  if(typeof deps_bundle != "undefined")
  {
    return geodash.compile.js({
      "src": deps_bundle.src.map(function(x){return geodash.resolve.path(x, cwd);}),
      "dest": geodash.expand.home(geodash.resolve.path(deps_bundle.dest, cwd)),
      "outfile": deps_bundle.outfile,
      "uglify": false
    });
  }
  else
  {
    return true;
  }
});

gulp.task('clean:system', [], function () {
  return del(['./build/system/**/*']);
});

gulp.task('compile:system', ['clean:system'], function() {
  return gulp.src(system_files).pipe(gulp.dest('./build/system'))
});

/*gulp.task('clean:angular', [], function () {
  return del(['./build/js/angular.js']);
});

gulp.task('compile:angular', ['clean:angular'], function () {
  return geodash.compile.js({
    "src": [
      "node_modules/@angular/core/bundles/core.umd.js",
      "node_modules/@angular/common/bundles/common.umd.js",
      "node_modules/@angular/compiler/bundles/compiler.umd.js",
      "node_modules/@angular/http/bundles/http.umd.js"
    ],
    "dest": "./build/js/",
    "outfile": "angular.js",
    "uglify": false
  });
});*/


gulp.task('publish:s3', ['compile:resources', 'compile:app.css', 'compile:deps.bundle.js', 'compile:app.js', 'compile:system', 'compile:ng'], function(){
  if(
    argv != undefined &&
    s3_src_files != undefined &&
    (argv.publish == true || argv.publish == "true" || argv.publish == "t")
  )
  {
    var prefix = path.join("cdn/geodash-viewer-angular", ""+ts);
    geodash.log.info(["Uploading to AWS S3."]);

    return gulp
      .src(s3_src_files, {base: './'})
      .pipe(s3({Bucket: "geodash", ACL: 'public-read', keyTransform: function(x){
        var s3_path = path.join(prefix, path.basename(x));
        geodash.log.info(["-- uploading "+x+" to "+s3_path+"."]);
        return s3_path;
      }},
      {
        maxRetries: 1,
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: "us-west-1",
        httpOptions : {
          timeout: 60000
        }
      }));
  }
  else
  {
    return false
  }
});

gulp.task('publish:patch', ['publish:s3'], function(){
  if(
    argv != undefined &&
    s3_patch_targets != undefined &&
    s3_patch_files &&
    (argv.publish == true || argv.publish == "true" || argv.publish == "t")
  )
  {
    var prefix_regex = "https:\\/\\/d2xfobv47glk4v.cloudfront.net\\/geodash-viewer-angular\\/";
    var prefix_repl = "https://d2xfobv47glk4v.cloudfront.net/geodash-viewer-angular/";
    return s3_patch_files.reduce(
      function(stream, filename) {
        return stream.pipe(replace(
          new RegExp(prefix_regex+"(.+)\\/"+filename, "g"),
          prefix_repl+ts+"/"+filename
        ));
      },
      gulp.src(s3_patch_targets, {base: './'})
    ).pipe(gulp.dest("./"));

    /*return gulp.src(["index.html"], {base: './'});
      .pipe(replace(
        new RegExp(prefix_regex+"(.+)\\/app.css", "g"),
        prefix_repl+ts+"/app.css"
      ))
      .pipe(replace(
        new RegExp(prefix_regex+"(.+)\\/polyfill.min.js", "g"),
        prefix_repl+ts+"/polyfill.min.js"
      ))
      .pipe(replace(
        new RegExp(prefix_regex+"(.+)\\/deps.bundle.js", "g"),
        prefix_repl+ts+"/deps.bundle.js"
      ))
      .pipe(replace(
        new RegExp(prefix_regex+"(.+)\\/system.js", "g"),
        prefix_repl+ts+"/system.js"
      ))
      .pipe(replace(
        new RegExp(prefix_regex+"(.+)\\/systemjs.config.js", "g"),
        prefix_repl+ts+"/systemjs.config.js"
      ))
      .pipe(gulp.dest("./"));*/
  }
  else
  {
    return false
  }
});

//gulp.task('clean:rxjs', [], function () {
//  return del(['./build/rxjs/**/*']);
//});

/* Not currently needed, using rxjs-system-bundle instead
gulp.task('compile:rxjs', ['clean:rxjs'], function () {
  return gulp.src(["node_modules/rxjs/src/Rx.ts"])
    .pipe(sourcemaps.init())
    .pipe(tsc(rxjs_options))
    .pipe(sourcemaps.write('.'))
    .pipe(replace("rxjs/src/", "rxjs/"))
    .pipe(gulp.dest('build/rxjs'));
});*/

/*
gulp.task('ng-bundle-rxjs', function(done) {

    var builder = new Builder('./', 'src/js/systemjs.config.js');
    builder
        .bundle([
            'node_modules/rxjs/add/observable/*.js',
            'node_modules/rxjs/add/operator/*.js',
            'node_modules/rxjs/observable/*.js',
            'node_modules/rxjs/operator/*.js',
            'node_modules/rxjs/scheduler/*.js',
            'node_modules/rxjs/symbol/*.js',
            'node_modules/rxjs/util/*.js',
            'node_modules/rxjs/*.js'
        ], 'build/js/rxjs.min.js', {
            minify: true,
            sourceMaps: true,
            mangle: false
        })
        .then(function() {
            console.log('Build complete');
            done();
        })
        .catch(function(err) {
            console.log('Build error');
            console.log(err);
            done();
        });
});
*/

gulp.task('default', [
  'clean',
  'lint:ts',
  'compile:resources',
  'compile:app.css',
  'compile:polyfill.js',
  'compile:templates.js',
  'compile:geodash.config.js',
  'patch:tsconfig.base.json',
  'compile:app.js',
  'compile:ng',
  'compile:deps.bundle.js',
  'compile:system',
  //'compile:angular',
  "publish:s3",
  "publish:patch"
]);
