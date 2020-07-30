'use strict';

// adiciona os plugins instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');


// definindo tarefas do gulp

// função para compilar o sass e adicionar prefixos
function compilaSass() {
  return gulp
  .src('assets/css/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sass({
    outputStyle: 'compressed',
    noCache: true,
    unixNewLines: true
  }))
  .pipe(autoprefixer({
    browsersList: ['last 2 versions'],
    cascade: false
  }))
  .pipe(cssnano())
  .pipe(gulp.dest('assets/css'))
  .pipe(browserSync.stream())
}

// tarefa para a compilação do sass
// gulp.task('sass', compilaSass);

exports.compilaSass = compilaSass;


// função para juntar o js
function gulpJS() {
  return gulp
  .src('assets/js/script.js')
  .pipe(concat('main.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('assets/js/'))
  .pipe(browserSync.stream())
}

// gulp.task('mainjs', gulpJS)
exports.gulpJS = gulpJS;


// tarefa para iniciar o broswer
function browser() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
}
// tarefa do browser sync
// gulp.task('browser-sync', browser);
exports.browser = browser;


// função minificar img
function minifyImg() {
  return gulp
  .src('assets/img/*')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
  ]))
  .pipe(gulp.dest('assets/img/minificadas'))
}

// gulp.task('imagemin', minifyImg);
exports.minifyImg = minifyImg;

// função para observar as mudanças nos arquivos
function watch() {
  gulp.watch('assets/css/scss/**/*.scss', gulp.parallel(compilaSass));
  gulp.watch('assets/js/script.js', gulpJS)
  gulp.watch('*.html').on('change', browserSync.reload);
}
// inicia a tarefa de watch
// gulp.task('watch', watch);
exports.watch = watch;

// tarefa default com funções paralelas
exports.default = gulp.parallel(watch, browser, compilaSass);