var gulp = require('gulp'),
    sass = require('gulp-sass'),
    replace = require('gulp-replace'),
    cssmin = require('gulp-minify-css'),
    fileinclude = require('gulp-file-include'),
    rename = require("gulp-rename"),
    spritesmith = require('gulp.spritesmith'),
    browserSync = require('browser-sync').create(),
    replace = require('gulp-replace'),
    minimist = require('minimist');

gulp.task('style', function() {
    return gulp.src('./Simple-UI-template/sass/style.scss')
        .pipe(sass({
                includePaths: require('node-normalize-scss').includePaths
            })
            .on('error', sass.logError))
        // .pipe(cssmin())
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


var spriteDefOpt = {
      string: 'name',
      default: { name: 'sprite' }
};

var options = minimist(process.argv.slice(2), spriteDefOpt);

var spritesMithConfig = {
    imgName: ''+options.name+'.png',
    cssName: '_'+options.name+'.scss',
    cssFormat: 'scss',
    algorithm: 'binary-tree',
    imgPath: '../images/'+options.name+'.png',
    padding: 8
}

gulp.task('sprite', function() {
    var spriteData = gulp.src('./Simple-UI-template/images/'+options.name+'/*.png').pipe(spritesmith(spritesMithConfig));
    spriteData.img.pipe(gulp.dest("./dist/images/"));
    spriteData.css.pipe(gulp.dest("./Simple-UI-template/sass/module/"));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        files: "./dist/**/*",
        server: {
            baseDir: "./dist"
        },
        port: 8080,
        notify: true, //刷新是否提示
        open: true //是否自动打开页面
    });
});

gulp.task('default', function() {
    gulp.run('browser-sync');
    gulp.watch('./Simple-UI-template/**/*.html', ['html']);
    gulp.watch(['./Simple-UI-template/**/*.scss'], ['style']);
});