angular.module('lib/legend/legend.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('lib/legend/legend.html',
    "<div id=legenddiv ng-show={{legendShow}}><h4 class=header><b>Demographic Legend</b></h4><h6 class=title><b>{{legendTitle}}</b></h6><img class=legendimg src={{legendURL}} alt=legend><h6><b>{{FiltersText}}</b></h6></div>"
  );

}]);
;/// <reference path="../../scripts/typings/leaflet/leaflet.d.ts" />
/// <reference path="../../scripts/global.ts" />
var app;
(function (app) {
    "use strict";
    var Legend = (function () {
        function Legend() {
            this.restrict = "E";
            this.templateUrl = "lib/legend/legend.html";
            this.controller = ["$scope", "leafletData", "$attrs", "$element", "$location", function ($scope, leafletData, $attrs, $element, $location) {
                var options = { position: "bottomright" };
                var mlegend = new L.Control(options);
                this.demoStyle = $attrs.xstyle;
                this.layerName = $attrs.layername;
                this.DisplayText = $attrs.displaytext;
                var lg = this;
                $scope.legendShow = true;
                $scope.legendTitle = $attrs.displaytext;
                $scope.legendURL = Geoserver + "/geoserver/xceligent/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&STYLE=" + lg.demoStyle + "&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=xceligent:" + lg.layerName;
                mlegend.onAdd = function (map) {
                    return $element[0];
                    // var legendDiv = $element;
                    // return legendDiv;
                };
                $scope.go = function (path) {
                    $location.path(path);
                };
                leafletData.getMap().then(function (map) {
                    if (Legend.activeLegend !== undefined) {
                        try {
                            map.removeControl(Legend.activeLegend);
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                    mlegend.addTo(map);
                    Legend.activeLegend = mlegend;
                });
                $scope.$on("DemographicsRemoved", function () {
                    console.log("DemographicsRemoved");
                    mlegend._container.className += " removed-item";
                    leafletData.getMap().then(function (map) {
                        //  map.removeControl(mlegend);
                    });
                });
            }];
            console.log("Legend constructor");
        }
        Legend.getInstance = function () {
            return new Legend();
        };
        return Legend;
    })();
    angular.module('lba.Demographics').directive("legend", function () { return Legend.getInstance(); });
})(app || (app = {}));
//# sourceMappingURL=legend.js.map