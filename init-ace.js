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
                $.getScript(acePath+"ace.js")
                .done(function(){
                    ace.config.set("modePath", acePath);
                    ace.config.set("themePath", acePath);
                    ace.config.set("workerPath", acePath);
                    ace.config.set("basePath", acePath);
                    StateOfAceEditor.changed();
                    callback();
                })
                .fail(function(jqxhr, settings, exception){
                    console.log(jqxhr.responseText,exception.message);
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