var acePath = "/packages/arch_ace-editor/ace-builds/src-noconflict/";
AceEditor = (function() {
    var instance_load, instance, callback = function(){};
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
        instance: function(name,setting,cb) {
            //overwrite the callback everytime .instance is called.
            callback = function(){
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
            if (instance_load === undefined) {
                $.getScript(acePath+"ace.js")
                .done(function(){
                    ace.config.set("modePath", acePath);
                    ace.config.set("themePath", acePath);
                    ace.config.set("workerPath", acePath);
                    ace.config.set("basePath", acePath);
                    callback();
                })
                .fail(function(jqxhr, settings, exception){
                    console.log(jqxhr.responseText,exception.message);
                });
                instance_load = true;
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