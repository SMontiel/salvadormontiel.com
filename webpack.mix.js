const mix = require('laravel-mix');
require('laravel-mix-purgecss');
const tailwindcss = require('tailwindcss');

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

const postcssPurgecss = require('@fullhuman/postcss-purgecss') ({

    // Specify the paths to all of the template files in your project
    content: [
        './public/*.html'
    ],

    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

mix.sass('src/app.scss', 'css')
    //.scripts('src/js/app.js', 'public/js/app.js')
    .copyDirectory('src/favicon', 'public')
    .options({
        processCssUrls: false,
        postCss: [
            tailwindcss('./tailwind.config.js'),
            require('autoprefixer'),
            ...process.env.NODE_ENV === 'production' ? [ postcssPurgecss ] : []
        ],
    })
    .purgeCss({
        enabled: process.env.NODE_ENV === 'production',
        extensions: ['html'],
        folders: ['./']
    })
    .setPublicPath('public');
