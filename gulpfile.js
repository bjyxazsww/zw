//导入
//const gulp = require('gulp');  gulp.src  gulp.dest gulp.watch
const {src,dest,watch} = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');

//发布任务
function fnCopyIndex(){
    return src('./src/index.html')
    .pipe(dest('./dist'));
}
//css
function fnCss(){
    return src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    // .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/css'));
}
//js
function fnJS(){
    return src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/js'));
}
function fnJSON(){
    return src('./src/json/*.json')
    .pipe(dest('./dist/json'));
}
//images
function fnImg(){
    return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'));
}
//html
function fnPage(){
    return src('./src/pages/*.html')
    .pipe(htmlmin())
    .pipe(dest('./dist/pages'));
}
//监听
function fnWatch(){
    watch('./src/index.html',fnCopyIndex);
    watch('./src/sass/*.scss',fnCss);
    watch('./src/js/*.js',fnJS);
    watch('./src/json/*.json',fnJSON);
    watch('./src/pages/*.html',fnPage);
}
//导出任务
exports.copyIndex = fnCopyIndex;
exports.css = fnCss;
exports.js = fnJS;
exports.json = fnJSON;
exports.img = fnImg;
exports.page = fnPage;
exports.default = fnWatch;