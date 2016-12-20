'use strict';
// 引入依赖组件
const gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    cssmin = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    html_temp = require('gulp-file-include'),
    jsmin = require('gulp-uglify'),
    imgmin = require('gulp-imagemin'),
    pngmin = require('imagemin-pngquant'),
    rev_append = require('gulp-rev-append'),
    prefix = require('gulp-autoprefixer'),
    md5_suffix = require('gulp-make-css-url-version'),
    less = require('gulp-less'),
    maps = require('gulp-sourcemaps'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    clean = require('gulp-clean'),
    sequence = require('gulp-sequence'),
    browser_sync = require('browser-sync').create();

// 配置对象
const cfg = (() => {
    let _src = './', _dev = '../dev/', _build = '../build/';
    return {
        src: _src,
        dev: _dev,
        build: _build,
        server: _dev,
        server_build: _build,
        port: 5222,
        startPath: "/html/index.html",
        less_src: [_src + 'less/*.less'],
        less_watch: [_src + 'less/**/*.less'],
        less_to: _dev + '/css',
        concat_src: [_src + 'js/zepto.js', _src + 'js/base.js', _src + 'js/data_module.js', _src + 'js/sm.js', _src + 'js/sm-extend.js', _src + 'js/html_temp.js', _src + 'js/page_pad.js', _src + 'js/event.js', _src + 'js/init.js', _src + 'js/page/*.js'],
        concat_src2build: [_src + 'js/zepto.js', _src + 'js/base.js', _src + 'js/sm.js', _src + 'js/sm-extend.js', _src + 'js/html_temp.js', _src + 'js/page_pad.js', _src + 'js/event.js', _src + 'js/init.js', _src + 'js/page/*.js'],
        concat_to: _dev + '/js',
        html_temp_src: [_src + 'html/*.html'],
        html_temp_to: _dev + '/html',
        htmlmin_src: [_dev + 'html/**/*'],
        htmlmin_to: _build + '/html',
        copy2dev: [_src + 'font/**/*.{eot,ttf}',
                    _src + 'css/**/*.css',
                    _src + 'json/**/*.json',
                    _src + 'document/**/*.md',
                    _src + 'img/**/*.{png,jpg,gif,ico}',
                    _src + '*.{js,css,json,png,jpg,gif,ico}',
                    '!' + _src + 'package.json',
                    '!' + _src + 'gulpfile.js'],
        copy2build: [_dev + 'font/**/*.{eot,ttf}', _dev + 'document/**/*.md', _dev + 'ui.json'],
        cssmin_src: [_dev + 'css/**/*.css'],
        cssmin_to: _build + '/css/',
        imgmin_src: [_dev + 'img/**/*.{png,jpg,gif,ico}'],
        imgmin_to: _build + '/img/',
        jsmin_src: [_dev + 'js/**/*.js'],
        jsmin_to: _build + '/js/',
        clean_dev: [_dev + '*'],
        clean_build: [_build + '*', '!' + _build + "/.git"]
    };
})();

// 清除dev
gulp.task('clean_dev', () => {
    return gulp.src(cfg.clean_dev, {read: false})
    .pipe(clean({force: true}));
});

// 复制无需编译的代码 到 dev
gulp.task('copy2dev', function(){
    return gulp.src(cfg.copy2dev, { base: cfg.src })
    .pipe(changed(cfg.dev))
    .pipe(gulp.dest(cfg.dev));
});

// 编译less为css 生成sourceMaps 添加厂商前缀 MD5后缀
gulp.task('less', () => {
    return gulp.src(cfg.less_src)
    .pipe(maps.init())
    .pipe(less())
    .pipe(prefix({
        browsers: ['Android >= 4', 'Chrome >= 40', 'iOS >= 8', 'Safari >= 6']
    }))
    .pipe(md5_suffix())
    .pipe(maps.write('../' + cfg.dev + '/maps_css', {sourceMappingURL: file => {
            return '/maps_css/' + file.relative + '.map';
        }}))
    .pipe(gulp.dest(cfg.less_to))
    .pipe(browser_sync.stream());
});
// js代码拼接
gulp.task('concat',function(){
    var is_build = process.argv[2] && (process.argv[2] === "build");
    return gulp.src(is_build ? cfg.concat_src2build : cfg.concat_src)
    .pipe(maps.init())
    .pipe(concat('base.js'))
    .pipe(maps.write('../' + cfg.dev + '/maps_js', {sourceMappingURL: file => {
            return '/maps_js/' + file.relative + '.map';
        }}))
    .pipe(gulp.dest(cfg.concat_to));
});
// 监听
gulp.task('watch',function(){
    gulp.watch(cfg.less_watch,['less']);
    gulp.watch(cfg.concat_src,['concat',browser_sync.reload]);
    gulp.watch(cfg.html_temp_src,['html_temp',browser_sync.reload]);
    gulp.watch(cfg.copy2dev,['copy2dev',browser_sync.reload]);
});
// html模板编译
gulp.task('html_temp',function(){
    return gulp.src(cfg.html_temp_src)
    .pipe(html_temp({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(cfg.html_temp_to));
});

// 给html中的url设置MD5后缀以及压缩html
gulp.task('htmlmin', function(){
    var opts = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src(cfg.htmlmin_src)
    .pipe(rev_append())
    .pipe(htmlmin(opts))
    .pipe(gulp.dest(cfg.htmlmin_to));
});
// 给css添加浏览器厂商前缀、css中的url添加MD5后缀、压缩css
gulp.task('cssmin',['less'],function(){
    return gulp.src(cfg.cssmin_src)
    .pipe(cssmin({
        advanced: true,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
        compatibility: '*',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
        keepBreaks: false//类型：Boolean 默认：false [是否保留换行]
    }))
    .pipe(gulp.dest(cfg.cssmin_to));
});
// js代码压缩
gulp.task('jsmin',function(){
    return gulp.src(cfg.jsmin_src)
    .pipe(jsmin({
        //mangle: true,//类型：Boolean 默认：true 是否修改变量名
        mangle: {except: ['require' ,'exports' ,'module' ,'$']}//排除混淆关键字
    }))
    .pipe(gulp.dest(cfg.jsmin_to));
});
// 图片压缩、png图的深度压缩
gulp.task('imgmin',function(){
    return gulp.src(cfg.imgmin_src)
    .pipe(cache(imgmin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: false, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: false, //类型：Boolean 默认：false 多次优化svg直到完全优化,
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngmin()] //使用pngquant深度压缩png图片的imagemin插件
        })))
    .pipe(gulp.dest(cfg.imgmin_to));
});
// 清除build
gulp.task('clean_build', () => {
    return gulp.src(cfg.clean_build, {read: false})
    .pipe(clean({force: true}));
});

// 复制无需编译的代码 到 build
gulp.task('copy2build', function(){
    return gulp.src(cfg.copy2build, { base: cfg.dev })
    .pipe(gulp.dest(cfg.build));
});


gulp.task('default', function(){
    sequence('clean_dev',['less','concat','copy2dev','html_temp'],'watch',() => {
        browser_sync.init({
            server: cfg.server,
            port: cfg.port,
            open: "external",
            startPath: cfg.startPath
        });
    });
});

gulp.task('build', function(){
    sequence(['clean_dev'],['less','concat','copy2dev','html_temp'],'clean_build',['htmlmin', 'cssmin', 'jsmin', 'imgmin', 'copy2build'],() => {
        browser_sync.init({
            server: cfg.server_build,
            port: cfg.port,
            open: "external",
            startPath: cfg.startPath
        });
    });
});
