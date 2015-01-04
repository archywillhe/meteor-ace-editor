#Meteor Ace Editor 

A simple package that integrates <a href="http://ace.c9.io/">Ace editor</a> with your Meteor 1.0 app.

#QuickStart
Add it to your Meteor project
```bash
meteor add arch:ace-editor
```

Let's say you have a `<pre id='archy'></pre>`, and you want to make it into an ace editor, this is all you need to do:
```javascript
var ace = AceEditor.instance("archy",{
    theme:"dawn", 
    mode:"html"
});
```

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

To learn more about Ace Editor, you can read <a href="http://ace.c9.io/#nav=howto">the how-to guide</a> on their website.

#License

"THE BEER-WARE LICENSE" (Revision 42):

As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return