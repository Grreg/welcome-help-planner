// DEPENDENCIES
var gulp          = require('gulp');
var rename        = require('gulp-rename');
var sass          = require('gulp-ruby-sass');
var autoprefixer  = require('gulp-autoprefixer');
var minifyCSS     = require('gulp-minify-css');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var livereload    = require('gulp-livereload');
var plumber       = require('gulp-plumber');
var notify        = require('gulp-notify');
var del           = require('del');
var sourcemaps    = require('gulp-sourcemaps');
var changed       = require('gulp-changed');
var jshint        = require('gulp-jshint');
var stylish       = require('jshint-stylish');
var ngAnnotate    = require('gulp-ng-annotate');
var gulpFilter    = require('gulp-filter');
var merge         = require('merge-stream');
var babel         = require('gulp-babel');
var templateCache = require('gulp-angular-templatecache');
var minifyHTML    = require('gulp-minify-html');
var addStream     = require('add-stream');
//var debug         = require('gulp-debug');
var log           = console.log;

// CONFIGURATION
var conf = {
    destination: '../web/assets',
    vendorScripts: [
        '../web/assets/vendor/angular/angular.js',
        '../web/assets/vendor/angular-i18n/angular-locale_de-de.js',
        '../web/assets/vendor/angular-ui-router/release/angular-ui-router.js',
        '../web/assets/vendor/angular-ui-validate/dist/validate.js',
        '../web/assets/vendor/angular-bootstrap/ui-bootstrap.js',
        '../web/assets/vendor/angular-bootstrap/ui-bootstrap-tpls.js'
    ],
    scripts: [
        'src/app.js',
        'src/**/*.js',
        '!src/**/*Test.js'
    ],
    copyFiles: ['src/**/*', '!src/**/*.scss', '!src/scss', '!src/**/*.js', '!src/**/*.html'],
    autoprefixerSupport: ['last 2 version'] //@see https://github.com/ai/browserslist#queries
};

var errorNotifier = function (err) {
    notify.onError({
        title: 'Gulp Failure!',
        subtitle: 'Please fix this.',
        message: 'Error: <%= error.message %>',
        sound: 'Beep'
    })(err);

    this.emit('end');
};

var prepareTemplates = function () {
    return gulp.src('src/**/*.html')
        .pipe(minifyHTML())
        .pipe(templateCache({
            standalone: true,
            transformUrl: function(url) {
                return 'assets/' + url;
            }
        }));
}

// TASKS
gulp.task('copy', function () {
    return gulp.src(conf.copyFiles, {base: 'src'})
        .pipe(changed(conf.destination))
        .pipe(gulp.dest(conf.destination))
        .pipe(livereload());
});

//process styles: run sass, autoprefixer, cssmin
gulp.task('styles', function () {
    return sass('src/app.scss', {sourcemap: true})
        .pipe(plumber({errorHandler: errorNotifier}))
        .pipe(autoprefixer(conf.autoprefixerSupport))
        .pipe(minifyCSS({
            advanced: false, //advanced mode caused bugs in the past
            shorthandCompacting: false, //for Android 2.x support
            compatibility: '-units.ch,-units.in,-units.pc,-units.pt,-units.rem,-units.vh,-units.vm,-units.vmax,-units.v' //https://github.com/jakubpawlowicz/clean-css/issues/654
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.destination))
        .pipe(gulpFilter(['*.css']))
        .pipe(livereload());
});

//proccess scripts: run concat and unglify
gulp.task('scripts', function () {
    return gulp.src(conf.scripts)
        .pipe(addStream.obj(prepareTemplates()))
        .pipe(plumber({errorHandler: errorNotifier}))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish))
        .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(ngAnnotate({single_quotes: true}))
            .pipe(concat('app.min.js'))
            .pipe(uglify({compress: {drop_debugger: false}}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.destination + '/js'))
        .pipe(livereload());
});

//process vendorScripts: run concat and uglify
gulp.task('vendorScripts', function () {
    return gulp.src(conf.vendorScripts)
        .pipe(sourcemaps.init())
            .pipe(concat('vendor.min.js'))
            .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.destination + '/js'))
        .pipe(livereload());
});

//watch sourcefiles and run associated tasks
gulp.task('watch', function () {
    livereload.listen();

    gulp.watch(conf.copyFiles, ['copy']);
    gulp.watch('src/**/*.html', ['scripts']);
    gulp.watch('src/**/*.scss', ['styles']);
    gulp.watch(conf.scripts, ['scripts']);
    gulp.watch(conf.vendorScripts, ['vendorScripts']);
});

//clean dist folder
gulp.task('clean', function (cb) {
    del([conf.destination + '*'], cb);
});

//run all tasks
gulp.task('default', function () {
    gulp.start('clean', 'copy', 'styles', 'scripts', 'vendorScripts');
});