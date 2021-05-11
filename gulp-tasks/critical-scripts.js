const { dest, src } = require("gulp");
const concat = require("gulp-concat");
const uglify = require('gulp-uglify-es').default;

const criticalScripts = () => {
    return src(["./src/js/critical/**/*.js"])
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(dest("./dist/js"));
};

module.exports = criticalScripts;
