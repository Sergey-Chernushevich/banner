import fileinclude from "gulp-file-include";
import webHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";

export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "HTML",
          message: "Error: <%=error.message%>",
        })
      )
    )
    .pipe(fileinclude())
    .pipe(app.plugins.replace(/@img\//g, `img/`))
    .pipe(webHtmlNosvg())
    .pipe(
      app.plugins.ifPlugin(
        app.isBuild,
        versionNumber({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/versionNumber.json",
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream());
};
