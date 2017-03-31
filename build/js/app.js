var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("geodash/services/GeoDashServiceBus", ["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, GeoDashServiceBus;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            GeoDashServiceBus = (function () {
                //public primary: EventEmitter<any>;
                //public intents: EventEmitter<any>;
                function GeoDashServiceBus() {
                    var _this = this;
                    this.channels = [];
                    this.listeners = {};
                    ["primary", "intents", "render"].forEach(function (channel) {
                        _this.listeners[channel] = {};
                        _this.channels[channel] = new core_1.EventEmitter();
                        _this.channels[channel].subscribe(function (args) {
                            var listeners = [].concat(extract([channel, "*"], _this.listeners, []), extract([channel, args[0]], _this.listeners, []));
                            for (var i = 0; i < listeners.length; i++) {
                                listeners[i](args[0], args[1], args[2]);
                            }
                        }, function (err) { return console.error(err); }, function () { return console.log("Loaded!"); });
                    });
                }
                GeoDashServiceBus.prototype.emit = function (channel, name, data, source) {
                    this.channels[channel].emit([name, data, source]);
                };
                GeoDashServiceBus.prototype.listen = function (channel, name, callback) {
                    //this.listeners[channel] = extract(channel, this.listeners, {});
                    this.listeners[channel][name] = extract([channel, name], this.listeners, []);
                    this.listeners[channel][name].push(callback);
                };
                return GeoDashServiceBus;
            }());
            GeoDashServiceBus = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [])
            ], GeoDashServiceBus);
            exports_1("GeoDashServiceBus", GeoDashServiceBus);
        }
    };
});
System.register("geodash/services/GeoDashServiceBootloader", ["@angular/core", "@angular/http", "rxjs/Rx", "rxjs/add/operator/map"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2, http_1, Rx_1, GeoDashServiceBootloader;
    return {
        setters: [
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            GeoDashServiceBootloader = (function () {
                function GeoDashServiceBootloader(http) {
                    this.http = http;
                }
                GeoDashServiceBootloader.prototype.request = function (urls) {
                    if (urls.length > 0) {
                        return Rx_1.Observable.forkJoin(this.http.get(urls[0]).map(function (res) {
                            if (res.ok) {
                                var contentType = res.headers.get("content-type");
                                if (contentType == "application/json") {
                                    return JSON.parse(res.text());
                                }
                                else {
                                    return YAML.parse(res.text());
                                }
                            }
                            else {
                                return undefined;
                            }
                        }));
                    }
                    else {
                        return undefined;
                    }
                };
                return GeoDashServiceBootloader;
            }());
            GeoDashServiceBootloader = __decorate([
                core_2.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], GeoDashServiceBootloader);
            exports_2("GeoDashServiceBootloader", GeoDashServiceBootloader);
        }
    };
});
System.register("geodash/services/GeoDashServiceCompile", ["@angular/core"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_3, GeoDashServiceCompile;
    return {
        setters: [
            function (core_3_1) {
                core_3 = core_3_1;
            }
        ],
        execute: function () {
            GeoDashServiceCompile = (function () {
                function GeoDashServiceCompile() {
                    this.splitter = new RegExp("^{{(?:\\s*)(.*?)(?:\\s*)}}$", "gi");
                }
                GeoDashServiceCompile.prototype.compile = function (template, ctx) {
                    var _this = this;
                    //console.log("compiling ", template, "with context", ctx);
                    //var m = "{{ feature.attributes.date | date : 'months' }} months".match(new RegExp("({{.*}}|.*)", "gi"));
                    var parts = template.split(new RegExp("({{[^}]*}})", "gi")).map(function (x) {
                        var y = _this.splitter.exec(x);
                        if (y) {
                            return extract(y[1], ctx, "");
                        }
                        else {
                            return x;
                        }
                    });
                    return parts.join("");
                };
                return GeoDashServiceCompile;
            }());
            GeoDashServiceCompile = __decorate([
                core_3.Injectable(),
                __metadata("design:paramtypes", [])
            ], GeoDashServiceCompile);
            exports_3("GeoDashServiceCompile", GeoDashServiceCompile);
        }
    };
});
System.register("geodash/components/GeoDashComponentMain", ["@angular/core", "geodash/services/GeoDashServiceBus", "geodash/services/GeoDashServiceBootloader", "geodash/services/GeoDashServiceCompile"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_4, GeoDashServiceBus_1, GeoDashServiceBootloader_1, GeoDashServiceCompile_1, GeoDashComponentMain;
    return {
        setters: [
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (GeoDashServiceBus_1_1) {
                GeoDashServiceBus_1 = GeoDashServiceBus_1_1;
            },
            function (GeoDashServiceBootloader_1_1) {
                GeoDashServiceBootloader_1 = GeoDashServiceBootloader_1_1;
            },
            function (GeoDashServiceCompile_1_1) {
                GeoDashServiceCompile_1 = GeoDashServiceCompile_1_1;
            }
        ],
        execute: function () {
            GeoDashComponentMain = (function () {
                function GeoDashComponentMain(bus, bootloader, compileService) {
                    var _this = this;
                    this.bus = bus;
                    this.bootloader = bootloader;
                    this.compileService = compileService;
                    this.name = 'GeoDashComponentMain';
                    this.onMapLoaded = function (name, data, source) {
                        console.log("Map Loaded!");
                    };
                    this.onIntent = function (name, data, source) {
                        console.log("Recived Intent: ", name, data, source);
                        if (name == "flyToLocation") {
                            var renderData = {
                                "lat": extract("lat", data),
                                "lon": extract("lon", data),
                                "zoom": extract("zoom", data),
                                "projection": extract("projection", data),
                                "animations": ["pan", "bounce"]
                            };
                            _this.bus.emit("render", "geodash:changeView", renderData, _this.name);
                        }
                    };
                }
                GeoDashComponentMain.prototype.ngOnInit = function () {
                    var _this = this;
                    this.bus.listen("primary", "geodash:maploaded", this.onMapLoaded);
                    this.bus.listen("intents", "*", this.onIntent);
                    var urls = [
                        geodash.util.coalesce([
                            geodash.util.getHashValue("main:config"),
                            geodash.util.getQueryStringValue("main:config")
                        ])
                    ];
                    this.bootloader.request(urls).subscribe(function (data) {
                        _this.dashboard = data[0];
                        _this.bus.emit("primary", "geodash:loaded", { dashboard: _this.dashboard }, _this.name);
                    }, function (err) { return console.error(err); }, function () { return console.log("Loading complete!"); });
                };
                return GeoDashComponentMain;
            }());
            GeoDashComponentMain = __decorate([
                core_4.Component({
                    selector: 'geodash-main',
                    template: extract(['templates', 'merged', 'geodashMain.tpl.html'], geodash),
                    providers: [
                        GeoDashServiceBus_1.GeoDashServiceBus,
                        GeoDashServiceBootloader_1.GeoDashServiceBootloader,
                        GeoDashServiceCompile_1.GeoDashServiceCompile
                    ]
                }),
                __metadata("design:paramtypes", [GeoDashServiceBus_1.GeoDashServiceBus, GeoDashServiceBootloader_1.GeoDashServiceBootloader, GeoDashServiceCompile_1.GeoDashServiceCompile])
            ], GeoDashComponentMain);
            exports_4("GeoDashComponentMain", GeoDashComponentMain);
        }
    };
});
System.register("geodash/components/GeoDashComponentMap", ["@angular/core", "geodash/services/GeoDashServiceBus"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_5, GeoDashServiceBus_2, GeoDashComponentMap;
    return {
        setters: [
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (GeoDashServiceBus_2_1) {
                GeoDashServiceBus_2 = GeoDashServiceBus_2_1;
            }
        ],
        execute: function () {
            GeoDashComponentMap = (function () {
                function GeoDashComponentMap(bus) {
                    this.bus = bus;
                    this.name = 'GeoDashComponentMap';
                }
                GeoDashComponentMap.prototype.ngOnInit = function () {
                };
                return GeoDashComponentMap;
            }());
            GeoDashComponentMap = __decorate([
                core_5.Component({
                    selector: 'geodash-map',
                    template: extract(['templates', 'merged', 'geodashMap.tpl.html'], geodash),
                }),
                __metadata("design:paramtypes", [GeoDashServiceBus_2.GeoDashServiceBus])
            ], GeoDashComponentMap);
            exports_5("GeoDashComponentMap", GeoDashComponentMap);
        }
    };
});
System.register("geodash/components/GeoDashComponentMapMap", ["@angular/core", "geodash/services/GeoDashServiceBus"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_6, GeoDashServiceBus_3, GeoDashComponentMapMap;
    return {
        setters: [
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (GeoDashServiceBus_3_1) {
                GeoDashServiceBus_3 = GeoDashServiceBus_3_1;
            }
        ],
        execute: function () {
            GeoDashComponentMapMap = (function () {
                function GeoDashComponentMapMap(bus) {
                    var _this = this;
                    this.bus = bus;
                    this.name = 'GeoDashComponentMapMap';
                    //onLoaded(data: any, source: any): void {
                    this.onLoaded = function (name, data, source) {
                        console.log("GeoDashComponentMapMap: ", data, source);
                        //
                        _this.dashboard = data["dashboard"];
                        _this.state = data["state"];
                        // Initialize Map
                        var listeners;
                        geodash.var.map = geodash.init.map_ol3({
                            "id": "map",
                            "dashboard": _this.dashboard,
                            "state": _this.state,
                            "listeners": listeners
                        });
                        // Initialize JSTS
                        if (typeof jsts != "undefined") {
                            if (!geodash.util.isDefined(geodash.var.jsts_parser)) {
                                geodash.var.jsts_parser = new jsts.io.OL3Parser();
                            }
                        }
                        // Baselayers
                        if (extract("baselayers", _this.dashboard, []).length > 0) {
                            var baselayers = geodash.layers.init_baselayers_ol3(geodash.var.map, _this.dashboard.baselayers);
                            geodash.util.extend(geodash.var.baselayers, baselayers);
                            // Load Default/Initial Base Layer
                            var baseLayerID = _this.dashboard.view.baselayer || _this.dashboard.baselayers[0].id;
                            geodash.var.map.addLayer(geodash.var.baselayers[baseLayerID]);
                        }
                        // Feature Layers
                        if (Array.isArray(extract("featurelayers", _this.dashboard))) {
                            for (var i = 0; i < _this.dashboard.featurelayers.length; i++) {
                                var fl = _this.dashboard.featurelayers[i];
                                //geodash.layers.init_featurelayer(fl.id, fl, $scope, live, dashboard, state);
                                geodash.layers.init_featurelayer({
                                    "id": fl.id,
                                    "fl": fl,
                                    "dashboard": _this.dashboard,
                                    "state": _this.state
                                });
                            }
                        }
                        _this.bus.emit("primary", "geodash:maploaded", {}, _this.name);
                    };
                    this.onChangeView = function (name, data, source) {
                        console.log("Changing view...");
                        if (geodash.util.isDefined(extract("layer", data))) {
                            geodash.navigate.layer(data);
                        }
                        else if (geodash.util.isDefined(extract("extent", data))) {
                            var newExtent = undefined;
                            var extent = extract("extent", data);
                            if (geodash.util.isString(extent)) {
                                if (extent == "initial") {
                                    if (!geodash.var.map.getView().getAnimating()) {
                                    }
                                }
                                else if (extent == "previous" || extent == "prev") {
                                    if (!geodash.var.map.getView().getAnimating()) {
                                    }
                                }
                                else if (extent == "next" || extent == "forward") {
                                    if (!geodash.var.map.getView().getAnimating()) {
                                    }
                                }
                            }
                            else {
                                geodash.navigate.location({
                                    "animate": extract("animate", data),
                                    "duration": extract("duration", data),
                                    "extent": geodash.normalize.extent(extent, {
                                        "sourceProjection": "EPSG:4326",
                                        "targetProjection": geodash.var.map.getView().getProjection().getCode()
                                    })
                                });
                            }
                        }
                        else {
                            geodash.navigate.location({
                                "animate": extract("animate", data),
                                "duration": extract("duration", data),
                                "lat": extract("lat", data),
                                "lon": extract("lon", data),
                                "zoom": extract("zoom", data)
                            });
                        }
                    };
                }
                GeoDashComponentMapMap.prototype.ngOnInit = function () {
                    this.bus.listen("primary", "geodash:loaded", this.onLoaded);
                    this.bus.listen("render", "geodash:changeView", this.onChangeView);
                };
                return GeoDashComponentMapMap;
            }());
            GeoDashComponentMapMap = __decorate([
                core_6.Component({
                    selector: 'geodash-map-map',
                    template: extract(['templates', 'merged', 'geodashMapMap.tpl.html'], geodash)
                }),
                __metadata("design:paramtypes", [GeoDashServiceBus_3.GeoDashServiceBus])
            ], GeoDashComponentMapMap);
            exports_6("GeoDashComponentMapMap", GeoDashComponentMapMap);
        }
    };
});
System.register("geodash/components/GeoDashComponentMapOverlays", ["@angular/core", "geodash/services/GeoDashServiceBus", "geodash/services/GeoDashServiceCompile"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_7, GeoDashServiceBus_4, GeoDashServiceCompile_2, GeoDashComponentMapOverlays;
    return {
        setters: [
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (GeoDashServiceBus_4_1) {
                GeoDashServiceBus_4 = GeoDashServiceBus_4_1;
            },
            function (GeoDashServiceCompile_2_1) {
                GeoDashServiceCompile_2 = GeoDashServiceCompile_2_1;
            }
        ],
        execute: function () {
            GeoDashComponentMapOverlays = (function () {
                function GeoDashComponentMapOverlays(bus, compileService) {
                    var _this = this;
                    this.bus = bus;
                    this.compileService = compileService;
                    this.name = 'GeoDashComponentMapOverlays';
                    //onLoaded(data: any, source: any): void {
                    this.onLoaded = function (data, source) {
                        console.log("GeoDashComponentMapOverlays: ", data, source);
                        _this.dashboard = data["dashboard"];
                        _this.state = data["state"];
                    };
                    this.interpolate = function (template) {
                        return function (ctx) { return _this.compileService.compile(template, ctx); };
                    };
                    this.intents = function (overlay) {
                        var data = [];
                        var intents = extract("intents", overlay);
                        if (Array.isArray(intents)) {
                            for (var i = 0; i < intents.length; i++) {
                                var intent = intents[i];
                                var intentName = intent.name;
                                if (geodash.util.isDefined(intentName)) {
                                    var intentProperties = intent.properties;
                                    if (geodash.util.isDefined(intentProperties)) {
                                        var intentData = geodash.util.arrayToObject(intentProperties, { '$interpolate': _this.interpolate, 'ctx': { 'overlay': overlay } });
                                        data.push({ "name": intent.name, "data": intentData });
                                    }
                                    else {
                                        data.push({ "name": intent.name });
                                    }
                                }
                            }
                        }
                        return data;
                    };
                }
                GeoDashComponentMapOverlays.prototype.ngOnInit = function () {
                    this.bus.listen("primary", "geodash:loaded", this.onLoaded);
                };
                GeoDashComponentMapOverlays.prototype.imageURL = function (overlay) {
                    if (geodash.util.isString(extract("image.url", overlay)) && extract("image.url", overlay).length > 0) {
                        return extract("image.url", overlay);
                    }
                    else if (geodash.util.isDefined(extract("image.asset", overlay)) && extract("image.asset", overlay).length > 0) {
                        return extract(["var", "assets", extract("image.asset", overlay), "url"], geodash);
                    }
                    else {
                        return "";
                    }
                };
                ;
                GeoDashComponentMapOverlays.prototype.class_overlay = function (overlay) {
                    var str = "geodash-map-overlay";
                    if (geodash.util.isDefined(extract("intents", overlay)) || geodash.util.isDefined(extract("intent", overlay))) {
                        str += " geodash-intent";
                    }
                    var classes = extract("css.classes", overlay);
                    if (geodash.util.isDefined(classes)) {
                        if (geodash.util.isString(classes)) {
                            str += " " + classes;
                        }
                        else if (Array.isArray(classes)) {
                            str += " " + classes.join(" ");
                        }
                    }
                    return str;
                };
                ;
                GeoDashComponentMapOverlays.prototype.style = function (type, overlay) {
                    var styleMap = {};
                    geodash.util.extend(styleMap, {
                        "top": extract("position.top", overlay, 'auto'),
                        "bottom": extract("position.bottom", overlay, 'auto'),
                        "left": extract("position.left", overlay, 'auto'),
                        "right": extract("position.right", overlay, 'auto'),
                        "width": extract("width", overlay, 'initial'),
                        "height": extract("height", overlay, 'initial'),
                        "padding": "0px",
                        "margin": "0px",
                        "background": "transparent",
                        "opacity": "1.0"
                    });
                    if (type == "text") {
                        geodash.util.extend(styleMap, {
                            "font-family": extract("text.font.family", overlay, 'Arial'),
                            "font-size": extract("text.font.size", overlay, '12px'),
                            "font-style": extract("text.font.style", overlay, 'normal'),
                            "text-shadow": extract("text.shadow", overlay, 'none')
                        });
                    }
                    else if (type == "image") {
                        geodash.util.extend(styleMap, {
                            "display": "inline-block"
                        });
                    }
                    if (geodash.util.isDefined(extract("intents", overlay)) || geodash.util.isDefined(extract("intent", overlay))) {
                        geodash.util.extend(styleMap, {
                            "cursor": "pointer"
                        });
                    }
                    if (geodash.util.isDefined(extract("css.properties", overlay))) {
                        geodash.util.extend(styleMap, geodash.util.arrayToObject(extract("css.properties", overlay)));
                    }
                    return styleMap;
                };
                ;
                return GeoDashComponentMapOverlays;
            }());
            GeoDashComponentMapOverlays = __decorate([
                core_7.Component({
                    selector: 'geodash-map-overlays',
                    template: extract(['templates', 'merged', 'geodashMapOverlays.tpl.html'], geodash),
                    providers: []
                }),
                __metadata("design:paramtypes", [GeoDashServiceBus_4.GeoDashServiceBus, GeoDashServiceCompile_2.GeoDashServiceCompile])
            ], GeoDashComponentMapOverlays);
            exports_7("GeoDashComponentMapOverlays", GeoDashComponentMapOverlays);
        }
    };
});
System.register("geodash/components/GeoDashComponentMapNavbars", ["@angular/core", "geodash/services/GeoDashServiceBus", "geodash/services/GeoDashServiceCompile"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_8, GeoDashServiceBus_5, GeoDashServiceCompile_3, GeoDashComponentMapNavbars;
    return {
        setters: [
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (GeoDashServiceBus_5_1) {
                GeoDashServiceBus_5 = GeoDashServiceBus_5_1;
            },
            function (GeoDashServiceCompile_3_1) {
                GeoDashServiceCompile_3 = GeoDashServiceCompile_3_1;
            }
        ],
        execute: function () {
            GeoDashComponentMapNavbars = (function () {
                function GeoDashComponentMapNavbars(bus, compileService) {
                    var _this = this;
                    this.bus = bus;
                    this.compileService = compileService;
                    this.name = 'GeoDashComponentMapNavbars';
                    //onLoaded(data: any, source: any): void {
                    this.onLoaded = function (name, data, source) {
                        console.log("GeoDashComponentMapNavbars: ", data, source);
                        _this.dashboard = data["dashboard"];
                        _this.state = data["state"];
                        _this.navbars = extract("navbars", _this.dashboard, []).map(function (navbar) { return ({
                            "classes": _this.class_navbar(navbar),
                            "style": _this.style_navbar(navbar),
                            "tabs": extract("tabs", navbar, []).map(function (tab) { return geodash.util.extend(tab, {
                                "wrapper_classes": _this.class_tab_wrapper(navbar, tab),
                                "wrapper_style": _this.style_tab_wrapper(navbar, tab),
                                "classes": _this.class_tab(navbar, tab),
                                "style": _this.style_tab(navbar, tab),
                                "href": _this.link_url(navbar, tab),
                                "target": _this.link_target(navbar, tab),
                                "intents": _this.intents(navbar, tab),
                                "tooltip": tab.tooltip,
                                "placement": _this.tab_tooltip_placement(navbar, tab),
                                "container": _this.tab_tooltip_container(navbar, tab),
                                "title": tab.title
                            }); })
                        }); });
                        console.log("navbars =", _this.navbars);
                    };
                    this.onClick = function (event, navbar, tab) {
                        console.log("tab: ", tab);
                        var intents = extract("intents", tab, []);
                        intents.forEach(function (intent) {
                            var data = _this.render(intent.data, { "navbar": navbar, "tab": tab });
                            _this.bus.emit("intents", intent.name, data, _this.name);
                        });
                        event.preventDefault();
                    };
                    this.render = function (object, ctx) {
                        return geodash.util.arrayToObject(geodash.util.objectToArray(object).map(function (x) {
                            return {
                                "name": x.name,
                                "value": _this.interpolate(x.value)(ctx)
                            };
                        }));
                    };
                    this.interpolate = function (template) {
                        return function (ctx) { return _this.compileService.compile(template, ctx); };
                    };
                    this.style_tab_wrapper = function (navbar, tab) {
                        var styleMap = {
                            "padding": "0px"
                        };
                        if (geodash.util.isDefined(extract("wrapper.css.properties", tab))) {
                            geodash.util.extend(styleMap, geodash.util.arrayToObject(extract("wrapper.css.properties", tab), { '$interpolate': _this.interpolate, 'ctx': { 'navbar': navbar, 'tab': tab } }));
                        }
                        return styleMap;
                    };
                    this.style_tab = function (navbar, tab) {
                        var styleMap = {};
                        if (geodash.util.isDefined(extract("css.properties", tab))) {
                            geodash.util.extend(styleMap, geodash.util.arrayToObject(extract("css.properties", tab), { '$interpolate': _this.interpolate, 'ctx': { 'tab': tab } }));
                        }
                        return styleMap;
                    };
                    this.link_url = function (navbar, tab) {
                        var name = extract("page", navbar);
                        if (geodash.util.isDefined(name)) {
                            var page = geodash.api.getPage(name);
                            if (geodash.util.isDefined(page)) {
                                return _this.interpolate(page)({ 'state': _this.state });
                            }
                            else {
                                return "";
                            }
                        }
                        else {
                            return extract("link.url", tab, "");
                        }
                    };
                    this.intents = function (navbar, tab) {
                        var data = [];
                        var intents = extract("intents", tab) || extract("intents", navbar);
                        if (Array.isArray(intents)) {
                            for (var i = 0; i < intents.length; i++) {
                                var intent = intents[i];
                                var intentName = intent.name;
                                if (geodash.util.isDefined(intentName)) {
                                    var intentProperties = intent.properties;
                                    if (geodash.util.isDefined(intentProperties)) {
                                        var intentData = geodash.util.arrayToObject(intentProperties, { $interpolate: _this.interpolate, 'ctx': { 'tab': tab } });
                                        data.push({ "name": intent.name, "data": intentData });
                                    }
                                    else {
                                        data.push({ "name": intent.name });
                                    }
                                }
                            }
                        }
                        return data;
                    };
                    this.default_tooltip_placement =
                        {
                            "top": "bottom",
                            "left": "right",
                            "bottom": "top",
                            "right": "left"
                        };
                    this.state = {};
                    this.navbars = [];
                }
                GeoDashComponentMapNavbars.prototype.ngOnInit = function () {
                    this.bus.listen("primary", "geodash:loaded", this.onLoaded);
                };
                GeoDashComponentMapNavbars.prototype.class_navbar = function (navbar) {
                    var str = "geodash-map-navbar";
                    var placement = extract("placement", navbar, "bottom");
                    str += " geodash-placement-" + placement;
                    if (geodash.util.isDefined(extract("switch", navbar))) {
                        str += " geodash-radio-group";
                    }
                    if (placement == "left" || placement == "right") {
                        str += "";
                    }
                    else {
                        str += " row no-gutters";
                    }
                    var classes = extract("css.classes", navbar);
                    if (geodash.util.isDefined(classes)) {
                        if (geodash.util.isString(classes)) {
                            str += " " + classes;
                        }
                        else if (Array.isArray(classes)) {
                            str += " " + classes.join(" ");
                        }
                    }
                    return str;
                };
                GeoDashComponentMapNavbars.prototype.style_navbar = function (navbar) {
                    var styleMap = {};
                    if (geodash.util.isDefined(extract("css.properties", navbar))) {
                        geodash.util.extend(styleMap, geodash.util.arrayToObject(extract("css.properties", navbar), { '$interpolate': this.interpolate, 'ctx': { 'navbar': navbar } }));
                    }
                    return styleMap;
                };
                GeoDashComponentMapNavbars.prototype.class_tab_wrapper = function (navbar, tab) {
                    var classes = extract("wrapper.css.classes", tab);
                    if (geodash.util.isDefined(classes)) {
                        if (geodash.util.isString(classes)) {
                            return classes;
                        }
                        else if (Array.isArray(classes)) {
                            return classes.join(" ");
                        }
                    }
                    else {
                        var placement = extract("placement", navbar, "bottom");
                        if (placement == "left" || placement == "right") {
                            return "row no-gutters";
                        }
                        else {
                            return "col";
                        }
                    }
                };
                GeoDashComponentMapNavbars.prototype.class_tab = function (navbar, tab) {
                    var str = "btn";
                    if (geodash.util.isDefined(navbar.switch)) {
                        if (tab.value == extract(navbar.switch, this)) {
                            str += ' btn-primary selected geodash-radio geodash-on';
                        }
                        else {
                            str += ' btn-default geodash-radio';
                        }
                    }
                    else {
                        str += ' btn-default';
                    }
                    if (!geodash.util.isDefined(extract("link", tab))) {
                        str += " geodash-intent";
                    }
                    var placement = extract("placement", navbar, "bottom");
                    /*if(placement == "left" || placement == "right")
                    {
                      str += " col";
                    }*/
                    var classes = extract("css.classes", tab);
                    if (geodash.util.isDefined(classes)) {
                        if (geodash.util.isString(classes)) {
                            str += " " + classes;
                        }
                        else if (Array.isArray(classes)) {
                            str += " " + classes.join(" ");
                        }
                    }
                    return str;
                };
                GeoDashComponentMapNavbars.prototype.link_target = function (navbar, tab) {
                    var name = extract("page", navbar);
                    if (geodash.util.isDefined(name)) {
                        return "_self";
                    }
                    else {
                        return extract("link.target", tab, "");
                    }
                };
                GeoDashComponentMapNavbars.prototype.markdown_tab = function (navbar, tab) {
                    if (geodash.util.isDefined(extract("markdown", tab))) {
                        return extract("markdown", tab) ? 1 : 0;
                    }
                    if (geodash.util.isDefined(extract("markdown", navbar))) {
                        return extract("markdown", navbar) ? 1 : 0;
                    }
                    return 1;
                };
                GeoDashComponentMapNavbars.prototype.tab_tooltip_container = function (navbar, tab) {
                    return extract("tooltip.container", tab, "body");
                };
                GeoDashComponentMapNavbars.prototype.tab_tooltip_placement = function (navbar, tab) {
                    return extract("tooltip.placement", tab, this.default_tooltip_placement[extract("placement", navbar, "bottom")]);
                };
                return GeoDashComponentMapNavbars;
            }());
            GeoDashComponentMapNavbars = __decorate([
                core_8.Component({
                    selector: 'geodash-map-navbars',
                    template: extract(['templates', 'merged', 'geodashMapNavbars.tpl.html'], geodash),
                    providers: []
                }),
                __metadata("design:paramtypes", [GeoDashServiceBus_5.GeoDashServiceBus, GeoDashServiceCompile_3.GeoDashServiceCompile])
            ], GeoDashComponentMapNavbars);
            exports_8("GeoDashComponentMapNavbars", GeoDashComponentMapNavbars);
        }
    };
});
System.register("geodash/pipes/GeoDashPipeExtract", ["@angular/core"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_9, GeoDashPipeExtract;
    return {
        setters: [
            function (core_9_1) {
                core_9 = core_9_1;
            }
        ],
        execute: function () {
            GeoDashPipeExtract = (function () {
                function GeoDashPipeExtract() {
                }
                GeoDashPipeExtract.prototype.transform = function (value, args) {
                    return args.length > 0 ? extract(expand(args), value) : undefined;
                };
                return GeoDashPipeExtract;
            }());
            GeoDashPipeExtract = __decorate([
                core_9.Pipe({ name: 'extract' })
            ], GeoDashPipeExtract);
            exports_9("GeoDashPipeExtract", GeoDashPipeExtract);
        }
    };
});
System.register("geodash/pipes/GeoDashPipeTernaryDefined", ["@angular/core"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_10, GeoDashPipeTernaryDefined;
    return {
        setters: [
            function (core_10_1) {
                core_10 = core_10_1;
            }
        ],
        execute: function () {
            GeoDashPipeTernaryDefined = (function () {
                function GeoDashPipeTernaryDefined() {
                }
                GeoDashPipeTernaryDefined.prototype.transform = function (value, args) {
                    return value ? args[0] : args[1];
                };
                return GeoDashPipeTernaryDefined;
            }());
            GeoDashPipeTernaryDefined = __decorate([
                core_10.Pipe({ name: 'ternary_defined' })
            ], GeoDashPipeTernaryDefined);
            exports_10("GeoDashPipeTernaryDefined", GeoDashPipeTernaryDefined);
        }
    };
});
System.register("geodash/pipes/GeoDashPipeDefaultIfUndefinedOrBlank", ["@angular/core"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_11, GeoDashPipeDefaultIfUndefinedOrBlank;
    return {
        setters: [
            function (core_11_1) {
                core_11 = core_11_1;
            }
        ],
        execute: function () {
            GeoDashPipeDefaultIfUndefinedOrBlank = (function () {
                function GeoDashPipeDefaultIfUndefinedOrBlank() {
                }
                GeoDashPipeDefaultIfUndefinedOrBlank.prototype.transform = function (value, args) {
                    return value ? value : args[0];
                };
                return GeoDashPipeDefaultIfUndefinedOrBlank;
            }());
            GeoDashPipeDefaultIfUndefinedOrBlank = __decorate([
                core_11.Pipe({ name: 'default_if_undefined_or_blank' })
            ], GeoDashPipeDefaultIfUndefinedOrBlank);
            exports_11("GeoDashPipeDefaultIfUndefinedOrBlank", GeoDashPipeDefaultIfUndefinedOrBlank);
        }
    };
});
System.register("geodash/pipes/GeoDashPipeMarkdownToHTML", ["@angular/core"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_12, GeoDashPipeMarkdownToHTML;
    return {
        setters: [
            function (core_12_1) {
                core_12 = core_12_1;
            }
        ],
        execute: function () {
            GeoDashPipeMarkdownToHTML = (function () {
                function GeoDashPipeMarkdownToHTML() {
                }
                GeoDashPipeMarkdownToHTML.prototype.transform = function (value, args) {
                    return args[0] ? geodash.codec.md2html(value) : value;
                };
                return GeoDashPipeMarkdownToHTML;
            }());
            GeoDashPipeMarkdownToHTML = __decorate([
                core_12.Pipe({ name: 'md2html' })
            ], GeoDashPipeMarkdownToHTML);
            exports_12("GeoDashPipeMarkdownToHTML", GeoDashPipeMarkdownToHTML);
        }
    };
});
System.register("app.module", ["@angular/core", "@angular/http", "@angular/platform-browser", "geodash/components/GeoDashComponentMain", "geodash/components/GeoDashComponentMap", "geodash/components/GeoDashComponentMapMap", "geodash/components/GeoDashComponentMapOverlays", "geodash/components/GeoDashComponentMapNavbars", "geodash/pipes/GeoDashPipeExtract", "geodash/pipes/GeoDashPipeTernaryDefined", "geodash/pipes/GeoDashPipeDefaultIfUndefinedOrBlank", "geodash/pipes/GeoDashPipeMarkdownToHTML"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_13, http_2, platform_browser_1, GeoDashComponentMain_1, GeoDashComponentMap_1, GeoDashComponentMapMap_1, GeoDashComponentMapOverlays_1, GeoDashComponentMapNavbars_1, GeoDashPipeExtract_1, GeoDashPipeTernaryDefined_1, GeoDashPipeDefaultIfUndefinedOrBlank_1, GeoDashPipeMarkdownToHTML_1, AppModule;
    return {
        setters: [
            function (core_13_1) {
                core_13 = core_13_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (GeoDashComponentMain_1_1) {
                GeoDashComponentMain_1 = GeoDashComponentMain_1_1;
            },
            function (GeoDashComponentMap_1_1) {
                GeoDashComponentMap_1 = GeoDashComponentMap_1_1;
            },
            function (GeoDashComponentMapMap_1_1) {
                GeoDashComponentMapMap_1 = GeoDashComponentMapMap_1_1;
            },
            function (GeoDashComponentMapOverlays_1_1) {
                GeoDashComponentMapOverlays_1 = GeoDashComponentMapOverlays_1_1;
            },
            function (GeoDashComponentMapNavbars_1_1) {
                GeoDashComponentMapNavbars_1 = GeoDashComponentMapNavbars_1_1;
            },
            function (GeoDashPipeExtract_1_1) {
                GeoDashPipeExtract_1 = GeoDashPipeExtract_1_1;
            },
            function (GeoDashPipeTernaryDefined_1_1) {
                GeoDashPipeTernaryDefined_1 = GeoDashPipeTernaryDefined_1_1;
            },
            function (GeoDashPipeDefaultIfUndefinedOrBlank_1_1) {
                GeoDashPipeDefaultIfUndefinedOrBlank_1 = GeoDashPipeDefaultIfUndefinedOrBlank_1_1;
            },
            function (GeoDashPipeMarkdownToHTML_1_1) {
                GeoDashPipeMarkdownToHTML_1 = GeoDashPipeMarkdownToHTML_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_13.NgModule({
                    imports: [platform_browser_1.BrowserModule, http_2.HttpModule],
                    declarations: [
                        GeoDashComponentMain_1.GeoDashComponentMain,
                        GeoDashComponentMap_1.GeoDashComponentMap,
                        GeoDashComponentMapMap_1.GeoDashComponentMapMap,
                        GeoDashComponentMapOverlays_1.GeoDashComponentMapOverlays,
                        GeoDashComponentMapNavbars_1.GeoDashComponentMapNavbars,
                        GeoDashPipeExtract_1.GeoDashPipeExtract,
                        GeoDashPipeTernaryDefined_1.GeoDashPipeTernaryDefined,
                        GeoDashPipeDefaultIfUndefinedOrBlank_1.GeoDashPipeDefaultIfUndefinedOrBlank,
                        GeoDashPipeMarkdownToHTML_1.GeoDashPipeMarkdownToHTML
                    ],
                    providers: [],
                    bootstrap: [GeoDashComponentMain_1.GeoDashComponentMain]
                })
            ], AppModule);
            exports_13("AppModule", AppModule);
        }
    };
});
System.register("main", ["@angular/platform-browser-dynamic", "app.module"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var platform_browser_dynamic_1, app_module_1;
    return {
        setters: [
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (app_module_1_1) {
                app_module_1 = app_module_1_1;
            }
        ],
        execute: function () {
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
        }
    };
});

//# sourceMappingURL=app.js.map
