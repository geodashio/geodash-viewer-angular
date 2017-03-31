const gulp = require('gulp');
const del = require('del');
const tsc = require('gulp-typescript');
//const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
//const tsconfig = require('tsconfig-glob');

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

var rootConfig = geodash.load.file("./config.yml", cwd);

geodash.log.debug(["rootConfig", JSON.stringify(rootConfig)], argv);

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
var ts_options = extract("compiler.ts", rootConfig, {});
ts_options["typescript"] = require("typescript");

var polyfill_files = extract("src.js.polyfill", rootConfig);
if(polyfill_files != undefined)
{
  polyfill_files = polyfill_files.map(function(x){
    return geodash.expand.home(geodash.resolve.path(x, cwd));
  });
}
geodash.log.debug(["polyfill_files: ", JSON.stringify(polyfill_files)], argv);

var template_files = extract("src.template", rootConfig);
if(template_files != undefined)
{
  template_files = template_files.map(function(x){
    return geodash.expand.home(geodash.resolve.path(x, cwd));
  });
}
geodash.log.debug(["template_files: ", JSON.stringify(template_files)], argv);

var less_files = extract("src.less", rootConfig);
if(less_files != undefined)
{
  less_files = less_files.map(function(x){
    return geodash.expand.home(geodash.resolve.path(x, cwd));
  });
}
geodash.log.debug(["less_files: ", JSON.stringify(less_files)], argv);

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
  return geodash.compile.less({
    src: less_files,
    dest: "build/css/",
    outfile: "app.css",
    paths: "./src/less/"
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
  return gulp.src(template_files)
      .pipe(templateCache('templates.js', {
        templateHeader: 'geodash.templates = {static:{}};\n',
        templateBody: 'geodash.templates.static["<%= url %>"] = "<%= contents %>";',
        templateFooter: '\n'
      }))
      .pipe(gulp.dest("build/templates/"));
});

gulp.task('compile:app.js', ['clean'], function () {
  return gulp.src(ts_files)
    .pipe(sourcemaps.init())
    .pipe(tsc(ts_options))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('default', [
  'clean',
  'lint:ts',
  'compile:resources',
  'compile:app.css',
  'compile:polyfill.js',
  'compile:templates.js',
  'compile:app.js'
]);
