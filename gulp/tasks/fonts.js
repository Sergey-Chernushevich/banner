import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const fonts = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.*`)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error: %= error.message %",
        })
      )
    )
    .pipe(fonter({ formats: ["woff", "ttf"] }))
    .pipe(app.gulp.src(`${app.path.srcFolder}/*.ttf`), { encoding: false })
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};
