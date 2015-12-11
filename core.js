var loadScript = function(script, successfulCB, failCB) {
    var request;
    if (window.XMLHttpRequest){
        request = new XMLHttpRequest();
    } else {
        try {
            request=new ActiveXObject("Microsoft.request");
        } catch(e) {
            console.log("even ActiveXObject('Microsoft.request') doesn't work :(")
            return;
        }
    }
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            try {
                (function( code ) {
                    window.eval.call( window, code );
                })( request.response);
            } catch(e) {
                console.log(script +" is loaded but can't be eval(), man!");
            } finally{
                if ( typeof successfulCB === 'function' ) {
                    successfulCB();
                }
            }
        }else if (request.status == 400){
            console.log("failed to load "+script);
            if ( typeof failCB === 'function' ) {
                failCB();
            }
        }
    }
    request.open("GET", script , true);
    request.send();
}

var acePath = "/packages/arch_ace-editor/ace-builds/src-noconflict/";
var StateOfAceEditor = new Tracker.Dependency;

AceEditor = (function() {
    var instance, instance_initialized,callback = new Function();
    var setUp = function(setting,cb){
        if(setting instanceof Object && instance !==undefined){
            instance.setTheme("ace/theme/"+setting.theme);
            instance.session.setMode("ace/mode/"+setting.mode);
        }
        if(cb!==undefined){
            cb(instance);
        }
    },
    _static = {
        unloadInstance: function(){
            instance.loaded = undefined;
            instance = undefined;
            instance_initialized = undefined;
            delete window.ace;
        },
        instance: function(name,setting,cb) {
            StateOfAceEditor.depend();
            callback = function(){
                 //makes the actual callback using name, setting and cb
                if(name!==undefined){
                    try{
                        instance = ace.edit(name);
                    }catch (e) {
                         console.log("#"+name+" can't be found for ace-editor");
                    }finally{
                         setUp(setting,cb)
                    }
                }
            };
            if (instance_initialized === undefined) {
                loadScript(acePath+"ace.js",
                function(){
                    var ace = window.ace;
                    ace.config.set("modePath", acePath);
                    ace.config.set("themePath", acePath);
                    ace.config.set("workerPath", acePath);
                    ace.config.set("basePath", acePath);
                    StateOfAceEditor.changed();
                    callback();
                },
                function(request){
                    console.log(request);
                });
                instance_initialized = true;
                return "loading ace";
            }else{
                if(instance ===undefined){
                    return "ace is being loaded";
                }else{
                    callback();
                    instance.loaded = true;
                    return instance;
                }
            }
        }
    }
    return _static;
})();
