var fs = Npm.require("fs");

Package.describe({
  name: 'arch:ace-editor',
  summary: 'Integrating Ace editor with Meteor since 2015',
  version: '1.1.1',
  git: 'https://github.com/0a-/meteor-ace-editor'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  api.use('tracker', 'client');
  var files = fs.readdirSync('ace-builds/src-noconflict');
  files.forEach(function(file){
    if(file.substr(-3)===".js"){
        api.add_files("ace-builds/src-noconflict/"+file, "client", {isAsset: true});
    }
  });
  api.addFiles('core.js','client');
  api.export('AceEditor','client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('arch:ace-editor');
  api.addFiles('tests.js','client');
});
