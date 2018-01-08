var gulp = require("gulp");
//css文件的编译 压缩
var less = require("gulp-less");
var nano = require("gulp-cssnano");
gulp.task('style', function () {
	gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
	.pipe(less())
	.pipe(nano())
	.pipe(gulp.dest('dist/styles/'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

//js合并 压缩 混淆
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
gulp.task('scripts', function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts/'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

//图片复制
gulp.task('images', function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images/'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

//html
var html = require('gulp-htmlmin');
gulp.task('html', function(){
	gulp.src('src/*.html')
	.pipe(html({
		collapseWhitespace: true,
        removeComments: true
	}))
	.pipe(gulp.dest('dist/'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

var browserSync = require('browser-sync');
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: ['dist']
    },
  }, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
  });

  gulp.watch('src/styles/*.less',['style']);
  gulp.watch('src/scripts/*.js',['script']);
  gulp.watch('src/images/*.*',['image']);
  gulp.watch('src/*.html',['html']);
});