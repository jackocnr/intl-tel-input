Package.describe({
    name: 'jackocnr:intl-tel-input',
    version: '10.0.2',
    summary: 'A jQuery plugin for entering international telephone numbers',
    git: 'https://github.com/jackocnr/intl-tel-input',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');

    api.use(['ecmascript', 'jquery'], 'client');

    api.addAssets([
        'build/img/flags.png',
        'build/img/flags@2x.png',
        'build/js/utils.js',
    ], 'client');

    api.addFiles([
        'build/css/intlTelInput.css',
        'build/js/intlTelInput.js'
    ], 'client', {bare: true});
});