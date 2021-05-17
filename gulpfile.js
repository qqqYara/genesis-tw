'use strict';
const   gulp            = require('gulp'),                      // Сам сборщик Gulp
        pug             = require('gulp-pug'),                  // Пакет компиляции Pug (бывш. Jade)
        babel           = require('gulp-babel'),                // Пакет Babel
        rename          = require('gulp-rename'),               // Переименование файлов в Gulp
        concat          = require('gulp-concat'),               // конкатенация (соединение нескольких файлов в один файл JS)
        concatCss       = require('gulp-concat-css'),           // конкатенация (соединение нескольких файлов в один файл CSS)
        autoPrefixer    = require('gulp-autoprefixer'),         // Пакет расстановки вендорных перфиксов
        sourcemaps      = require('gulp-sourcemaps'),           // Sourcemaps
        uglify          = require('gulp-uglify'),               // Минификация JS-файлов
        sass            = require('gulp-sass'),                 // Компиляции SCSS-файлов в CSS-файлы, более стабильный
        scssLint        = require('gulp-scss-lint'),            // sass(scss) линтер
        // less            = require('gulp-less'),                 // Компиляции LESS-файлов в CSS-файлы
        imagemin        = require('gulp-imagemin'),             // Сжатие изображений в Gulp
        plumber         = require('gulp-plumber'),              // Настройка обработки ошибок в Gulp,
        debug           = require('gulp-debug'),                // дебаггер
        esLint          = require('gulp-eslint'),               // JS линтер
        cleaner         = require('gulp-clean'),
        browserSync     = require('browser-sync').create();     // 

var gcmq = require('gulp-group-css-media-queries');

/* Define paths & directories
 * ========================================================================= */

// var production = util.env.production || util.env.prod || false;
var devPath  = 'dist',
    biuldPath  = 'build';

var config = {
        env       : 'development',
        // production: production,

        src: {
                root         : 'src',
                templates    : 'src/html/*.pug',
                // styles       : 'src/styles/.s+(a|c)ss',
                styles       : 'src/styles/*.scss',
                scripts      : 'src/scripts/scripts.js',
                fonts        : 'src/fonts/**',
                images       : 'src/images/**',
                libraries    : 'src/libraries/**'
        },

        dist: {
                templates    : devPath,
                styles       : devPath + '/css',
                scripts      : devPath + '/js',
                images       : devPath + '/images',
                fonts        : devPath + '/fonts',
                libraries    : devPath + '/libraries'
        },

        prod: {
                templates    : biuldPath + '/html',
                styles       : biuldPath + '/css'
        },

        libraries: {
                scripts: [
                    'src/scripts/scripts.js'
                ],
                styles: [ ]

        },

        info: {
                name: '',
                description: '',
                author: {
                        name: 'Yaroslav Mitiuk',
                        url: ''
                }
        },
};


/* TEMPLATE / PUG TASKS
 * ------------------------------------------------------------------------- */

function html() {
    return gulp.src([config.src.templates])
        .pipe(plumber())
        .pipe(pug({
            pretty: '\t'
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest([config.dist.templates]))
}

function pages() {
    return gulp.src('src/html/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: '\t'
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest([config.dist.templates]))
}

/* STYLE / (SCSS) TASKS
 * ------------------------------------------------------------------------- */

function styles() {

    // sass.compiler = require('node-sass');
    return gulp.src([config.src.styles])
        .pipe(plumber())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        // .pipe(gcmq())
        .pipe(sass({
                // outputStyle: config.production ? 'compact' : 'expanded', // nested, expanded, compact, compressed
                outputStyle: 'compressed'
                // precision: 5
        }).on('error', sass.logError))
        .pipe(autoPrefixer({
            browsers: ["last 12 versions", "> 1%", "ie 8", "ie 7"],
            cascade: false
        }))
        .pipe(rename('styles.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest([config.dist.styles]))
}

/* JAVASCRIPT TASKS
 * ------------------------------------------------------------------------- */

function scripts() {

    return gulp.src([config.src.scripts])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('script.js'))
        // .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest([config.dist.scripts]))

}

function scripts_libraries() {
    return gulp.src([
            'src/libraries/react/react.min.js',
            'src/libraries/reactDOM/reactDOM.min.js'
            // 'src/libraries/jquery-3.4.1/jquery-3.4.1.min.js',
            // 'src/libraries/bootstrap_4.5.0/dist/js/bootstrap.bundle.min.js',
            // 'src/libraries/fullPage-3.0.8/scrolloverflow.min.js',
            // 'src/libraries/fullPage-3.0.8/fullpage.min.js',
            // 'src/libraries/blazy-1.8.2/blazy.min.js'
            // 'src/libraries/swiper-4.5.3/js/swiper.min.js',
            // 'src/libraries/fancybox-3.5.7/dist/jquery.fancybox.min.js'
            // 'src/vendor/wow.min.js',
            // 'src/vendor/quickaccord.min.js',
            // 'src/vendor/blazy.min.js'
            // 'src/scripts/scripts.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename('libraries.min.js'))
        .pipe(gulp.dest('dist/js/'));
}

/* IMAGES TASKS
 * ------------------------------------------------------------------------- */

function images() {
    return gulp.src([config.src.images])
        .pipe(plumber())
        .pipe(gulp.dest([config.dist.images]))
}

/* FONTS TASKS
 * ------------------------------------------------------------------------- */

function fonts() {
    return gulp.src([config.src.fonts])
        .pipe(gulp.dest([config.dist.fonts]))
}

/* LIBRARIES TASKS
 * ------------------------------------------------------------------------- */

function libraries() {
    return gulp.src([config.src.libraries])
        .pipe(plumber())
        .pipe(gulp.dest([config.dist.libraries]))
}

/* TESTS and LINTERS TASKS
 * ------------------------------------------------------------------------- */

/* SERVICES TASKS
 * ------------------------------------------------------------------------- */

function clean(callback) {
    gulp.src('dist', {read: false})
        .pipe(cleaner())
    callback();
}

function watch() {
    gulp.watch('src/html/**/*.pug', html).on("change", browserSync.reload);
    gulp.watch('src/html/**/*.pug', pages).on("change", browserSync.reload);
    gulp.watch('src/styles/**/*.s+(a|c)ss', styles).on("change", browserSync.reload);
    gulp.watch('src/fonts/**/*.{eot,svg,ttf,woff,woff2}', fonts).on("change", browserSync.reload);
    gulp.watch('src/scripts/**/*.js', scripts).on("change", browserSync.reload);
    gulp.watch('src/libraries/**/*', scripts_libraries).on("change", browserSync.reload);
    gulp.watch('src/images/**/*.{png,jpg,gif,svg}', images).on("change", browserSync.reload);
}

function livereload() {
    return browserSync.init({
        server: {
            baseDir: "./dist"
        },
        startPath: "/index.html",
        // startPath: "/registration.html",
    });
}

/* GULP RUN
 * ========================================================================= */

// Register tasks to expose to the CLI
// ------------------------------------------------------------------------- */

exports.html = html;
exports.styles = styles;
exports.pages = pages;
// exports.fonts = fonts;
// exports.images = images;
// exports.clean = clean;
exports.scripts = scripts;
// exports.js_libraries = js_libraries;
exports.libraries = libraries;
// exports.vendor = vendor;
// exports.scss_lint = scss_lint;
exports.livereload = livereload;

/* -------------------------------------------------------------------------
 * Define default task that can be called by just running `gulp` from cli
 * -------------------------------------------------------------------------
 */ 

// v 0.2
// exports.default = gulp.series(html, styles, vendor, images, fonts,  gulp.parallel(watch, livereload));
exports.default = gulp.series(html, pages, styles, scripts, scripts_libraries, libraries, gulp.parallel(watch, livereload));
