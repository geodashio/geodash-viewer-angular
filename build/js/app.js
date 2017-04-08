var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("ts/geodash/services/GeoDashServiceBus", ["@angular/core", "@angular/http", "rxjs/Rx", "rxjs/add/operator/map"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, Rx_1, GeoDashServiceBus;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
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
            GeoDashServiceBus = (function () {
                function GeoDashServiceBus(http) {
                    var _this = this;
                    this.http = http;
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
                GeoDashServiceBus.prototype.request = function (urls) {
                    var _this = this;
                    if (urls.length > 0) {
                        return Rx_1.Observable.forkJoin(urls.map(function (url) {
                            return _this.http.get(url).map(function (res) {
                                if (res.ok) {
                                    var contentType = res.headers.get("content-type");
                                    if (contentType == "application/json") {
                                        return JSON.parse(res.text());
                                    }
                                    else if (contentType == "text/xml; subtype=gml/2.1.2") {
                                        return res.text();
                                    }
                                    else {
                                        return YAML.parse(res.text());
                                    }
                                }
                                else {
                                    return undefined;
                                }
                            });
                        }));
                    }
                    else {
                        return undefined;
                    }
                };
                GeoDashServiceBus.prototype.emit = function (channel, name, data, source) {
                    this.channels[channel].emit([name, data, source]);
                };
                GeoDashServiceBus.prototype.listen = function (channel, name, callback) {
                    this.listeners[channel][name] = extract([channel, name], this.listeners, []);
                    this.listeners[channel][name].push(callback);
                };
                GeoDashServiceBus.prototype.bubble = function (name, data, element) {
                    element.nativeElement.dispatchEvent(new CustomEvent(name, { detail: data, bubbles: true }));
                };
                return GeoDashServiceBus;
            }());
            GeoDashServiceBus = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], GeoDashServiceBus);
            exports_1("GeoDashServiceBus", GeoDashServiceBus);
        }
    };
});
System.register("ts/geodash/services/GeoDashServiceBootloader", ["@angular/core", "@angular/http", "rxjs/add/operator/map"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2, http_2, GeoDashServiceBootloader;
    return {
        setters: [
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (_2) {
            }
        ],
        execute: function () {
            GeoDashServiceBootloader = (function () {
                function GeoDashServiceBootloader(http) {
                    var _this = this;
                    this.http = http;
                    this.getLoaderFn = function (name) {
                        var loaderFn;
                        if (geodash.util.isString(name) && name.length > 0) {
                            if (geodash.util.isDefined(_this.loaders)) {
                                for (var i = 0; i < _this.loaders.length; i++) {
                                    var candidate = extract(name, _this.loaders[i]);
                                    if (geodash.util.isFunction(candidate)) {
                                        loaderFn = candidate;
                                        break;
                                    }
                                }
                            }
                        }
                        return loaderFn;
                    };
                    this.getResources = function (element) {
                        var resources = extract("nativeElement.dataset.dashboardResources", element);
                        if (geodash.util.isDefined(resources) && resources != "") {
                            if (geodash.util.isString(resources)) {
                                try {
                                    resources = JSON.parse(resources);
                                }
                                catch (err) {
                                    console.log("Error: could not load resources.");
                                }
                            }
                        }
                        return resources;
                    };
                    this.loaders = extract("config.bootloader.loaders", geodash) || [geodash.bootloader.loaders];
                }
                return GeoDashServiceBootloader;
            }());
            GeoDashServiceBootloader = __decorate([
                core_2.Injectable(),
                __metadata("design:paramtypes", [http_2.Http])
            ], GeoDashServiceBootloader);
            exports_2("GeoDashServiceBootloader", GeoDashServiceBootloader);
        }
    };
});
System.register("ts/geodash/services/GeoDashServiceCompile", ["@angular/core"], function (exports_3, context_3) {
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
                    if (geodash.util.isString(template)) {
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
                    }
                    else {
                        return "";
                    }
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
System.register("ts/geodash/components/GeoDashComponentMain", ["@angular/core", "ts/geodash/services/GeoDashServiceBus", "ts/geodash/services/GeoDashServiceBootloader", "ts/geodash/services/GeoDashServiceCompile"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_4, GeoDashServiceBus_1, GeoDashServiceBootloader_1, GeoDashServiceCompile_1, templates, GeoDashComponentMain;
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
            templates = extract("config.", geodash);
            GeoDashComponentMain = (function () {
                function GeoDashComponentMain(element, bus, bootloader, compileService) {
                    var _this = this;
                    this.element = element;
                    this.bus = bus;
                    this.bootloader = bootloader;
                    this.compileService = compileService;
                    this.name = 'GeoDashComponentMain';
                    this.onMapLoaded = function (name, data, source) {
                        console.log("Map Loaded!");
                        _this.bus.bubble(name, { dashboard: _this.dashboard, state: _this.state }, _this.element);
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
                        else if (name == "zoomIn") {
                            var z = geodash.var.map.getView().getZoom();
                            var maxZoom = extract("view.maxZoom", _this.dashboard, 18);
                            var newZoom = Math.min(z + 1, maxZoom);
                            var animate = extract("animate", data, true);
                            var renderData = { 'zoom': newZoom, 'animate': animate };
                            _this.bus.emit("render", "geodash:changeView", renderData, _this.name);
                        }
                        else if (name == "zoomOut") {
                            var z = geodash.var.map.getView().getZoom();
                            var minZoom = extract("view.minZoom", _this.dashboard, 0);
                            var newZoom = Math.max(z - 1, minZoom);
                            var animate = extract("animate", data, true);
                            var renderData = { 'zoom': newZoom, 'animate': animate };
                            _this.bus.emit("render", "geodash:changeView", renderData, _this.name);
                        }
                        else if (name == "zoomToLayer") {
                            var layer = data.layer;
                            if (geodash.util.isDefined(layer)) {
                                var i_1 = _this.state.view.featurelayers.indexOf(layer);
                                if (i_1 != -1) {
                                    _this.bus.emit("render", "geodash:changeView", { 'layer': layer }, _this.name);
                                }
                            }
                        }
                        else if (name == "toggleFeatureLayer") {
                            var layer = data.layer;
                            var i_2 = _this.state.view.featurelayers.indexOf(layer);
                            if (i_2 != -1) {
                                _this.state.view.featurelayers.splice(i_2, 1);
                            }
                            else {
                                _this.state.view.featurelayers.push(layer);
                            }
                            _this.bus.emit("render", "geodash:refresh", { 'state': _this.state }, _this.name);
                        }
                        else if (name = "clickedOnMap") {
                            console.log("Clicked on Map!", data, "from", source);
                            //
                            var map = geodash.var.map;
                            var z = _this.state.view.z;
                            var visibleFeatureLayers = _this.state.view.featurelayers;
                            console.log("visibleFeatureLayers", visibleFeatureLayers);
                            var featurelayers_geojson = [];
                            var featurelayers_by_featuretype = {};
                            var fields_by_featuretype = {};
                            var urls = [];
                            for (var i = 0; i < visibleFeatureLayers.length; i++) {
                                var fl = geodash.api.getFeatureLayer(visibleFeatureLayers[i]);
                                if (geodash.util.isDefined(extract("popup.panes", fl))) {
                                    var type_lc = extract("type", fl, "").toLowerCase();
                                    if (type_lc == "geojson") {
                                        featurelayers_geojson.push(fl.id);
                                    }
                                    else if (geodash.util.isDefined(extract("wfs", fl))) {
                                        var params = {
                                            service: "wfs",
                                            version: extract("wfs.version", fl, '1.0.0'),
                                            request: "GetFeature",
                                            srsName: "EPSG:4326",
                                        };
                                        var targetLocation = geodash.normalize.point(data);
                                        var bbox = geodash.tilemath.point_to_bbox(data.location.lon, data.location.lat, z, 4).join(",");
                                        var typeNames = extract('wfs.layers', fl, undefined) || extract('wms.layers', fl, undefined) || [];
                                        if (geodash.util.isString(typeNames)) {
                                            typeNames = typeNames.split(",");
                                        }
                                        for (var j = 0; j < typeNames.length; j++) {
                                            var typeName = typeNames[j];
                                            var url = fl.wfs.url + "?" + geodash.util.objectToArray(geodash.util.extend(params, { typeNames: typeName, bbox: bbox }))
                                                .map(function (x) { return x.name + "=" + encodeURIComponent(x.value); }).join("&");
                                            urls.push(url);
                                            fields_by_featuretype[typeName.toLowerCase()] = geodash.layers.aggregate_fields(fl);
                                            featurelayers_by_featuretype[typeName.toLowerCase()] = fl;
                                            if (!typeName.toLowerCase().startsWith("geonode:")) {
                                                featurelayers_by_featuretype["geonode:" + typeName.toLowerCase()] = fl;
                                            }
                                        }
                                    }
                                }
                            }
                            var featureAndLocation = undefined;
                            if (featurelayers_geojson.length > 0) {
                                featureAndLocation = map.forEachFeatureAtPixel([data.pixel.x, data.pixel.y], function (feature, layer) {
                                    // Will attempt to coerce points to lat/lon if possible
                                    var options = { "projection": { "source": map.getView().getProjection(), "target": "EPSG:4326" } };
                                    return {
                                        'layer': layer.get('id'),
                                        'feature': geodash.normalize.feature(feature, options),
                                        'location': geodash.normalize.point(ol.proj.toLonLat(map.getCoordinateFromPixel([data.pixel.x, data.pixel.y]), map.getView().getProjection()))
                                    };
                                }, {
                                    layerFilter: function (layer) {
                                        return featurelayers_geojson.indexOf(layer.get('id')) != -1;
                                    }
                                });
                            }
                            if (geodash.util.isDefined(featureAndLocation)) {
                                var intentData = {
                                    'featureLayer': geodash.api.getFeatureLayer(featureAndLocation.layer),
                                    'feature': featureAndLocation.feature,
                                    'location': featureAndLocation.location
                                };
                                _this.bus.emit("render", "geodash:openPopup", intentData, _this.name);
                            }
                            else {
                                if (urls.length > 0) {
                                    _this.bus.request(urls).subscribe(function (responses) {
                                        //var features = geodash.http.build_features(featureData, fields_by_featuretype);
                                        var features = responses.map(function (response) {
                                            return geodash.codec.parseFeatures(response, fields_by_featuretype);
                                        }).reduce(function (a, b) { return a.concat(b); });
                                        console.log("Features: ", features);
                                        if (features.length > 0) {
                                            var featureAndLocation = geodash.vecmath.getClosestFeatureAndLocation(features, targetLocation);
                                            var fl = featurelayers_by_featuretype[featureAndLocation.feature.featuretype] || featurelayers_by_featuretype["geonode:" + featureAndLocation.feature.featuretype];
                                            var intentData = {
                                                'featureLayer': fl,
                                                'feature': geodash.normalize.feature(featureAndLocation.feature),
                                                'location': geodash.normalize.point(featureAndLocation.location)
                                            };
                                            _this.bus.emit("render", "geodash:openPopup", intentData, _this.name);
                                        }
                                        else {
                                            $("#popup").popover('dispose');
                                            map.getOverlays().item(0).setPosition(undefined);
                                        }
                                    }, function (err) { return console.error(err); }, function () { return console.log("Loading complete!"); });
                                }
                                else {
                                    $("#popup").popover('dispose');
                                    map.getOverlays().item(0).setPosition(undefined);
                                }
                            }
                        }
                    };
                }
                GeoDashComponentMain.prototype.ngOnInit = function () {
                    var _this = this;
                    geodash.var.components[this.name] = this; // register externally
                    this.bus.listen("primary", "geodash:maploaded", this.onMapLoaded);
                    this.bus.listen("intents", "*", this.onIntent);
                    var url_config = geodash.util.coalesce([
                        geodash.util.getHashValue("main:config"),
                        geodash.util.getQueryStringValue("main:config"),
                        extract("nativeElement.dataset.dashboardConfigUrl", this.element)
                    ]);
                    var url_state = geodash.util.coalesce([
                        geodash.util.getHashValue("main:state"),
                        geodash.util.getQueryStringValue("main:state"),
                        extract("nativeElement.dataset.dashboardInitialStateUrl", this.element),
                        extract("nativeElement.dataset.dashboardStateUrl", this.element)
                    ]);
                    var urls = [url_config];
                    if (geodash.util.isDefined(url_state)) {
                        urls.push(url_state);
                    }
                    this.bus.request(urls).subscribe(function (data) {
                        _this.dashboard = data[0];
                        _this.state = geodash.var.state = geodash.init.state({
                            "state": (data.length > 1 ? data[1] : undefined),
                            //"stateschema": stateschema,
                            "dashboard": _this.dashboard
                        });
                        /*Object.define("geodash.var.dashboard", {
                          get: {
                            return this.dastbord;
                          }
                        });*/
                        geodash.var.dashboard = function () { return _this.dashboard; };
                        geodash.var.state = function () { return _this.state; };
                        var resources = _this.bootloader.getResources(_this.element);
                        if (Array.isArray(resources) && resources.length > 0) {
                            urls = resources.map(function (r) { return r.url; });
                            _this.bus.request(urls).subscribe(function (data) {
                                for (var i = 0; i < data.length; i++) {
                                    var loaderFn = _this.bootloader.getLoaderFn(resources[i]['loader']);
                                    if (geodash.util.isFunction(loaderFn)) {
                                        loaderFn(data[i]);
                                    }
                                    else {
                                        geodash.var[resources[i]['name']] = data[i];
                                    }
                                }
                                _this.bus.emit("primary", "geodash:loaded", { dashboard: _this.dashboard, state: _this.state }, _this.name);
                                _this.bus.bubble("geodash:loaded", { dashboard: _this.dashboard, state: _this.state }, _this.element);
                            }, function (err) { return console.error(err); }, function () { return console.log("Loaded resources!"); });
                        }
                        else {
                            _this.bus.emit("primary", "geodash:loaded", { dashboard: _this.dashboard, state: _this.state }, _this.name);
                            _this.bus.bubble("geodash:loaded", { dashboard: _this.dashboard, state: _this.state }, _this.element);
                        }
                    }, function (err) { return console.error(err); }, function () { return console.log("Loading complete!"); });
                };
                return GeoDashComponentMain;
            }());
            GeoDashComponentMain = __decorate([
                core_4.Component({
                    selector: 'geodash-main',
                    template: geodash.api.getTemplate('geodashMain.tpl.html'),
                    providers: [
                        GeoDashServiceBus_1.GeoDashServiceBus,
                        GeoDashServiceBootloader_1.GeoDashServiceBootloader,
                        GeoDashServiceCompile_1.GeoDashServiceCompile
                    ]
                }),
                __metadata("design:paramtypes", [core_4.ElementRef, GeoDashServiceBus_1.GeoDashServiceBus, GeoDashServiceBootloader_1.GeoDashServiceBootloader, GeoDashServiceCompile_1.GeoDashServiceCompile])
            ], GeoDashComponentMain);
            exports_4("GeoDashComponentMain", GeoDashComponentMain);
        }
    };
});
System.register("ts/geodash/components/GeoDashComponentMap", ["@angular/core", "ts/geodash/services/GeoDashServiceBus"], function (exports_5, context_5) {
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
                function GeoDashComponentMap(element, bus) {
                    this.element = element;
                    this.bus = bus;
                    this.name = 'GeoDashComponentMap';
                }
                GeoDashComponentMap.prototype.ngOnInit = function () {
                    geodash.var.components[this.name] = this; // register externally
                };
                return GeoDashComponentMap;
            }());
            GeoDashComponentMap = __decorate([
                core_5.Component({
                    selector: 'geodash-map',
                    template: geodash.api.getTemplate('geodashMap.tpl.html')
                }),
                __metadata("design:paramtypes", [core_5.ElementRef, GeoDashServiceBus_2.GeoDashServiceBus])
            ], GeoDashComponentMap);
            exports_5("GeoDashComponentMap", GeoDashComponentMap);
        }
    };
});
System.register("ts/geodash/components/GeoDashComponentMapMap", ["@angular/core", "ts/geodash/services/GeoDashServiceBus", "ts/geodash/services/GeoDashServiceCompile"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_6, GeoDashServiceBus_3, GeoDashServiceCompile_2, GeoDashComponentMapMap;
    return {
        setters: [
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (GeoDashServiceBus_3_1) {
                GeoDashServiceBus_3 = GeoDashServiceBus_3_1;
            },
            function (GeoDashServiceCompile_2_1) {
                GeoDashServiceCompile_2 = GeoDashServiceCompile_2_1;
            }
        ],
        execute: function () {
            GeoDashComponentMapMap = (function () {
                function GeoDashComponentMapMap(element, bus, compileService) {
                    var _this = this;
                    this.element = element;
                    this.bus = bus;
                    this.compileService = compileService;
                    this.name = 'GeoDashComponentMapMap';
                    this.render = function (object, ctx) {
                        return geodash.util.arrayToObject(geodash.util.objectToArray(object).map(function (x) {
                            return {
                                "name": x.name,
                                "value": (geodash.util.isString(x.value) ? _this.interpolate(x.value)(ctx) : x.value)
                            };
                        }));
                    };
                    this.interpolate = function (template) {
                        return function (ctx) { return _this.compileService.compile(template, ctx); };
                    };
                    //onLoaded(data: any, source: any): void {
                    this.onLoaded = function (name, data, source) {
                        console.log("GeoDashComponentMapMap: ", data, source);
                        //
                        _this.dashboard = data["dashboard"];
                        _this.state = data["state"];
                        // Initialize Map
                        var listeners = {
                            "map": {
                                singleclick: _this.onMapSingleClick,
                                postrender: _this.onMapPostRender
                            },
                        };
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
                    this.onMapSingleClick = function (e) {
                        var m = geodash.var.map;
                        var v = m.getView();
                        var c = ol.proj.toLonLat(e.coordinate, v.getProjection());
                        var data = {
                            "location": {
                                "lat": c[1],
                                "lon": c[0]
                            },
                            "pixel": {
                                "x": e.pixel[0],
                                "y": e.pixel[1]
                            }
                        };
                        _this.bus.emit("intents", "clickedOnMap", data, _this.name);
                    };
                    this.onMapPostRender = function (e) {
                        var popover = $("#popup").data("bs.popover");
                        if (geodash.util.isDefined(popover)) {
                            var tether = popover._tether;
                            if (geodash.util.isDefined(tether)) {
                                tether.position();
                            }
                        }
                    };
                    this.onRefresh = function (name, data, source) {
                        _this.state = data["state"];
                        var visibleBaseLayer = _this.state.view.baselayer;
                        var currentLayers = geodash.mapping_library == "ol3" ? geodash.var.map.getLayers().getArray() : undefined;
                        geodash.util.objectToArray(geodash.var.baselayers).forEach(function (x) {
                            var layer = x.value;
                            var visible = x.name == visibleBaseLayer;
                            if (geodash.mapping_library == "ol3") {
                                if (currentLayers.indexOf(layer) != -1 && !visible) {
                                    geodash.var.map.removeLayer(layer);
                                }
                                else if (currentLayers.indexOf(layer) == -1 && visible) {
                                    geodash.var.map.addLayer(layer);
                                }
                            }
                            else {
                                if (geodash.var.map.getLayers().getArray().indexOf(layer) != -1 && !visible) {
                                    geodash.var.map.removeLayer(layer);
                                }
                                else if (geodash.var.map.getLayers().getArray().indexOf(layer) == -1 && visible) {
                                    geodash.var.map.addLayer(layer);
                                }
                            }
                        });
                        var visibleFeatureLayers = _this.state.view.featurelayers;
                        geodash.util.objectToArray(geodash.var.featurelayers).forEach(function (x) {
                            var layer = x.value;
                            var visible = visibleFeatureLayers.indexOf(x.name) != -1;
                            if (geodash.mapping_library == "ol3") {
                                if (currentLayers.indexOf(layer) != -1 && !visible) {
                                    geodash.var.map.removeLayer(layer);
                                }
                                else if (currentLayers.indexOf(layer) == -1 && visible) {
                                    geodash.var.map.addLayer(layer);
                                }
                            }
                            else {
                                if (geodash.var.map.getLayers().getArray().indexOf(layer) != -1 && !visible) {
                                    geodash.var.map.removeLayer(layer);
                                }
                                else if (geodash.var.map.getLayers().getArray().indexOf(layer) == -1 && visible) {
                                    geodash.var.map.addLayer(layer);
                                }
                            }
                        });
                        // Update Render Order
                        var renderLayers = geodash.util.objectToArray(geodash.var.featurelayers).filter(function (x) { return visibleFeatureLayers.indexOf(x["name"]) != -1; });
                        //var renderLayers = $.grep(layersAsArray(geodash.var.featurelayers), function(layer){ return $.inArray(layer["id"], visibleFeatureLayers) != -1;});
                        //var renderLayersSorted = sortLayers(renderLayers.map((layer:any) => layer["layer"]}), true);
                        //var baseLayersAsArray = geodash.util.objectToArray(geodash.var.baselayers).map((x:any) => {'id':x.name, 'layer': x.value});
                        //var baseLayersAsArray = $.map(geodash.var.baselayers, function(layer, id){return {'id':id,'layer':layer};});
                        /*var baseLayers = $.map(
                          $.grep(layersAsArray(geodash.var.baselayers), function(layer){return layer["id"] == visibleBaseLayer;}),
                          function(layer, i){return layer["layer"];});*/
                        // Force Refresh
                        if (geodash.mapping_library == "ol3") {
                            setTimeout(function () {
                                var m = geodash.var.map;
                                m.renderer_.dispose();
                                m.renderer_ = new ol.renderer.canvas.Map(m.viewport_, m);
                                //m.updateSize();
                                m.renderSync();
                            }, 0);
                        }
                        else if (geodash.mapping_library == "leaflet") {
                            for (var i = 0; i < renderLayers.length; i++) {
                                renderLayers[i].bringToFront();
                            }
                            setTimeout(function () { geodash.var.map._onResize(); }, 0);
                        }
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
                    this.onOpenPopup = function (name, data, source) {
                        console.log("Opening popup...", data);
                        if (geodash.util.isDefined(data["featureLayer"]) &&
                            geodash.util.isDefined(data["feature"]) &&
                            geodash.util.isDefined(data["location"])) {
                            geodash.popup.openPopup(_this.interpolate, data["featureLayer"], data["feature"], data["location"], geodash.var.map, _this.state);
                        }
                    };
                }
                GeoDashComponentMapMap.prototype.ngOnInit = function () {
                    geodash.var.components[this.name] = this; // register externally
                    this.bus.listen("primary", "geodash:loaded", this.onLoaded);
                    this.bus.listen("render", "geodash:changeView", this.onChangeView);
                    this.bus.listen("render", "geodash:refresh", this.onRefresh);
                    this.bus.listen("render", "geodash:openPopup", this.onOpenPopup);
                };
                return GeoDashComponentMapMap;
            }());
            GeoDashComponentMapMap = __decorate([
                core_6.Component({
                    selector: 'geodash-map-map',
                    template: geodash.api.getTemplate('geodashMapMap.tpl.html')
                }),
                __metadata("design:paramtypes", [core_6.ElementRef, GeoDashServiceBus_3.GeoDashServiceBus, GeoDashServiceCompile_2.GeoDashServiceCompile])
            ], GeoDashComponentMapMap);
            exports_6("GeoDashComponentMapMap", GeoDashComponentMapMap);
        }
    };
});
System.register("ts/geodash/components/GeoDashComponentMapOverlays", ["@angular/core", "ts/geodash/services/GeoDashServiceBus", "ts/geodash/services/GeoDashServiceCompile"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_7, GeoDashServiceBus_4, GeoDashServiceCompile_3, GeoDashComponentMapOverlays;
    return {
        setters: [
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (GeoDashServiceBus_4_1) {
                GeoDashServiceBus_4 = GeoDashServiceBus_4_1;
            },
            function (GeoDashServiceCompile_3_1) {
                GeoDashServiceCompile_3 = GeoDashServiceCompile_3_1;
            }
        ],
        execute: function () {
            GeoDashComponentMapOverlays = (function () {
                function GeoDashComponentMapOverlays(element, bus, compileService) {
                    var _this = this;
                    this.element = element;
                    this.bus = bus;
                    this.compileService = compileService;
                    this.name = 'GeoDashComponentMapOverlays';
                    //onLoaded(data: any, source: any): void {
                    this.onLoaded = function (name, data, source) {
                        console.log("GeoDashComponentMapOverlays: ", data, source);
                        _this.dashboard = data["dashboard"];
                        _this.state = data["state"];
                        _this.refreshOverlays(); // sets this.overlays
                        console.log("overlays =", _this.overlays);
                        setTimeout(function () {
                            $('[data-toggle="tooltip"]', _this.element.nativeElement).tooltip();
                        }, 0);
                    };
                    this.onRefresh = function (name, data, source) {
                        _this.state = data["state"];
                        _this.refreshOverlays(); // sets this.overlays
                    };
                    this.onClick = function (event, overlay) {
                        var link = extract("link", overlay);
                        if (!geodash.util.isDefined(link)) {
                            var intents = extract("intents", overlay, []);
                            intents.forEach(function (intent) {
                                var data = _this.render(intent.data, { "overlay": overlay });
                                _this.bus.emit("intents", intent.name, data, _this.name);
                            });
                            event.preventDefault();
                        }
                    };
                    this.render = function (object, ctx) {
                        return geodash.util.arrayToObject(geodash.util.objectToArray(object).map(function (x) {
                            return {
                                "name": x.name,
                                "value": (geodash.util.isString(x.value) ? _this.interpolate(x.value)(ctx) : x.value)
                            };
                        }));
                    };
                    this.interpolate = function (template) {
                        return function (ctx) { return _this.compileService.compile(template, ctx); };
                    };
                    this.refreshOverlays = function () {
                        _this.overlays = extract("overlays", _this.dashboard, []).map(function (overlay) { return geodash.util.extend(overlay, {
                            "classes": _this.class_overlay(overlay),
                            "style": _this.style_overlay(overlay.type, overlay),
                            "intents": _this.intents(overlay),
                            "src": _this.imageURL(overlay)
                        }); });
                    };
                    this.state = {};
                    this.overlays = [];
                }
                GeoDashComponentMapOverlays.prototype.ngOnInit = function () {
                    geodash.var.components[this.name] = this; // register externally
                    this.bus.listen("primary", "geodash:loaded", this.onLoaded);
                    this.bus.listen("render", "geodash:refresh", this.onRefresh);
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
                GeoDashComponentMapOverlays.prototype.style_overlay = function (type, overlay) {
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
                GeoDashComponentMapOverlays.prototype.intents = function (overlay) {
                    var data = [];
                    var intents = extract("intents", overlay);
                    if (Array.isArray(intents)) {
                        for (var i = 0; i < intents.length; i++) {
                            var intent = intents[i];
                            var intentName = intent.name;
                            if (geodash.util.isDefined(intentName)) {
                                var intentProperties = intent.properties;
                                if (geodash.util.isDefined(intentProperties)) {
                                    var intentData = geodash.util.arrayToObject(intentProperties, { '$interpolate': this.interpolate, 'ctx': { 'overlay': overlay } });
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
                ;
                return GeoDashComponentMapOverlays;
            }());
            GeoDashComponentMapOverlays = __decorate([
                core_7.Component({
                    selector: 'geodash-map-overlays',
                    template: geodash.api.getTemplate('geodashMapOverlays.tpl.html'),
                    providers: []
                }),
                __metadata("design:paramtypes", [core_7.ElementRef, GeoDashServiceBus_4.GeoDashServiceBus, GeoDashServiceCompile_3.GeoDashServiceCompile])
            ], GeoDashComponentMapOverlays);
            exports_7("GeoDashComponentMapOverlays", GeoDashComponentMapOverlays);
        }
    };
});
System.register("ts/geodash/pipes/GeoDashPipeSlugify", ["@angular/core"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_8, GeoDashPipeSlugify;
    return {
        setters: [
            function (core_8_1) {
                core_8 = core_8_1;
            }
        ],
        execute: function () {
            GeoDashPipeSlugify = (function () {
                function GeoDashPipeSlugify() {
                }
                GeoDashPipeSlugify.prototype.transform = function (value) {
                    if (geodash.util.isString(value)) {
                        return value.toLowerCase().replace(" ", "_").replace("-", "_").replace("=", "_");
                    }
                    else {
                        return "";
                    }
                };
                return GeoDashPipeSlugify;
            }());
            GeoDashPipeSlugify = __decorate([
                core_8.Pipe({ name: 'slugify' })
            ], GeoDashPipeSlugify);
            exports_8("GeoDashPipeSlugify", GeoDashPipeSlugify);
        }
    };
});
System.register("ts/geodash/components/GeoDashComponentMapNavbars", ["@angular/core", "ts/geodash/services/GeoDashServiceBus", "ts/geodash/services/GeoDashServiceCompile", "ts/geodash/pipes/GeoDashPipeSlugify"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_9, GeoDashServiceBus_5, GeoDashServiceCompile_4, GeoDashPipeSlugify_1, GeoDashComponentMapNavbars;
    return {
        setters: [
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (GeoDashServiceBus_5_1) {
                GeoDashServiceBus_5 = GeoDashServiceBus_5_1;
            },
            function (GeoDashServiceCompile_4_1) {
                GeoDashServiceCompile_4 = GeoDashServiceCompile_4_1;
            },
            function (GeoDashPipeSlugify_1_1) {
                GeoDashPipeSlugify_1 = GeoDashPipeSlugify_1_1;
            }
        ],
        execute: function () {
            GeoDashComponentMapNavbars = (function () {
                function GeoDashComponentMapNavbars(element, bus, compileService, slugify) {
                    var _this = this;
                    this.element = element;
                    this.bus = bus;
                    this.compileService = compileService;
                    this.slugify = slugify;
                    this.name = 'GeoDashComponentMapNavbars';
                    //onLoaded(data: any, source: any): void {
                    this.onLoaded = function (name, data, source) {
                        console.log("GeoDashComponentMapNavbars: ", data, source);
                        _this.dashboard = data["dashboard"];
                        _this.state = data["state"];
                        _this.refreshNavbars(); // sets this.navbars
                        console.log("navbars =", _this.navbars);
                        setTimeout((function (element) {
                            return function () {
                                $('[data-toggle="tooltip"]', element).tooltip();
                            };
                        })(_this.element.nativeElement), 0);
                    };
                    this.onRefresh = function (name, data, source) {
                        _this.state = data["state"];
                        _this.refreshNavbars(); // sets this.navbars
                    };
                    this.onClickTab = function (event, navbar, tab) {
                        console.log("tab: ", tab);
                        $('#' + tab.id).blur();
                        var items = extract("tray.items", tab, []);
                        if (items.length > 0) {
                            tab.tray.visible = !tab.tray.visible;
                            tab.tray.opacity = tab.tray.visible ? 1.0 : 0.0;
                            if (geodash.util.isDefined(tab.tooltip) && tab.tray.visible) {
                                $('#' + tab.id).tooltip('hide');
                            }
                        }
                        else {
                            var intents = extract("intents", tab, []);
                            if (geodash.util.isDefined(intents)) {
                                intents.forEach(function (intent) {
                                    var data = _this.render(intent.data, { "navbar": navbar, "tab": tab });
                                    _this.bus.emit("intents", intent.name, data, _this.name);
                                });
                            }
                        }
                        event.preventDefault();
                    };
                    this.onClickItem = function (event, navbar, tab, item) {
                        console.log("tab: ", tab);
                        // Close Tray
                        tab.tray.visible = false;
                        tab.tray.opacity = 0.0;
                        // Process Intents
                        var intents = extract("intents", item, []);
                        if (geodash.util.isDefined(intents)) {
                            intents.forEach(function (intent) {
                                var data = _this.render(intent.data, { "navbar": navbar, "tab": tab, "item": item });
                                _this.bus.emit("intents", intent.name, data, _this.name);
                            });
                            event.preventDefault();
                        }
                    };
                    this.render = function (object, ctx) {
                        return geodash.util.arrayToObject(geodash.util.objectToArray(object).map(function (x) {
                            return {
                                "name": x.name,
                                "value": (geodash.util.isString(x.value) ? _this.interpolate(x.value)(ctx) : x.value)
                            };
                        }));
                    };
                    this.interpolate = function (template) {
                        return function (ctx) { return _this.compileService.compile(template, ctx); };
                    };
                    this.refreshNavbars = function () {
                        _this.navbars = extract("navbars", _this.dashboard, []).map(function (navbar) { return ({
                            "classes": _this.class_navbar(navbar),
                            "style": _this.style_navbar(navbar),
                            "tabs": extract("tabs", navbar, []).map(function (tab) { return geodash.util.extend(tab, {
                                "id": "geodash-map-navbars-tab-" + _this.slugify.transform(tab.value),
                                "wrapper_classes": _this.class_tab_wrapper(navbar, tab),
                                "wrapper_style": _this.style_tab_wrapper(navbar, tab),
                                "classes": _this.class_tab(navbar, tab),
                                "style": _this.style_tab(navbar, tab),
                                "href": _this.link_url(navbar, tab),
                                "target": _this.link_target(navbar, tab),
                                "intents": _this.intents(navbar, tab, undefined),
                                "tooltip": geodash.util.extend({}, tab.tooltip, {
                                    "content": extract("tooltip.content", tab),
                                    "placement": extract("tooltip.placement", tab, _this.default_tab_tooltip_placement[extract("placement", navbar, "bottom")]),
                                    "container": "" // Issue with bootrap 4 tooltips
                                }),
                                "title": tab.title,
                                "tray": {
                                    "classes": _this.class_tray(navbar, tab),
                                    "style": _this.style_tray(navbar, tab),
                                    "visible": false,
                                    "opacity": 0.0,
                                    "items": extract("items", tab, []).map(function (item) { return geodash.util.extend(item, {
                                        "wrapper_classes": _this.class_item_wrapper(navbar, tab, item),
                                        "wrapper_style": _this.style_item_wrapper(navbar, tab, item),
                                        "classes": _this.class_item(navbar, tab, item),
                                        "style": _this.style_item(navbar, tab, item),
                                        "tooltip": geodash.util.extend({}, item.tooltip, {
                                            "content": extract("tooltip.content", item),
                                            "placement": extract("tooltip.placement", item, _this.default_item_tooltip_placement[extract("placement", navbar, "bottom")]),
                                            "container": "" // Issue with bootrap 4 tooltips
                                        }),
                                        "href": _this.link_url_item(navbar, tab, item),
                                        "target": _this.link_target_item(navbar, tab, item),
                                        "intents": _this.intents(navbar, tab, item)
                                    }); })
                                }
                            }); })
                        }); });
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
                        var ctx = {
                            'dashboard': _this.dashboard,
                            'state': _this.state,
                            'navbar': navbar,
                            'tab': tab
                        };
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
                            return _this.interpolate(extract("link.url", tab, ""))(ctx);
                        }
                    };
                    this.intents = function (navbar, tab, item) {
                        var data = [];
                        var intents = extract("intents", item) || extract("intents", tab) || extract("intents", navbar);
                        if (Array.isArray(intents)) {
                            for (var i = 0; i < intents.length; i++) {
                                var intent = intents[i];
                                var intentName = intent.name;
                                if (geodash.util.isDefined(intentName)) {
                                    var intentProperties = intent.properties;
                                    if (geodash.util.isDefined(intentProperties)) {
                                        var intentData = geodash.util.arrayToObject(intentProperties, { $interpolate: _this.interpolate, 'ctx': { 'navbar': navbar, 'tab': tab, 'item': item } });
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
                    this.style_tray = function (navbar, tab) {
                        var styleMap = {};
                        if (geodash.util.isDefined(extract("tray.css.properties", tab))) {
                            geodash.util.extend(styleMap, geodash.util.arrayToObject(extract("tray.css.properties", tab), { '$interpolate': _this.interpolate, 'ctx': { 'tab': tab } }));
                        }
                        else {
                            styleMap = {
                                "position": "absolute",
                                "transition": "opacity 1s"
                            };
                            var placement = extract("placement", navbar, "bottom");
                            if (placement == "top") {
                                styleMap = geodash.util.extend(styleMap, {
                                    "top": "100%"
                                });
                            }
                            else if (placement == "bottom") {
                                styleMap = geodash.util.extend(styleMap, {
                                    "bottom": "100%"
                                });
                            }
                            else if (placement == "left") {
                                styleMap = geodash.util.extend(styleMap, {
                                    "display": "flex",
                                    "left": "100%"
                                });
                            }
                            else {
                                styleMap = geodash.util.extend(styleMap, {
                                    "display": "flex",
                                    "right": "100%"
                                });
                            }
                        }
                        return styleMap;
                    };
                    this.style_item_wrapper = function (navbar, tab, item) {
                        var styleMap = {
                            "padding": "0px"
                        };
                        if (geodash.util.isDefined(extract("wrapper.css.properties", item))) {
                            geodash.util.extend(styleMap, geodash.util.arrayToObject(extract("wrapper.css.properties", item), { '$interpolate': _this.interpolate, 'ctx': { 'navbar': navbar, 'tab': tab, 'item': item } }));
                        }
                        var placement = extract("placement", navbar, "bottom");
                        if (placement == "top") {
                            styleMap = geodash.util.extend(styleMap, {
                                "margin-top": "0.25rem"
                            });
                        }
                        else if (placement == "bottom") {
                            styleMap = geodash.util.extend(styleMap, {
                                "margin-bottom": "0.25rem"
                            });
                        }
                        else if (placement == "left") {
                            styleMap = geodash.util.extend(styleMap, {
                                "display": "inline-block",
                                "margin-left": "0.25rem"
                            });
                        }
                        else {
                            styleMap = geodash.util.extend(styleMap, {
                                "display": "inline-block",
                                "margin-right": "0.25rem"
                            });
                        }
                        return styleMap;
                    };
                    this.style_item = function (navbar, tab, item) {
                        var styleMap = {};
                        if (geodash.util.isDefined(extract("css.properties", item))) {
                            geodash.util.extend(styleMap, geodash.util.arrayToObject(extract("css.properties", item), { '$interpolate': _this.interpolate, 'ctx': { 'tab': tab, 'item': item } }));
                        }
                        return styleMap;
                    };
                    this.link_url_item = function (navbar, tab, item) {
                        var name = extract("page", navbar);
                        var ctx = {
                            'dashboard': _this.dashboard,
                            'state': _this.state,
                            'navbar': navbar,
                            'tab': tab,
                            'item': item
                        };
                        if (geodash.util.isDefined(name)) {
                            var page = geodash.api.getPage(name);
                            if (geodash.util.isDefined(page)) {
                                return _this.interpolate(page)(ctx);
                            }
                            else {
                                return "";
                            }
                        }
                        else {
                            return _this.interpolate(extract("link.url", item, ""))(ctx);
                        }
                    };
                    this.default_tab_tooltip_placement =
                        {
                            "top": "bottom",
                            "left": "right",
                            "bottom": "top",
                            "right": "left"
                        };
                    this.default_item_tooltip_placement =
                        {
                            "top": "right",
                            "left": "bottom",
                            "bottom": "right",
                            "right": "bottom"
                        };
                    this.state = {};
                    this.navbars = [];
                }
                GeoDashComponentMapNavbars.prototype.ngOnInit = function () {
                    geodash.var.components[this.name] = this; // register externally
                    this.bus.listen("primary", "geodash:loaded", this.onLoaded);
                    this.bus.listen("render", "geodash:refresh", this.onRefresh);
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
                        classes = "";
                        var placement = extract("placement", navbar, "bottom");
                        if (placement == "left" || placement == "right") {
                            classes += "row no-gutters";
                        }
                        else {
                            classes += "col";
                        }
                        /*if(geodash.util.isDefined(extract("dropdown.items", tab)))
                        {
                          classes += " dropdown";
                        }*/
                        return classes;
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
                GeoDashComponentMapNavbars.prototype.class_tray = function (navbar, tab) {
                    var classes = extract("tray.css.classes", tab);
                    if (geodash.util.isDefined(classes)) {
                        if (geodash.util.isString(classes)) {
                            return classes;
                        }
                        else if (Array.isArray(classes)) {
                            return classes.join(" ");
                        }
                    }
                    else {
                        classes = "";
                        var placement = extract("placement", navbar, "bottom");
                        if (placement == "left" || placement == "right") {
                        }
                        else {
                            classes += "col";
                        }
                        return classes;
                    }
                };
                GeoDashComponentMapNavbars.prototype.class_item_wrapper = function (navbar, tab, item) {
                    var classes = extract("wrapper.css.classes", item);
                    if (geodash.util.isDefined(classes)) {
                        if (geodash.util.isString(classes)) {
                            return classes;
                        }
                        else if (Array.isArray(classes)) {
                            return classes.join(" ");
                        }
                    }
                    else {
                        classes = "";
                        var placement = extract("placement", navbar, "bottom");
                        if (placement == "left" || placement == "right") {
                            //classes += "col";
                            classes += "";
                        }
                        else {
                            classes += "row no-gutters";
                        }
                        return classes;
                    }
                };
                GeoDashComponentMapNavbars.prototype.class_item = function (navbar, tab, item) {
                    var str = "btn btn-default";
                    if (!geodash.util.isDefined(extract("link", tab))) {
                        str += " geodash-intent";
                    }
                    var placement = extract("placement", navbar, "bottom");
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
                GeoDashComponentMapNavbars.prototype.markdown_item = function (navbar, tab, item) {
                    if (geodash.util.isDefined(extract("markdown", item))) {
                        return extract("markdown", item) ? 1 : 0;
                    }
                    if (geodash.util.isDefined(extract("markdown", tab))) {
                        return extract("markdown", tab) ? 1 : 0;
                    }
                    if (geodash.util.isDefined(extract("markdown", navbar))) {
                        return extract("markdown", navbar) ? 1 : 0;
                    }
                    return 1;
                };
                GeoDashComponentMapNavbars.prototype.link_target_item = function (navbar, tab, item) {
                    var name = extract("page", navbar);
                    if (geodash.util.isDefined(name)) {
                        return "_self";
                    }
                    else {
                        return extract("link.target", item, "");
                    }
                };
                return GeoDashComponentMapNavbars;
            }());
            GeoDashComponentMapNavbars = __decorate([
                core_9.Component({
                    selector: 'geodash-map-navbars',
                    template: geodash.api.getTemplate('geodashMapNavbars.tpl.html'),
                    providers: [
                        GeoDashPipeSlugify_1.GeoDashPipeSlugify
                    ]
                }),
                __metadata("design:paramtypes", [core_9.ElementRef, GeoDashServiceBus_5.GeoDashServiceBus, GeoDashServiceCompile_4.GeoDashServiceCompile, GeoDashPipeSlugify_1.GeoDashPipeSlugify])
            ], GeoDashComponentMapNavbars);
            exports_9("GeoDashComponentMapNavbars", GeoDashComponentMapNavbars);
        }
    };
});
System.register("ts/geodash/pipes/GeoDashPipeExtract", ["@angular/core"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_10, GeoDashPipeExtract;
    return {
        setters: [
            function (core_10_1) {
                core_10 = core_10_1;
            }
        ],
        execute: function () {
            GeoDashPipeExtract = (function () {
                function GeoDashPipeExtract() {
                }
                GeoDashPipeExtract.prototype.transform = function (value) {
                    var path = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        path[_i - 1] = arguments[_i];
                    }
                    return path.length > 0 ? extract(expand(path), value) : undefined;
                };
                return GeoDashPipeExtract;
            }());
            GeoDashPipeExtract = __decorate([
                core_10.Pipe({ name: 'extract' })
            ], GeoDashPipeExtract);
            exports_10("GeoDashPipeExtract", GeoDashPipeExtract);
        }
    };
});
System.register("ts/geodash/pipes/GeoDashPipeTernaryDefined", ["@angular/core"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_11, GeoDashPipeTernaryDefined;
    return {
        setters: [
            function (core_11_1) {
                core_11 = core_11_1;
            }
        ],
        execute: function () {
            GeoDashPipeTernaryDefined = (function () {
                function GeoDashPipeTernaryDefined() {
                }
                GeoDashPipeTernaryDefined.prototype.transform = function (value, definedValue, undefinedValue) {
                    return value ? definedValue : undefinedValue;
                };
                return GeoDashPipeTernaryDefined;
            }());
            GeoDashPipeTernaryDefined = __decorate([
                core_11.Pipe({ name: 'ternary_defined' })
            ], GeoDashPipeTernaryDefined);
            exports_11("GeoDashPipeTernaryDefined", GeoDashPipeTernaryDefined);
        }
    };
});
System.register("ts/geodash/pipes/GeoDashPipeDefaultIfUndefinedOrBlank", ["@angular/core"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_12, GeoDashPipeDefaultIfUndefinedOrBlank;
    return {
        setters: [
            function (core_12_1) {
                core_12 = core_12_1;
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
                core_12.Pipe({ name: 'default_if_undefined_or_blank' })
            ], GeoDashPipeDefaultIfUndefinedOrBlank);
            exports_12("GeoDashPipeDefaultIfUndefinedOrBlank", GeoDashPipeDefaultIfUndefinedOrBlank);
        }
    };
});
System.register("ts/geodash/pipes/GeoDashPipeMarkdownToHTML", ["@angular/core"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_13, GeoDashPipeMarkdownToHTML;
    return {
        setters: [
            function (core_13_1) {
                core_13 = core_13_1;
            }
        ],
        execute: function () {
            GeoDashPipeMarkdownToHTML = (function () {
                function GeoDashPipeMarkdownToHTML() {
                }
                GeoDashPipeMarkdownToHTML.prototype.transform = function (value, flag) {
                    return ((flag != false) && (flag != 0)) ? geodash.codec.md2html(value) : value;
                };
                return GeoDashPipeMarkdownToHTML;
            }());
            GeoDashPipeMarkdownToHTML = __decorate([
                core_13.Pipe({ name: 'md2html' })
            ], GeoDashPipeMarkdownToHTML);
            exports_13("GeoDashPipeMarkdownToHTML", GeoDashPipeMarkdownToHTML);
        }
    };
});
System.register("ts/geodash/pipes/GeoDashPipeAppend", ["@angular/core"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var core_14, GeoDashPipeAppend;
    return {
        setters: [
            function (core_14_1) {
                core_14 = core_14_1;
            }
        ],
        execute: function () {
            GeoDashPipeAppend = (function () {
                function GeoDashPipeAppend() {
                }
                GeoDashPipeAppend.prototype.transform = function (value, arg) {
                    if (geodash.util.isString(value)) {
                        return value + arg;
                    }
                    else {
                        return "" + value + arg;
                    }
                };
                return GeoDashPipeAppend;
            }());
            GeoDashPipeAppend = __decorate([
                core_14.Pipe({ name: 'append' })
            ], GeoDashPipeAppend);
            exports_14("GeoDashPipeAppend", GeoDashPipeAppend);
        }
    };
});
System.register("ts/geodash/pipes/GeoDashPipePrepend", ["@angular/core"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var core_15, GeoDashPipePrepend;
    return {
        setters: [
            function (core_15_1) {
                core_15 = core_15_1;
            }
        ],
        execute: function () {
            GeoDashPipePrepend = (function () {
                function GeoDashPipePrepend() {
                }
                GeoDashPipePrepend.prototype.transform = function (value, arg) {
                    if (geodash.util.isString(value)) {
                        return arg + value;
                    }
                    else {
                        return "" + arg + value;
                    }
                };
                return GeoDashPipePrepend;
            }());
            GeoDashPipePrepend = __decorate([
                core_15.Pipe({ name: 'prepend' })
            ], GeoDashPipePrepend);
            exports_15("GeoDashPipePrepend", GeoDashPipePrepend);
        }
    };
});
System.register("ts/app.module", ["@angular/core", "@angular/http", "@angular/platform-browser", "ts/geodash/components/GeoDashComponentMain", "ts/geodash/components/GeoDashComponentMap", "ts/geodash/components/GeoDashComponentMapMap", "ts/geodash/components/GeoDashComponentMapOverlays", "ts/geodash/components/GeoDashComponentMapNavbars", "ts/geodash/pipes/GeoDashPipeExtract", "ts/geodash/pipes/GeoDashPipeTernaryDefined", "ts/geodash/pipes/GeoDashPipeDefaultIfUndefinedOrBlank", "ts/geodash/pipes/GeoDashPipeMarkdownToHTML", "ts/geodash/pipes/GeoDashPipeSlugify", "ts/geodash/pipes/GeoDashPipeAppend", "ts/geodash/pipes/GeoDashPipePrepend"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var core_16, http_3, platform_browser_1, GeoDashComponentMain_1, GeoDashComponentMap_1, GeoDashComponentMapMap_1, GeoDashComponentMapOverlays_1, GeoDashComponentMapNavbars_1, GeoDashPipeExtract_1, GeoDashPipeTernaryDefined_1, GeoDashPipeDefaultIfUndefinedOrBlank_1, GeoDashPipeMarkdownToHTML_1, GeoDashPipeSlugify_2, GeoDashPipeAppend_1, GeoDashPipePrepend_1, AppModule;
    return {
        setters: [
            function (core_16_1) {
                core_16 = core_16_1;
            },
            function (http_3_1) {
                http_3 = http_3_1;
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
            },
            function (GeoDashPipeSlugify_2_1) {
                GeoDashPipeSlugify_2 = GeoDashPipeSlugify_2_1;
            },
            function (GeoDashPipeAppend_1_1) {
                GeoDashPipeAppend_1 = GeoDashPipeAppend_1_1;
            },
            function (GeoDashPipePrepend_1_1) {
                GeoDashPipePrepend_1 = GeoDashPipePrepend_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_16.NgModule({
                    imports: [platform_browser_1.BrowserModule, http_3.HttpModule],
                    declarations: [
                        GeoDashComponentMain_1.GeoDashComponentMain,
                        GeoDashComponentMap_1.GeoDashComponentMap,
                        GeoDashComponentMapMap_1.GeoDashComponentMapMap,
                        GeoDashComponentMapOverlays_1.GeoDashComponentMapOverlays,
                        GeoDashComponentMapNavbars_1.GeoDashComponentMapNavbars,
                        GeoDashPipeExtract_1.GeoDashPipeExtract,
                        GeoDashPipeTernaryDefined_1.GeoDashPipeTernaryDefined,
                        GeoDashPipeDefaultIfUndefinedOrBlank_1.GeoDashPipeDefaultIfUndefinedOrBlank,
                        GeoDashPipeMarkdownToHTML_1.GeoDashPipeMarkdownToHTML,
                        GeoDashPipeSlugify_2.GeoDashPipeSlugify,
                        GeoDashPipeAppend_1.GeoDashPipeAppend,
                        GeoDashPipePrepend_1.GeoDashPipePrepend
                    ],
                    providers: [],
                    bootstrap: [GeoDashComponentMain_1.GeoDashComponentMain]
                })
            ], AppModule);
            exports_16("AppModule", AppModule);
        }
    };
});
System.register("main", ["@angular/platform-browser-dynamic", "ts/app.module", "@angular/core"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var platform_browser_dynamic_1, app_module_1, core_17;
    return {
        setters: [
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (app_module_1_1) {
                app_module_1 = app_module_1_1;
            },
            function (core_17_1) {
                core_17 = core_17_1;
            }
        ],
        execute: function () {
            if (!/localhost/.test(document.location.host)) {
                core_17.enableProdMode();
            }
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
        }
    };
});

//# sourceMappingURL=app.js.map
