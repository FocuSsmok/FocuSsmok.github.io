const gulp = require("gulp");
const bs = require("browser-sync");
const sass = require("gulp-sass");
const tildeImporter = require("node-sass-tilde-importer");

gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
    .pipe(sass({
        importer: tildeImporter,
        style: 'expanded'
    }))
    .pipe(gulp.dest('./src/css'))
    .pipe(bs.stream());
});

gulp.task('browserSync', function() {
    bs.init({
        server: {
            baseDir: './src'
        }
    });
});

gulp.task('serve', ['sass'], function() {
    bs.init({
        server: './src',
        files: "./src/css/style.css"
    });
    gulp.watch(['./src/scss/*.scss'], ['sass']);
    gulp.watch(['./src/*.html']).on("change", bs.reload);
    gulp.watch(['./src/js/*.js']).on("change", bs.reload);
});

gulp.task('default', ['serve']);