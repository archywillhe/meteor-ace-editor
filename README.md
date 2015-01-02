#Meteor Ace Editor 

A simple package that integrates Ace editor with your Meteor 1.0 app.

#QuickStart
Add it to your Meteor 1.0 project
```bash
meteor add arch:meteor-ace-editor
```

Let's say you have a `<pre id='archy'></pre>`, and you want to make it into an ace editor, this is all you need to do:
```javascript
var ace = AceEditor.instance("archy",{
    theme:"dawn", 
    mode:"html"
});
```

#License

"THE BEER-WARE LICENSE" (Revision 42):

As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return