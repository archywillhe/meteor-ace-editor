if (Meteor.isClient) {
    AceEditor.instance("archy", {
            theme: "twilight",
            mode: "html"
        },
        function(editor) {
            editor.insert("<i>Live long and prosper.</i>");
            editor.session.getLength();
        }
    );
    // Template.hello.rendered = function(){
    //    this.autorun(function (e) {
    //    var editor = AceEditor.instance("archy");
    //    console.log(window.AceEditor);
    //    if(editor.loaded!==undefined){
    //      e.stop();
    //      editor.insert("Live long and prosper.");
    //    }
    //  });
    // }
}