/* jshint node:true */
'use strict';
// generated on 2015-02-18 using generator-gulp-webapp 0.2.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

function getUrltoFile (urlSource, fileName) {
  var http = require('http');
  var url = require('url');
  var options = {
      host: url.parse(urlSource).hostname,
      path: url.parse(urlSource).pathname + unescape(url.parse(urlSource).search || '')
  }
  console.log (options.path);
  var request = http.request(options, function (res) {
      var data = '';
      res.on('data', function (chunk) {
          data += chunk;
      });
      res.on('end', function () {
        var fs = require('fs');
        fs.writeFile(fileName, data, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(urlSource);
            console.log('writen to');
            console.log(fileName);
        });
      });
  });
  request.on('error', function (e) {
      console.log(e.message);
  });
  request.end();
}


function postDatatoFile (urlSource, postData, fileName) {
  var url = require('url');
  var querystring = require('querystring');
  var post_data = JSON.stringify(postData);
  var http = require('http');
  var options = {
      host: url.parse(urlSource).hostname,
      path: url.parse(urlSource).pathname + unescape(url.parse(urlSource).search),
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length
      }
  }
  var request = http.request(options, function (res) {
      var data = '';
      res.on('data', function (chunk) {
          data += chunk;
      });
      res.on('end', function () {
        var fs = require('fs');
        fs.writeFile(fileName, data, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(urlSource);
            console.log('post data writen to');
            console.log('fileName');
        }); 
      });
  });
  request.on('error', function (e) {
      console.log(e.message);
  });
  request.write(post_data);
  request.end();
}

gulp.task('styles', function () {
  return gulp.src('app/styles/main*.scss')
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10
    }))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest('.tmp/styles'));
});


gulp.task('origami', function () {
  getUrltoFile('http://build.origami.ft.com/bundles/js?modules=o-header@^3.0.1,o-table@^1.6.0', './bower_components/origami/build.js');
  getUrltoFile ('http://build.origami.ft.com/bundles/css?modules=o-header@^3.0.1,o-footer@^3.0.0,o-table@^1.6.0', './bower_components/origami/build.scss');
});


gulp.task('ea', function () {
  var message = {};
  message.head = {};
  message.head.transactiontype = '10001';
  message.head.source = 'web';
  message.body = {};
  message.body.ielement = {};
  message.body.ielement.num = 30;
  postDatatoFile('http://m.ftchinese.com/eaclient/apijson.php', message, './app/api/ea001.json');
  message.head.transactiontype = '10003';
  postDatatoFile('http://m.ftchinese.com/eaclient/apijson.php', message, './app/api/ea003.json');
  message.head.transactiontype = '10007';
  postDatatoFile('http://m.ftchinese.com/eaclient/apijson.php', message, './app/api/ea007.json');
  getUrltoFile ('http://m.ftchinese.com/index.php/ft/channel/phonetemplate.html?', './app/api/home.tpl');
  getUrltoFile ('http://m.ftchinese.com/index.php/ft/channel/phonetemplate.html?channel=homepagevideo&', './app/api/homepagevideo.tpl');
  getUrltoFile ('http://m.ftchinese.com/index.php/ft/channel/phonetemplate.html?channel=skyZ&', './app/api/skyZ.tpl');
  getUrltoFile ('http://m.ftchinese.com/index.php/ft/channel/ipadvideo.html?', './app/api/ipadvideo.tpl');
  getUrltoFile ('http://m.ftchinese.com/index.php/jsapi/get_last_updatetime?', './app/api/get_last_updatetime.json');
  getUrltoFile ('http://m.ftchinese.com/index.php/jsapi/hotstory/1days?', './app/api/hotstory.json');
});

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('html', ['styles'], function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('api', function () {
  return gulp.src('app/api/**/*')
    .pipe(gulp.dest('dist/api'));
});

//publish special report
gulp.task('special', function () {
  gulp.src('../testing/dev_www/frontend/tpl/tag.html')
    .pipe(gulp.dest('../dev_www/frontend/tpl'));
  gulp.src('../testing/dev_www/frontend/tpl/include/story/story.html')
  .pipe(gulp.dest('../dev_www/frontend/tpl/include/story'));
  gulp.src('../testing/dev_www/frontend/tpl/video.html')
  .pipe(gulp.dest('../dev_www/frontend/tpl'));
});

gulp.task('phone', function () {
  return gulp.src('app/phone/**/*')
    .pipe(gulp.dest('dist/phone'));
});

gulp.task('log', function () {
  return gulp.src('app/log/**/*')
    .pipe(gulp.dest('dist/log'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('connect', ['styles'], function () {
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = require('connect')()
    .use(require('connect-livereload')({port: 35729}))
    .use(serveStatic('.tmp'))
    .use(serveStatic('app'))
    // paths to bower_components should be relative to the current file
    // e.g. in app/index.html you should use ../bower_components
    .use('/bower_components', serveStatic('bower_components'))
    .use(serveIndex('app'));

  require('http').createServer(app)
    .listen(9000, '0.0.0.0')
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('serve', ['connect', 'watch'], function () {
  require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.scss')
    .pipe(wiredep())
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep())
    .pipe(gulp.dest('app'));
});

gulp.task('watch', ['connect'], function () {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
    'app/*.html',
    '.tmp/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/images/**/*',
    'app/api/**/*'
  ]).on('change', $.livereload.changed);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('copy', ['build'], function () {

});


gulp.task('ga', function () {
    getUrltoFile('http://m.ftchinese.com/index.php/jsapi/analytics', './app/log/ga.js');
    getUrltoFile('http://m.ftchinese.com/index.php/jsapi/analytics', './dist/log/ga.js');
});


gulp.task('publish', function () {

});

gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras', 'api'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
