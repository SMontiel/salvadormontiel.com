const mix = require('laravel-mix');
require('mix-html-builder');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.postCss('src/app.css', 'public/css', {}, [
        require("tailwindcss"),
        require('autoprefixer'),
        require('postcss-purgecss-laravel')({
            content: ['./src/**/*.html']
        })
    ])
    //.scripts('src/js/app.js', 'public/js/app.js')
    .copyDirectory('src/favicon', 'public')
    .copyDirectory('src/images', 'public/images')
    .html({
        htmlRoot: './src/index.html',
        output: 'public'
    });
