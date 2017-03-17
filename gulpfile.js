var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    connect = require('gulp-connect'),
    concat  = require('gulp-concat');

var jsFiles = [
  './bower_components/firebase/firebase.js',
  './bower_components/angularfire/dist/angularfire.js',
  './services/services.js',
  './services/programa.factory.js',
  './services/vardai.factory.js',
  './app.js',
  './programa/programa.controller.js',
  './programa/programa.directive.js',
  './programa/programa.item.directive.js',
  './vardai/vardai.controller.js',
  './vardai/vardai.directive.js',
  './vardai/vardai.item.directive.js',
  './vardai/vardaiAprasymas.directive.js'
];

var adminJsFiles = [
  './bower_components/firebase/firebase.js',
  './bower_components/angularfire/dist/angularfire.js',
  './bower_components/angular-file-model/angular-file-model.js',
  './bower_components/angular-wysiwyg/dist/angular-wysiwyg.js',
  './services/services.js',
  './services/programa.factory.js',
  './services/vardai.factory.js',
  './admin.js'
];

var htmlFiles = [
  'index.html',
  'admin.html',
  'programa/**/*.html',
  'vardai/**/*.html'
];

gulp.task('sass', function() {
  return gulp.src('sass/main.sass')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./public/'))
    .pipe(connect.reload());
});

gulp.task('adminsass', function() {
  return gulp.src('sass/admin.sass')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./public/'))
    .pipe(connect.reload());
});

gulp.task('js', function() {
  return gulp.src(jsFiles)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/'))
    .pipe(connect.reload());
});

gulp.task('adminJs', function() {
  return gulp.src(adminJsFiles)
    .pipe(concat('admin.js'))
    .pipe(gulp.dest('./public/'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  return gulp.src(htmlFiles)
    .pipe(gulp.dest('./public/'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('sass/**/*.sass', ['sass', 'adminsass']);
  gulp.watch(jsFiles, ['js']);
  gulp.watch(adminJsFiles, ['adminJs']);
  gulp.watch(htmlFiles, ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: ["./public"],
    livereload: true
  });
});

gulp.task('default', ['sass', 'adminsass', 'js', 'adminJs', 'html', 'watch', 'connect']);
