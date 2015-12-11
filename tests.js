Tinytest.add('load ace', function (test) {
    var ace = AceEditor.instance();
    test.equal(ace, "loading ace");
});
Tinytest.add('wait ace to be loaded', function (test) {
    var ace = AceEditor.instance();
    test.equal(ace, "ace is being loaded");
});
Tinytest.addAsync('ace is loaded', function (test, completed) {
    $("body").append("<pre id='editor' style='display:none'/>");
    var ace = AceEditor.instance("editor",
    {
        theme:"dawn",
        mode:"html"
    },
    function(editor){
        //this is passed to the cb arg
        test.equal(ace, "ace is being loaded");
        ace = AceEditor.instance();
        test.equal(ace.loaded,true);
        test.instanceOf(editor, Object);
        test.equal(editor.getTheme(),"ace/theme/dawn");
        completed();
    });
});

Tinytest.addAsync('testTracker', function (test,completed) {
    AceEditor.unloadInstance();
    $("body").append("<pre id='editor' style='display:none'/>");
    Tracker.autorun(function (e) {
       var editor = AceEditor.instance("editor");
       console.log(editor);
       if(editor.loaded===true){
         e.stop();
         completed();
       }
     });
});
