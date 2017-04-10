/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      'npm:': 'node_modules/',
      //'rxjs/*': 'node_modules/rxjs/*.js',
      //'rxjs*': 'node_modules/rxjs/bundles/Rx.min.js'
    },
    map: {
      // our app is within the app folder
      'app': 'build/js',
      //'rx': 'build/rxjs',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      //'@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // other libraries
      //'rxjs':                      'npm:rxjs',
      //'rxjs':               'node_modules/rxjs',
      //'rxjs-bundle':               'build/rxjs/rx.js',
      'typescript': 'npm:typescript/lib/typescript.js',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    },
    packages: {
      app: {
        format: 'register',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: false
      }
    },
    bundles: {
      'build/js/app.js': ['main', 'geodash-viewer-angular.git/src/main'],
      "npm:rxjs-system-bundle/Rx.system.min.js": [
        "rxjs",
        "rxjs/*",
        "rxjs/operator/*",
        "rxjs/observable/*",
        "rxjs/scheduler/*",
        "rxjs/symbol/*",
        "rxjs/add/operator/*",
        "rxjs/add/observable/*",
        "rxjs/util/*"
      ]
    }
  });
})(this);
