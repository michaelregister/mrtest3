/// <reference path="../../../scripts/typings/leaflet/leaflet.d.ts" />
/// <reference path="../../../scripts/global.ts" />
module app {
    "use strict";
    interface IlegendScope extends ng.IScope {
        legendShow: boolean;
        legendTitle: string;
        legendURL: string;
        go(path: string);
    }
    interface IlegendAttributes extends ng.IAttributes {
        xstyle: string;
        layername: string;
        displaytext: string;
    }
    class Legend implements ng.IDirective {
        static activeLegend: L.Control;
        public restrict: string = "E";
        demoStyle: string;
        layerName: string;
        filterObject: any;
        currentLegend: L.Control;
       

        constructor() {
            console.log("Legend constructor");
        }
        templateUrl: string = "~/../bower_components/mrtest3/legend/legend.html";
        controller = ["$scope", "leafletData", "$attrs", "$element", "$location",
            function ($scope: IlegendScope, leafletData: any, $attrs: IlegendAttributes, $element: any, $location: ng.ILocationService) {
            var options: any = { position: "bottomright" };
            var mlegend: any = new L.Control(options);
            this.demoStyle = $attrs.xstyle;
            this.layerName = $attrs.layername;
            this.DisplayText = $attrs.displaytext;
            var lg = this;
            $scope.legendShow = true;
            $scope.legendTitle = $attrs.displaytext;
             $scope.legendURL = Geoserver + "/geoserver/xceligent/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&STYLE="
                    + lg.demoStyle + "&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=xceligent:" + lg.layerName;
            
             mlegend.onAdd = function (map: L.Map) {
                 return $element[0];
                 // var legendDiv = $element;
                 // return legendDiv;
             };

             $scope.go = function (path: string) {
                 $location.path(path);
             };
            leafletData.getMap().then(function (map: L.Map) {
               
                if (Legend.activeLegend !== undefined) {
                    try {
                        map.removeControl(Legend.activeLegend);
                    } catch (e) { console.log(e); }
                }
                mlegend.addTo(map);
                Legend.activeLegend = mlegend;
            });
            $scope.$on("DemographicsRemoved", function () {
                console.log("DemographicsRemoved");
                
                mlegend._container.className += " removed-item";
                leafletData.getMap().then(function (map: L.Map) {
                  //  map.removeControl(mlegend);

                });
            });
            
 
        }];

        public static getInstance(): Legend {
            return new Legend();
        }
    }

    angular.module(NameSpace).directive("legend", () => Legend.getInstance());
}