if (Meteor.isClient) {
    Template.hello.rendered = function(){
        var editor;
       Tracker.autorun(function (e) {
        console.log("A");
       editor = AceEditor.instance("archy");
       if(editor.loaded===true){
         e.stop();
         editor.insert("Live long and prosper.");
       }
     });
    }
}