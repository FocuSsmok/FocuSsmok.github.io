const gulp = require("gulp");
const bs = require("browser-sync");
const sass = require("gulp-sass");
const tildeImporter = require("node-sass-tilde-importer");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");

gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
    .pipe(sass({
        importer: tildeImporter,
        style: 'expanded'
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./src/css'))
    .pipe(bs.stream());
});

gulp.task('browserSync', function() {
    bs.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('serve', ['sass'], function() {
    bs.init({
        server: './src',
        files: "./src/css/style.css"
    });
    gulp.watch(['./src/scss/*.scss'], ['sass']);
    gulp.watch(['./*.html']).on("change", bs.reload);
    gulp.watch(['./src/js/*.js']).on("change", bs.reload);
});

gulp.task('imagemin', function() {
    gulp.src('./src/img-before/*')
    .pipe(imagemin({
        optimizationLevel: 5
    }))
    .pipe(gulp.dest('./src/img'));
});

gulp.task('default', ['serve']);