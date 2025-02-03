const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Sass compilation
const uglify = require('gulp-uglify'); // JS minification
const concat = require('gulp-concat'); // Concatenate files
const cssnano = require('gulp-cssnano'); // CSS minification
const cleanCSS = require('gulp-clean-css'); // Alternative minification for CSS
const sourcemaps = require('gulp-sourcemaps'); 

// Sass task (compile and minify)
gulp.task('sass', () => {
    return gulp.src('assets/src/sass/**/*.scss')  // Path to your Sass files
    .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))  // Compile Sass to CSS
        .pipe(cssnano())  // Minify the CSS
        .pipe(concat('main.min.css'))  // Concatenate to a single file
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/dist/css'));  // Output to dist/css folder
});

// JavaScript task (minify and concatenate)
gulp.task('scripts', () => {
    return gulp.src('assets/src/js/**/*.js')  // Path to your JavaScript files
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.min.js'))  // Concatenate JS files
        .pipe(uglify())  // Minify JavaScript
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/dist/js'));  // Output to dist/js folder
});

// CSS task (minify and concatenate)
gulp.task('css', () => {
    return gulp.src('assets/src/css/**/*.css')  // Path to your CSS files
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())  // Minify CSS
        .pipe(concat('styles.min.css'))  // Concatenate CSS files
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/dist/css'));  // Output to dist/css folder
});

// Watch task (for development)
gulp.task('watch', () => {
    gulp.watch('assets/src/sass/**/*.scss', gulp.series('sass'));  // Watch Sass files
    gulp.watch('assets/src/js/**/*.js', gulp.series('scripts'));  // Watch JS files
    gulp.watch('assets/src/css/**/*.css', gulp.series('css'));  // Watch CSS files
});

// Default task (run all tasks)
gulp.task('default', gulp.series( 'sass', 'css', 'scripts', 'watch'));
