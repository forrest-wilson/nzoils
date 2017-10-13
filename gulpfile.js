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
    notify = require("gulp-notify"),
    autoprefixer = require("gulp-autoprefixer"),
    imagemin = require("gulp-imagemin");

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
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
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
        removeComments: true
    }))
    .pipe(replace('node_modules/normalize.css/normalize.css', 'https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css'))
    .pipe(replace('css/style.css', 'css/style.min.css'))
    .pipe(replace('src="node_modules/jquery/dist/jquery.min.js">', 'src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous">'))
    .pipe(replace('js/app.js', 'js/app.min.js'))
    .pipe(gulp.dest('./dist/'));
});

// Minifies and compresses images for production
gulp.task("imagemin", () => {
    gulp.src("./src/img/**/*.*")
    // .pipe(imagemin([
    //     imagemin.gifsicle({interlaced: true}),
    //     imagemin.jpegtran({progressive: true}),
    //     imagemin.optipng({optimizationLevel: 5}),
    //     imagemin.svgo({
    //         plugins: [
    //             {
    //                 removeViewBox: true
    //             },
    //             {
    //                 cleanupIDs: false
    //             }
    //         ]
    //     })
    // ]))
    .pipe(gulp.dest("./dist/img/"));
});

// Configures the BrowserSync NPM module
gulp.task("browser-sync", () => {
    browserSync.init({
        server: {
            baseDir: 'dist', // Where the server will start from
            index: 'index.html' // Default file to load
        },
        port: 3000, // Using the default port. Change if needed but don't commit
        ui: {
            port: 3001 // Using the default port. Change if needed but don't commit
        },
        notify: false, // Turns off the notification that the browser has connected to BrowserSync server
        browser: [] // Enter a string or an array of strings to start specific browsers i.e. "google chrome", "safari" or "firefox". Keeping it empty will stop any browsers from opening
    });
});

// Reloads the browser
gulp.task("reload-browser", () => {
    gulp.src("./dist/")
    .pipe(browserSync.reload({
        stream: true
    }));
});

// Builds the above tasks and runs them sequentially
gulp.task("build:dist", (callback) => {
    runSequence("clean", "sass", "js-compress", "htmlmin", "imagemin", "reload-browser", callback);
});

// The initial task that is called
gulp.task("start", ["build:dist", "browser-sync"], (callback) => {
    gulp.watch("./src/**/*.*", ["build:dist"], callback);
});