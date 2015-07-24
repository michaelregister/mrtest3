#lba.legend
**This is intended to be used with the XDemographics module**

To create the map legend add the following javascript into the controller that contains the map. 

```javascript
 $rootScope.$on('createlegend', function (event, data) {
        var ele = angular.element(
            '<legend class="legenddiv animated flip" xstyle="'
            + data[0]+ '" layername="' + data[1]
            + '" displaytext="' + data[2] + '" ></legend>'
            );
        var newScope = $scope.$new();
        var compiled = $compile(ele)($scope);
    });
```
