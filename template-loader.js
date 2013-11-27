var templateLoader = (function () {
    'use strict';

    // States of loaded templates
    var STATES = { unloaded: 0, loaded: 1, error: -1 };

    // Registations data store
    var registrations = {};

    // Internal class for storing registrations
    var registration = function (key, path, html) {
        this.key = key;
        this.path = path;
        this.html = html;
        if (html) this.state = STATES.loaded; // mark loaded
        else this.state = STATES.unloaded;    // mark unloaded
    }

    // Loads the templates html
    var load = function (reg, async) {
        var me = this;

        // only load if in unloaded state                  
        if (reg.state == STATES.unloaded) {
            $.ajax({
                url: reg.path,
                async: async,
                success: function (data) {
                    reg.html = data;
                    reg.state = STATES.loaded;
                    return reg.html
                },
                error: function (data) {
                    reg.state = STATES.error;
                    console.log(data);
                }
            });
        }
    }

    return {
        /** Register a new template
        * @param {object} obj - registration object that contains key and either path or data
        * @param {bool} loadNow - indicates if the template should be syncrhonously now
        */
        register: function (obj, loadSync) {
            // do some validation
            if (!obj.key)
                throw "templates.register requires a key value";
            if (!(obj.path || obj.data))
                throw "templates.register requires a path or data value";

            // do registration
            var reg = new registration(obj.key, obj.path, obj.data);
            registrations[reg.key] = reg;

            // optionally load stuff            
            if (loadSync)
                load(reg, false);
            else 
                load(reg, true);
        },
        /** Get a template's html
        * @param {string} key - the template to get
        */
        html: function (key) {
            // check for bad states
            if (!registrations[key]) throw "Template has not been registered";
            if (registrations[key].state == STATES.error) throw "Template load failure";
            var reg = registrations[key];

            // load if necessary
            if (reg.state == STATES.unloaded) {
                load(reg, false);
            }
            return reg.html
        }
    }
} ());
