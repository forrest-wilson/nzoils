'use strict';

// Variable Declarations
var gulp = require("gulp"),
    clean = require("gulp-clean"),
    sass = require("gulp-sass"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    htmlmin = require("gulp-htmlmin"),
    replace = require("gulp-replace"),
    runSequence = require("run-sequence"),
    browserSync = require("browser-sync").create(),
    notify = require("gulp-notify");

// Cleans the dist directory
gulp.task("clean", () => {
    return gulp.src("./dist", { read: false })
    .pipe(clean());
});

// Compiles SASS files and produces a minified style.min.css
gulp.task("sass", () => {
    return gulp.src("./src/sass/*.scss")
    .pipe(sass({
        outputStyle: "compressed"
    })
    .on("error", sass.logError && notify.onError({
        title: "SASS Compilation Error",
        message: "<%= error.message %>"
    })))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./dist/css/"));
});

// Minifies JS
gulp.task("js-compress", () => {
    return gulp.src("./src/js/app.js")
    .pipe(uglify())
    .on("error", notify.onError({
        title: "JS Minification Error",
        message: "<%= error.message %>"
    }))
    .pipe(rename("app.min.js"))
    .pipe(gulp.dest("./dist/js/"));
});

// Minifies HTML and replaces local script files with CDN and minified versions
gulp.task("htmlmin", () => {
    return gulp.src('./src/**/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyElements: true
    }))
    .pipe(replace('css/normalize.css', 'https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css'))
    .pipe(replace('css/style.css', 'css/style.min.css'))
    .pipe(replace('src="js/jquery-3.2.1.min.js">', 'src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous">'))
    .pipe(replace('js/app.js', 'js/app.min.js'))
    .pipe(gulp.dest('./dist/'));
});

// Configures the BrowserSync NPM module
gulp.task("browser-sync", () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
});

// Reloads the browser
gulp.task("reload-browser", () => {
    gulp.src("./dist/")
    .pipe(browserSync.reload({
        stream: true
    }));
});

// gulp.task("notify-success", () => {
//     gulp.src("./dist")
//     .pipe(notify({
//         title: "Success!",
//         message: "Project Successfully Built!"
//     }));
// });

// Builds the above tasks and runs them sequentially
gulp.task("build:dist", (callback) => {
    runSequence("clean", "sass", "js-compress", "htmlmin", "reload-browser", callback);
});

// The initial task that is called
gulp.task("start", ["build:dist", "browser-sync"], (callback) => {
    gulp.watch("./src/**/*.*", ["build:dist"], callback);
});