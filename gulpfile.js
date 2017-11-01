'use strict';

// Variable Declarations
var gulp = require("gulp"),
    clean = require("gulp-clean"),
    sass = require("gulp-sass"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    htmlmin = require("gulp-htmlmin"),
    runSequence = require("run-sequence"),
    browserSync = require("browser-sync").create(),
    notify = require("gulp-notify"),
    autoprefixer = require("gulp-autoprefixer"),
    imagemin = require("gulp-imagemin"),
    sourcemaps = require("gulp-sourcemaps"),
    replace = require("gulp-replace");

//////////////////////////////////
//// BUILDING THE TEMP FOLDER ////
//////////////////////////////////

// Cleans the temp directory
gulp.task("clean", () => {
    return gulp.src("./temp", { read: false })
    .pipe(clean());
});

// Copies normalize.css from node_modules
gulp.task("normalize-copy", () => {
    return gulp.src("./node_modules/normalize.css/normalize.css")
    .pipe(gulp.dest("./temp/css/"));
});

// Compiles SASS files and copies to the temp folder
gulp.task("sass-to-css", () => {
    return gulp.src("./src/sass/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass()
    .on("error", sass.logError && notify.onError({
        title: "SASS Compilation Error",
        message: "<%= error.message %>"
    })))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write(""))
    .pipe(gulp.dest("./temp/css/"));
});

// Copies JS to the temp folder
gulp.task("js-copy", () => {
    return gulp.src("./src/js/app.js")
    .pipe(gulp.dest("./temp/js/"));
});

// Copy minified jQuery from node_modules
gulp.task("jquery-copy", () => {
    return gulp.src("./node_modules/jquery/dist/jquery.min.js")
    .pipe(gulp.dest("./temp/js"))
});

// Copies HTML to the temp folder
gulp.task("html-copy", () => {
    return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./temp/'));
});

// Copies Images to the temp folder
gulp.task("image-copy", () => {
    return gulp.src("./src/img/**/*.*")
    .pipe(gulp.dest("./temp/img/"));
});

// Copies the .otf and .ttf fonts to the temp folder
gulp.task("font-copy", () => {
    gulp.src("./src/fonts/**/*.otf")
    .pipe(gulp.dest("./temp/fonts/"));

    gulp.src("./src/fonts/**/*.ttf")
    .pipe(gulp.dest("./temp/fonts/"));
});

// Copies favicon to the temp folder
gulp.task("favicon", () => {
    gulp.src("./src/favicon.png")
    .pipe(gulp.dest("./temp/"));
});

// Configures the BrowserSync NPM module
gulp.task("browser-sync", () => {
    browserSync.init({
        server: {
            baseDir: 'temp', // Where the server will start from
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
    gulp.src("./temp/")
    .pipe(browserSync.reload({
        stream: true
    }));
});

// Builds the temp folder
gulp.task("build:temp", (callback) => {
    runSequence("clean", "normalize-copy", "sass-to-css", "jquery-copy", "js-copy", "html-copy", "image-copy", "font-copy", "favicon", "reload-browser", callback);
});

// The initial task that is called
gulp.task("start", ["build:temp", "browser-sync"], (callback) => {
    gulp.watch("./src/**/*.*", ["build:temp"], callback);
});

//////////////////////////////////
//// BUILDING THE DIST FOLDER ////
//////////////////////////////////

// Cleans the distribution folder in preperation for new release
gulp.task("clean-dist", () => {
    return gulp.src("./dist")
    .pipe(clean());
});

// Minifies the CSS found in the temp/css folder
gulp.task("minify-css", () => {
    return gulp.src("./temp/css/style.css")
    .pipe(sass({
        outputStyle: "compressed"
    })
    .on("error", sass.logError && notify.onError({
        title: "CSS Minification Error",
        message: "<%= error.message %>"
    })))
    .pipe(replace('@font-face{font-family:"Roboto";src:url("../fonts/Roboto/Roboto-Regular.ttf"),url("../fonts/Roboto/Roboto-Bold.ttf")}', ''))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./dist/css/"));
});

// Minifies the JS found in the temp/js folder
gulp.task("minify-js", () => {
    return gulp.src("./temp/js/app.js")
    .pipe(uglify())
    .pipe(rename("app.min.js"))
    .pipe(gulp.dest("./dist/js/"));
});

// Minifies the HTML code and replaces local links with CDN links
gulp.task("minify-html", () => {
    return gulp.src("./temp/*.html")
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
    }))
    .pipe(replace('<link rel="stylesheet" type="application/x-font-ttf" href="fonts/Roboto/Roboto-Regular.ttf"><link rel="stylesheet" type="application/x-font-ttf" href="fonts/Roboto/Roboto-Bold.ttf">', '<link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">'))
    .pipe(replace('css/normalize.css', 'https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css'))
    .pipe(replace('js/jquery.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'))
    .pipe(replace('style.css', 'style.min.css'))
    .pipe(replace('app.js', 'app.min.js'))
    .pipe(gulp.dest("./dist/"));
});

// Copies the favicon to the root directory
gulp.task("copy-favicon", () => {
    return gulp.src("./temp/favicon.png")
    .pipe(gulp.dest("./dist/"))
});

// Copies Images
gulp.task("dist-images", () => {
    return gulp.src("./temp/img/**/*.*")
    .pipe(gulp.dest("./dist/img/"));
});

// Copies the .otf and .ttf fonts
gulp.task("dist-font", () => {
    gulp.src("./temp/fonts/beyond_the_mountains/*.otf")
    .pipe(gulp.dest("./dist/fonts/beyond_the_mountains"));

    gulp.src("./temp/fonts/beyond_the_mountains/*.ttf")
    .pipe(gulp.dest("./dist/fonts/beyond_the_mountains"));
});

// Builds the dist folder for distribution
gulp.task("build:dist", (callback) => {
    runSequence("build:temp", "clean-dist", "minify-css", "minify-js", "minify-html", "copy-favicon", "dist-images", "dist-font", callback);
});