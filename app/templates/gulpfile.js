var gulp = require('gulp'),
    sass = require('gulp-sass'),
    replace = require('gulp-replace'),
    cssmin = require('gulp-minify-css'),
    fileinclude = require('gulp-file-include'),
    rename = require("gulp-rename"),
    spritesmith = require('gulp.spritesmith'),
    browserSync = require('browser-sync').create(),
    replace = require('gulp-replace');

gulp.task('style', function() {
    return gulp.src('./Simple-UI-template/sass/style.scss')
        .pipe(sass({
                includePaths: require('node-normalize-scss').includePaths
            })
            .on('error', sass.logError))
        // .pipe(cssmin())
        .pipe(replace('sprite.png', '../images/sprite.png'))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('html', function() {
    return gulp.src('./Simple-UI-template/html/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist'))
});

var spritesMithConfig = {
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    cssFormat: 'scss',
    algorithm: 'binary-tree',
    padding: 8
}

gulp.task('sprite', function() {
    var spriteData = gulp.src('./Simple-UI-template/images/*.png').pipe(spritesmith(spritesMithConfig));
    spriteData.img.pipe(gulp.dest("./dist/images/"));
    spriteData.css.pipe(gulp.dest("./Simple-UI-template/sass/module/"));
})


gulp.task('browser-sync', function() {
    browserSync.init({
        files: "**",
        server: {
            baseDir: "./dist"
        },
        port: 8080,
        notify: true, //刷新是否提示
        open: true //是否自动打开页面
    });

    gulp.watch('./Simple-UI-template/**/*.html', ['html']);
    gulp.watch(['./Simple-UI-template/**/*.scss'], ['style']);
});

gulp.task('default', function() {
    gulp.run('browser-sync');
});