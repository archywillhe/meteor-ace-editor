#Meteor Ace Editor 

A simple package that asynchronously loads <a href="http://ace.c9.io/">Ace editor</a> to a Meteor app only when it is needed.

#QuickStart
Add it to your Meteor project
```bash
meteor add arch:ace-editor
```

Let's say you have a `<pre id='archy'></pre>`, and now you want to embed Ace and turn the DOM element into an Ace editor, this is all you need to do:
```javascript
var ace = AceEditor.instance("archy",{
    theme:"dawn", 
    mode:"html"
});
```

(Calling `AceEditor.instance()` multiple times would not load the Ace script more than one time. It only loads the script the first time you call it.)


#More on working with Ace Editor in Meteor
Using a callback:
```javascript
AceEditor.instance("archy",null,function(editor){
   editor.insert("Live long and prosper.");
   editor.session.getLength();
});
```


Assigning `AceEditor.instance("archy")` to a variable with Tracker.autorun:
```javascript
Tracker.autorun(function (e) {
  editor = AceEditor.instance("archy");
  if(editor.loaded!==undefined){
  e.stop();
  editor.insert("Live long and prosper.");
  }
});
```

`.autorun` is necessary only when the Ace script has not been loaded. 

To learn more about Ace Editor, you can read <a href="http://ace.c9.io/#nav=howto">the how-to guide</a> on their website.

#License

"THE BEER-WARE LICENSE" (Revision 42):

As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return