webpackJsonp([1,4],{

/***/ 124:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 124;


/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ts_app_module__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(5);



if (!/localhost/.test(document.location.host)) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__ts_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__geodash_components_GeoDashComponentMain__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__geodash_components_GeoDashComponentMap__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__geodash_components_GeoDashComponentMapMap__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__geodash_components_GeoDashComponentMapOverlays__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__geodash_components_GeoDashComponentMapNavbars__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__geodash_pipes_GeoDashPipeExtract__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__geodash_pipes_GeoDashPipeTernaryDefined__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__geodash_pipes_GeoDashPipeDefaultIfUndefinedOrBlank__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__geodash_pipes_GeoDashPipeMarkdownToHTML__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__geodash_pipes_GeoDashPipeSlugify__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__geodash_pipes_GeoDashPipeAppend__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__geodash_pipes_GeoDashPipePrepend__ = __webpack_require__(140);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* Angular */



/* Components */





/* Pipes */







var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* HttpModule */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__geodash_components_GeoDashComponentMain__["a" /* GeoDashComponentMain */],
            __WEBPACK_IMPORTED_MODULE_4__geodash_components_GeoDashComponentMap__["a" /* GeoDashComponentMap */],
            __WEBPACK_IMPORTED_MODULE_5__geodash_components_GeoDashComponentMapMap__["a" /* GeoDashComponentMapMap */],
            __WEBPACK_IMPORTED_MODULE_6__geodash_components_GeoDashComponentMapOverlays__["a" /* GeoDashComponentMapOverlays */],
            __WEBPACK_IMPORTED_MODULE_7__geodash_components_GeoDashComponentMapNavbars__["a" /* GeoDashComponentMapNavbars */],
            __WEBPACK_IMPORTED_MODULE_8__geodash_pipes_GeoDashPipeExtract__["a" /* GeoDashPipeExtract */],
            __WEBPACK_IMPORTED_MODULE_9__geodash_pipes_GeoDashPipeTernaryDefined__["a" /* GeoDashPipeTernaryDefined */],
            __WEBPACK_IMPORTED_MODULE_10__geodash_pipes_GeoDashPipeDefaultIfUndefinedOrBlank__["a" /* GeoDashPipeDefaultIfUndefinedOrBlank */],
            __WEBPACK_IMPORTED_MODULE_11__geodash_pipes_GeoDashPipeMarkdownToHTML__["a" /* GeoDashPipeMarkdownToHTML */],
            __WEBPACK_IMPORTED_MODULE_12__geodash_pipes_GeoDashPipeSlugify__["a" /* GeoDashPipeSlugify */],
            __WEBPACK_IMPORTED_MODULE_13__geodash_pipes_GeoDashPipeAppend__["a" /* GeoDashPipeAppend */],
            __WEBPACK_IMPORTED_MODULE_14__geodash_pipes_GeoDashPipePrepend__["a" /* GeoDashPipePrepend */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__geodash_components_GeoDashComponentMain__["a" /* GeoDashComponentMain */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geodash_services_GeoDashServiceBus__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geodash_services_GeoDashServiceBootloader__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__geodash_services_GeoDashServiceCompile__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoDashComponentMain; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* Components */

/* Services */



var templates = extract("config.", geodash);
var GeoDashComponentMain = (function () {
    function GeoDashComponentMain(element, bus, bootloader, compileService) {
        var _this = this;
        this.element = element;
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
        this.bus.listen("primary", "geodash:maploaded", this.onMapLoaded);
        this.bus.listen("intents", "*", this.onIntent);
        var urls = [
            geodash.util.coalesce([
                geodash.util.getHashValue("main:config"),
                geodash.util.getQueryStringValue("main:config")
            ])
        ];
        this.bus.request(urls).subscribe(function (data) {
            _this.dashboard = data[0];
            _this.state = geodash.var.state = geodash.init.state({
                //"state": state,
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
            _this.bus.emit("primary", "geodash:loaded", { dashboard: _this.dashboard, state: _this.state }, _this.name);
        }, function (err) { return console.error(err); }, function () { return console.log("Loading complete!"); });
    };
    return GeoDashComponentMain;
}());
GeoDashComponentMain = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'geodash-main',
        template: geodash.api.getTemplate('geodashMain.tpl.html'),
        providers: [
            __WEBPACK_IMPORTED_MODULE_1__geodash_services_GeoDashServiceBus__["a" /* GeoDashServiceBus */],
            __WEBPACK_IMPORTED_MODULE_2__geodash_services_GeoDashServiceBootloader__["a" /* GeoDashServiceBootloader */],
            __WEBPACK_IMPORTED_MODULE_3__geodash_services_GeoDashServiceCompile__["a" /* GeoDashServiceCompile */]
        ]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__geodash_services_GeoDashServiceBus__["a" /* GeoDashServiceBus */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__geodash_services_GeoDashServiceBus__["a" /* GeoDashServiceBus */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__geodash_services_GeoDashServiceBootloader__["a" /* GeoDashServiceBootloader */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__geodash_services_GeoDashServiceBootloader__["a" /* GeoDashServiceBootloader */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__geodash_services_GeoDashServiceCompile__["a" /* GeoDashServiceCompile */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__geodash_services_GeoDashServiceCompile__["a" /* GeoDashServiceCompile */]) === "function" && _d || Object])
], GeoDashComponentMain);

var _a, _b, _c, _d;
//# sourceMappingURL=GeoDashComponentMain.js.map

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geodash_services_GeoDashServiceBus__ = __webpack_require__(27);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoDashComponentMap; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* Components */

/* Services */

var GeoDashComponentMap = (function () {
    function GeoDashComponentMap(element, bus) {
        this.element = element;
        this.bus = bus;
        this.name = 'GeoDashComponentMap';
    }
    GeoDashComponentMap.prototype.ngOnInit = function () {
    };
    return GeoDashComponentMap;
}());
GeoDashComponentMap = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'geodash-map',
        template: geodash.api.getTemplate('geodashMap.tpl.html')
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__geodash_services_GeoDashServiceBus__["a" /* GeoDashServiceBus */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__geodash_services_GeoDashServiceBus__["a" /* GeoDashServiceBus */]) === "function" && _b || Object])
], GeoDashComponentMap);

var _a, _b;
//# sourceMappingURL=GeoDashComponentMap.js.map

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geodash_services_GeoDashServiceBus__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geodash_services_GeoDashServiceCompile__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoDashComponentMapMap; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* Components */

/* Services */


var GeoDashComponentMapMap = (function () {
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
        this.bus.listen("primary", "geodash:loaded", this.onLoaded);
        this.bus.listen("render", "geodash:changeView", this.onChangeView);
        this.bus.listen("render", "geodash:refresh", this.onRefresh);
        this.bus.listen("render", "geodash:openPopup", this.onOpenPopup);
    };
    return GeoDashComponentMapMap;
}());
GeoDashComponentMapMap = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'geodash-map-map',
        template: geodash.api.getTemplate('geodashMapMap.tpl.html')
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__geodash_services_GeoDashServiceBus__["a" /* GeoDashServiceBus */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__geodash_services_GeoDashServiceBus__["a" /* GeoDashServiceBus */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__geodash_services_GeoDashServiceCompile__["a" /* GeoDashServiceCompile */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__geodash_services_GeoDashServiceCompile__["a" /* GeoDashServiceCompile */]) === "function" && _c || Object])
], GeoDashComponentMapMap);

var _a, _b, _c;
//# sourceMappingURL=GeoDashComponentMapMap.js.map

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geodash_services_GeoDashServiceBus__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geodash_services_GeoDashServiceCompile__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__geodash_pipes_GeoDashPipeSlugify__ = __webpack_require__(82);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoDashComponentMapNavbars; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* Components */

/* Services */



var GeoDashComponentMapNavbars = (function () {
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
                    "tooltip": tab.tooltip,
                    "placement": _this.tab_tooltip_placement(navbar, tab),
                    "container": _this.tab_tooltip_container(navbar, tab),
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
                            "href": _this.link_url_item(navbar, tab, item),
                            "target": _this.link_target_item(navbar, tab, item),
                            "intents": _this.intents(navbar, tab, item)
                        }); })
                    }
                }); })
            }); });
            console.log("navbars =", _this.navbars);
            setTimeout(function () {
                $('[data-toggle="tooltip"]', _this.element.nativeElement).tooltip();
            }, 0);
        };
        this.onClickTab = function (event, navbar, tab) {
            console.log("tab: ", tab);
            var items = extract("tray.items", tab, []);
            if (items.length > 0) {
                tab.tray.visible = !tab.tray.visible;
                tab.tray.opacity = tab.tray.visible ? 1.0 : 0.0;
                if (geodash.util.isDefined(tab.tooltip) && tab.tray.visible) {
                    $('#' + tab.id).tooltip('hide');
                }
                event.preventDefault();
            }
            else {
                var intents = extract("intents", tab, []);
                if (geodash.util.isDefined(intents)) {
                    intents.forEach(function (intent) {
                        var data = _this.render(intent.data, { "navbar": navbar, "tab": tab });
                        _this.bus.emit("intents", intent.name, data, _this.name);
                    });
                    event.preventDefault();
                }
            }
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
                return extract("link.url", item, "");
            }
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
    GeoDashComponentMapNavbars.prototype.tab_tooltip_container = function (navbar, tab) {
        return extract("tooltip.container", tab, "body");
    };
    GeoDashComponentMapNavbars.prototype.tab_tooltip_placement = function (navbar, tab) {
        return extract("tooltip.placement", tab, this.default_tooltip_placement[extract("placement", navbar, "bottom")]);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'geodash-map-navbars',
        template: geodash.api.getTemplate('geodashMapNavbars.tpl.html'),
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__geodash_pipes_GeoDashPipeSlugify__["a" /* GeoDashPipeSlugify */]
        ]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__geodash_services_GeoDashServiceBus__["a" /* GeoDashServiceBus */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__geodash_services_GeoDashServiceBus__["a" /* GeoDashServiceBus */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__geodash_services_GeoDashServiceCompile__["a" /* GeoDashServiceCompile */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__geodash_services_GeoDashServiceCompile__["a" /* GeoDashServiceCompile */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__geodash_pipes_GeoDashPipeSlugify__["a" /* GeoDashPipeSlugify */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__geodash_pipes_GeoDashPipeSlugify__["a" /* GeoDashPipeSlugify */]) === "function" && _d || Object])
], GeoDashComponentMapNavbars);

var _a, _b, _c, _d;
//# sourceMappingURL=GeoDashComponentMapNavbars.js.map

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geodash_services_GeoDashServiceBus__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geodash_services_GeoDashServiceCompile__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoDashComponentMapOverlays; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* Components */

/* Services */


var GeoDashComponentMapOverlays = (function () {
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
            _this.overlays = extract("overlays", _this.dashboard, []).map(function (overlay) { return geodash.util.extend(overlay, {
                "classes": _this.class_overlay(overlay),
                "style": _this.style_overlay(overlay.type, overlay),
                "intents": _this.intents(overlay),
                "src": _this.imageURL(overlay)
            }); });
            console.log("overlays =", _this.overlays);
            setTimeout(function () {
                $('[data-toggle="tooltip"]', _this.element.nativeElement).tooltip();
            }, 0);
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
        this.state = {};
        this.overlays = [];
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'geodash-map-overlays',
        template: geodash.api.getTemplate('geodashMapOverlays.tpl.html'),
        providers: []
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__geodash_services_GeoDashServiceBus__["a" /* GeoDashServiceBus */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__geodash_services_GeoDashServiceBus__["a" /* GeoDashServiceBus */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__geodash_services_GeoDashServiceCompile__["a" /* GeoDashServiceCompile */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__geodash_services_GeoDashServiceCompile__["a" /* GeoDashServiceCompile */]) === "function" && _c || Object])
], GeoDashComponentMapOverlays);

var _a, _b, _c;
//# sourceMappingURL=GeoDashComponentMapOverlays.js.map

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoDashPipeAppend; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GeoDashPipeAppend = (function () {
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Pipe */])({ name: 'append' })
], GeoDashPipeAppend);

//# sourceMappingURL=GeoDashPipeAppend.js.map

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoDashPipeDefaultIfUndefinedOrBlank; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GeoDashPipeDefaultIfUndefinedOrBlank = (function () {
    function GeoDashPipeDefaultIfUndefinedOrBlank() {
    }
    GeoDashPipeDefaultIfUndefinedOrBlank.prototype.transform = function (value, args) {
        return value ? value : args[0];
    };
    return GeoDashPipeDefaultIfUndefinedOrBlank;
}());
GeoDashPipeDefaultIfUndefinedOrBlank = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Pipe */])({ name: 'default_if_undefined_or_blank' })
], GeoDashPipeDefaultIfUndefinedOrBlank);

//# sourceMappingURL=GeoDashPipeDefaultIfUndefinedOrBlank.js.map

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoDashPipeExtract; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GeoDashPipeExtract = (function () {
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Pipe */])({ name: 'extract' })
], GeoDashPipeExtract);

//# sourceMappingURL=GeoDashPipeExtract.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoDashPipeMarkdownToHTML; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GeoDashPipeMarkdownToHTML = (function () {
    function GeoDashPipeMarkdownToHTML() {
    }
    GeoDashPipeMarkdownToHTML.prototype.transform = function (value, flag) {
        return ((flag != false) && (flag != 0)) ? geodash.codec.md2html(value) : value;
    };
    return GeoDashPipeMarkdownToHTML;
}());
GeoDashPipeMarkdownToHTML = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Pipe */])({ name: 'md2html' })
], GeoDashPipeMarkdownToHTML);

//# sourceMappingURL=GeoDashPipeMarkdownToHTML.js.map

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoDashPipePrepend; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GeoDashPipePrepend = (function () {
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Pipe */])({ name: 'prepend' })
], GeoDashPipePrepend);

//# sourceMappingURL=GeoDashPipePrepend.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoDashPipeTernaryDefined; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GeoDashPipeTernaryDefined = (function () {
    function GeoDashPipeTernaryDefined() {
    }
    GeoDashPipeTernaryDefined.prototype.transform = function (value, definedValue, undefinedValue) {
        return value ? definedValue : undefinedValue;
    };
    return GeoDashPipeTernaryDefined;
}());
GeoDashPipeTernaryDefined = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Pipe */])({ name: 'ternary_defined' })
], GeoDashPipeTernaryDefined);

//# sourceMappingURL=GeoDashPipeTernaryDefined.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoDashServiceBootloader; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GeoDashServiceBootloader = (function () {
    function GeoDashServiceBootloader(http) {
        this.http = http;
    }
    return GeoDashServiceBootloader;
}());
GeoDashServiceBootloader = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], GeoDashServiceBootloader);

var _a;
//# sourceMappingURL=GeoDashServiceBootloader.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoDashServiceBus; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GeoDashServiceBus = (function () {
    //public primary: EventEmitter<any>;
    //public intents: EventEmitter<any>;
    function GeoDashServiceBus(http) {
        var _this = this;
        this.http = http;
        this.channels = [];
        this.listeners = {};
        ["primary", "intents", "render"].forEach(function (channel) {
            _this.listeners[channel] = {};
            _this.channels[channel] = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* EventEmitter */]();
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
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].forkJoin(urls.map(function (url) {
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
        //this.listeners[channel] = extract(channel, this.listeners, {});
        this.listeners[channel][name] = extract([channel, name], this.listeners, []);
        this.listeners[channel][name].push(callback);
    };
    return GeoDashServiceBus;
}());
GeoDashServiceBus = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], GeoDashServiceBus);

var _a;
//# sourceMappingURL=GeoDashServiceBus.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoDashServiceCompile; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GeoDashServiceCompile = (function () {
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], GeoDashServiceCompile);

//# sourceMappingURL=GeoDashServiceCompile.js.map

/***/ }),

/***/ 473:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(126);


/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeoDashPipeSlugify; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GeoDashPipeSlugify = (function () {
    function GeoDashPipeSlugify() {
    }
    GeoDashPipeSlugify.prototype.transform = function (value) {
        if (geodash.util.isString(value)) {
            return value.toLowerCase().toLowerCase(" ", "_").replace("-", "_").replace("=", "_");
        }
        else {
            return "";
        }
    };
    return GeoDashPipeSlugify;
}());
GeoDashPipeSlugify = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Pipe */])({ name: 'slugify' })
], GeoDashPipeSlugify);

//# sourceMappingURL=GeoDashPipeSlugify.js.map

/***/ })

},[473]);
//# sourceMappingURL=main.bundle.js.map