var gulp = require('gulp'),
    handlebars = require('gulp-compile-handlebars'),
    hbs = require('handlebars'),
    fs = require('fs'),
    gulpFlatBlog = require('gulp-flat-blog'),
    moment = require('moment'),
    browserSync = require('browser-sync').create();
//// Use exec to manage python django's runserver.py
// exec = require('child_process').exec;




gulp.task('blog', function() {
    hbs.registerHelper("formatDate", function(datetime, format) {
        var DateFormats = {
           short: "YYYY",
           long: "DD MMM, YYYY"
    };
      if (moment) {
        // can use other formats like 'lll' too
        format = DateFormats[format] || format;
        return moment(datetime).format(format);
      }
      else {
        return datetime;
      }
    });
    hbs.registerHelper('cutoff', function (index, options) {
       if(index < 5){
          return options.fn(this);
       } else {
          return options.inverse(this);
       }

    });
    hbs.registerHelper('eachUnique', function(array, options) {
        // this is used for the lookup
        var dupCheck = {};
        var cats = [];
        var out = {};
        var buffer = '';

        for (var i = 0; i < array.length; i++) {
            var entry = array[i];

            // var uniqueKey = entry.category;
            var uniqueKey = entry.category.split(", ");

            if (uniqueKey.length >= 1) {
                for (var x = 0; x < uniqueKey.length; x++) {
                    cats.push(uniqueKey[x]);
                }
            }

        }


        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        var unique = cats.filter(onlyUnique);

        for (var z = 0; z < unique.length; z++) {
            out['categories'] = unique[z];
            buffer += options.fn(out);
        }

        // return the template compiled
        return buffer;

    });

    hbs.registerHelper('splitCats', function(category, options) {
        var out = {};
        var sanitize = [];
        var unique = [];
        var buffer = '';
        var t = category.split(", ");

        out['categories'] = t;
        buffer += options.fn(out);

        return buffer;
    });

    return gulp.src('app/_blog/posts/*.md')
        .pipe(gulpFlatBlog({
            single: hbs.compile(fs.readFileSync('app/_blog/templates/single.hbs', 'utf8')),
            index: hbs.compile(fs.readFileSync('app/_blog/templates/index.hbs', 'utf8'))
        }))

        // .pipe(gulp.dest('public/blog/posts'));
        .pipe(gulp.dest('public/blog'));
});

gulp.task('projects', function() {
    hbs.registerHelper("formatDate", function(datetime, format) {
        var DateFormats = {
           short: "YYYY",
           long: "DD MMM, YYYY",
    };
      if (moment) {
        // can use other formats like 'lll' too
        format = DateFormats[format] || format;
        return moment(datetime).format(format);
      }
      else {
        return datetime;
      }
    });
    hbs.registerHelper('cutoff', function (index, options) {
       if(index < 5){
          return options.fn(this);
       } else {
          return options.inverse(this);
       }

    });
    hbs.registerHelper('eachUnique', function(array, options) {
        // this is used for the lookup
        var dupCheck = {};
        var cats = [];
        var out = {};
        var buffer = '';

        for (var i = 0; i < array.length; i++) {
            var entry = array[i];

            // var uniqueKey = entry.category;
            var uniqueKey = entry.category.split(", ");

            if (uniqueKey.length >= 1) {
                for (var x = 0; x < uniqueKey.length; x++) {
                    cats.push(uniqueKey[x]);
                }
            }
        }


        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        var unique = cats.filter(onlyUnique);

        for (var z = 0; z < unique.length; z++) {
            out['categories'] = unique[z];
            buffer += options.fn(out);
        }

        // return the template compiled
        return buffer;

    });

    hbs.registerHelper('splitCats', function(category, options) {
        var out = {};
        var sanitize = [];
        var unique = [];
        var buffer = '';
        var t = category.split(", ");

        out['categories'] = t;
        buffer += options.fn(out);

        return buffer;
    });

    hbs.registerHelper('unspace', function(category) {
        category = String(category);
        var t = category.replace(/\s+/g, '-');
        return t;
    });


    return gulp.src('app/_projects/posts/*.md')
        .pipe(gulpFlatBlog({
            single: hbs.compile(fs.readFileSync('app/_projects/templates/single.hbs', 'utf8')),
            index: hbs.compile(fs.readFileSync('app/_projects/templates/index.hbs', 'utf8'))
        }))
        // .pipe(gulp.dest('public/blog/posts'));
        .pipe(gulp.dest('public/projects'));
});
