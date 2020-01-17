const gulp = require('gulp');
const path = require("path");
const $ = require('gulp-load-plugins')({
  lazy: true
});
const browserSync = require('browser-sync');
const newer = require("gulp-newer");
const spawn = require("cross-spawn").spawn;
const del = require('del');
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const http_proxy = require('http-proxy-middleware');
const rename = require("gulp-rename");
const config = require('./gulp-config')();
const package = require("./package.json");
//const git = require('git-rev-sync');
const gutil = require('gulp-util');

const currentDateTime = new Date().toISOString();
const fs = require("fs");
var KarmaServer = require('karma').Server;

short = function() {    
  return currentDateTime.replace(/:/g, "");
}

const git = {
  short: short,
  long: short
}
const url = require('url');
const proxy = require('proxy-middleware');

//const beeper = require('beeper');

/**
 * utilities
 */
const notify = $.notify.withReporter((options, done) => {
  // silent reporter...
  done();
});

function clean(path) {
  return del([path], { force: true });
}

function cleanBuild() {
  return clean(config.build.root + "**/*");
}

function cleanRelease() {
  return clean(config.release.root + "**/*");  
}

function cleanRootFiles() {
  //deleting unused root files  
  return clean(config.build.root + git.short() + "/index.html");    
}

function baseHtml(isWatch) {
  const target = isWatch? config.build.root: config.build.root + git.short();    
    return gulp.src(config.src.root + "**/*.html")
    .pipe(gulp.dest(target))
    .pipe(
      browserSync.stream({
        once: true
      })
    );  
}

function html() {
  return baseHtml(false);
}

function htmlWatch() {
  return baseHtml(true);
}

function baseJson(isWatch) {
  const target = isWatch? config.build.root: config.build.root + git.short();
  return gulp.src(config.src.root + "**/*.json")
    .pipe(gulp.dest(target))
    .pipe(
      browserSync.stream({
        once: true
      })
    );
}

function json() {
  return baseJson(false);
}

function jsonWatch() {
  return baseJson(true);
}


function jsWatch() {
  return gulp.src(config.src.root + "**/*.js")
    .pipe(gulp.dest(config.build.root))
    .pipe(
      browserSync.stream({
        once: true
      })
    );
}

function rootFiles() {
  return gulp.src(config.src.root + "*.*")
    .pipe($.replace(/(['"])(js\/)/g, "$1" + git.short() + "/$2"))      
    .pipe($.replace(/(href=['"])css\//g, "$1" + git.short() + "/css/"))
    .pipe(gulp.dest(config.build.root))
    .pipe(
      browserSync.stream({
        once: true
      })
    );
}

function baseTsc(isWatch) {
  const target = isWatch? config.build.root + "js/": config.build.root + git.short() + "/js/";
  const releaseFiles = $.filter(['**/*.js', '!**/*.spec.js']);
  const tsProject = $.typescript.createProject(config.tsConfig);    
  return tsProject.src()
    .pipe($.newer({
      dest: target,
      ext: '.js'
    }))
    /*
    .pipe($.tslint({
      formatter: "verbose"
    }))    
    .pipe($.tslint.report())
    */
    .pipe($.sourcemaps.init())
    .pipe($.plumber({
      errorHandler: () => {
        notify('"TSC_ERROR", "There was a tsc error, look at the logs..."');
         //beeper(3);;
        //throw new $.util.PluginError("TSC_ERROR", "There was a tsc error, look at the logs...");
      }
    }))
    .pipe(tsProject()).js
    .pipe($.plumber.stop())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(target))    
    .pipe(releaseFiles)
    .pipe($.uglify())
    .pipe(browserSync.stream({
      once: true
    }));
}

function tsc() {
  return baseTsc(false);
}

function tscWatch() {
  return baseTsc(true);
}

function baseScss(isWatch) {
  const target = isWatch? config.build.root: config.build.root + git.short();
  return gulp
    .src(config.src.root + "**/*.scss")
    .pipe(
      newer({
        dest: config.build.root,
        ext: ".css"
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "expanded",
        includePaths: [
          config.src.root + "css/",
          config.nodeModules + "@oracle/oraclejet/dist/scss/"
          ],
        sourcemap: true
      })
    )
    .on("error", sass.logError)
    .pipe(autoprefixer(config.autoprefixerOptions))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(target))
    .pipe(browserSync.stream());
}

function scss() {
  return baseScss(false);
}

function scssWatch() {
  return baseScss(true);
}

function copyLibs() {
  let libs = [];
  for (let lib in package.dependencies) {
    libs.push(lib + "/**");
  }
  gutil.log(libs);
  const libPath = config.build.root + git.short() + "/js";
  gutil.log(libPath);
  gutil.log(config.nodeModules + libs.join(","));
  gutil.log(config.nodeModules + "{" + libs.join(",") + "}");
  gutil.log(libPath + "/libs/" + libs.join(",").replace(/(.+)\*\*/, "$1"));

  return gulp.src(path.resolve(config.nodeModules, "{" + libs.join(",") + "}"))
    .pipe(gulp.dest(path.resolve(libPath, "libs/")));     
}

function copyWebInf() {  
  return gulp.src(config.webInf)        
  .pipe(gulp.dest(config.release.webInf));  
}

function prepareRJS() {
  return gulp.src("require.build.js")
  .pipe($.replace(/baseUrl:\s['"]\.\/([^'"]+)['"],/, 'baseUrl: "./' + git.short() + '/$1",'))
  .pipe($.rename("require.out.js"))
  .pipe(gulp.dest('.'));
}

function removeOutJS() {
  return gulp.src('require.out.js')
    .pipe($.clean({ force: true }));
}

function optimize() {  
  const rJsPath = "./node_modules/.bin/r_js";
  return spawn(rJsPath, ["-o", "require.out.js"], { stdio: "inherit", stderr: "inherit" });  
}

function war() {
  return gulp.src(config.release.root + '**/*')
    .pipe($.war({
      welcome: 'index.html',
      displayName: 'TypeScriptSample'      
    }))    
    .pipe($.zip('typescript.sample' + git.long() + '.war'))    
    .pipe(gulp.dest(config.release.root))
  //    .pipe(notify('WAR file completed (<%= file.relative %>)'))
  ;
}

function baseOther(isWatch) {
  const target = isWatch? config.build.root: config.build.root + git.short();
  return gulp.src(config.otherFiles, {
      since: gulp.lastRun(other)
    })
    .pipe(gulp.dest(target));
}

function other() {
  return baseOther(false);
}

function otherWatch() {
  return baseOther(true);
}

function imagesWatch() {
  return gulp.src(config.src.root + '**/*.svg')          
    .pipe(gulp.dest(config.build.root))
    .pipe(
      browserSync.stream({
        once: true
      })
    );
}

function libs() {
  return gulp.src(config.bowerComponents)
    .pipe($.newer(config.release.libs))
    .pipe(gulp.dest(config.release.libs));
}

function startBrowserSync(baseDir, routes) {
  
  var remoteServiceProxyOptions = url.parse('http://slc13myy.us.oracle.com:7213/oalcrm/web/ISRService/');  
  remoteServiceProxyOptions.route = '/oalcrm/web/ISRService/';  
  
  browserSync.init({
    injectChanges: true,
    ui: false,
    notify: false,
    ghostMode: false,
    server: {
      baseDir: baseDir,
      routes: routes,
      middleware: [        
        proxy(remoteServiceProxyOptions),                        
      ]
    }
  });
}

function serveRelease() {
  startBrowserSync(config.release.root, {});
}

function watch() {    
  const npmLibPath = "/js/libs/";  
  var libPathObj = {};
  libPathObj[npmLibPath] = config.nodeModules;
  console.log(config.build.root);
  console.log(config.src.root);
  console.log(libPathObj);
  startBrowserSync(config.build.root, libPathObj);    
  gulp.watch(config.src.root + "**/*.html", htmlWatch);
  gulp.watch(config.src.root + "**/*.ts", tscWatch);
  gulp.watch(config.src.root + "**/*.scss", scssWatch);
  gulp.watch(config.src.root + "**/*.json", jsonWatch);  
  gulp.watch(config.src.root + "**/*.js", jsWatch);  
  gulp.watch(config.src.root + "**/*.svg", imagesWatch);   
}

const build = gulp.series(
  cleanBuild, 
  gulp.parallel(html, tsc, scss, other, rootFiles),
  cleanRootFiles  
);

const buildWatch = gulp.series(
  cleanBuild, 
  gulp.parallel(htmlWatch, tscWatch, scssWatch, otherWatch)
);

function karma(done) {
  // console.log("path:", config.build.root + git.short()) ;
   new KarmaServer({
     configFile: require('path').resolve('test/karma.conf.js'),
     myPath: fs.existsSync(config.build.root + git.short())?git.short():"" 
   }, function(exitCode) {
         done();
         process.exit(exitCode);
   }).start();
 }
 

gulp.task("default", gulp.series(build, watch));
gulp.task("watch", gulp.series(buildWatch, watch));
gulp.task("build", build);
gulp.task("release", gulp.series(cleanRelease, build, copyLibs, prepareRJS, optimize, removeOutJS, copyWebInf, war));
gulp.task("watch-release", serveRelease);
gulp.task('test', gulp.series(build, karma));
