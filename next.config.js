/** @type {import('next').NextConfig} */

module.exports = {
    output: 'export',
    webpack: (config, options) => {
        config.module.rules.push(      {
        test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webm|mp3|wav)$/,
        type: 'asset',
        generator: {
            filename: 'static/chunks/[path][name].[hash][ext]'
        },
        });
        return config;
    }
};
