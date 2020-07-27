import gulp from "gulp"
import sass from "gulp-sass" 
import miniCSS from "gulp-csso"
import ws from "gulp-webserver"

sass.compiler = require('node-sass')

const routes = {
    scss: {
        src:"src/scss/styles.scss",
        dest: "build",
        watch: "src/scss/*.scss"
    }
}

const styles = () => 
    gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(miniCSS())
    .pipe(gulp.dest(routes.scss.dest));

const watch = () =>
    gulp.watch(routes.scss.watch, styles);

const webserver = () => gulp.src("/").pipe(ws({livereload:true, open:true}));

const assets = gulp.series([styles]);
const live = gulp.parallel([webserver, watch]);

export const dev = gulp.series([assets, live]);