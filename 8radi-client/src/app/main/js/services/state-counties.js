var app = angular.module('8rad');

app.factory('counties', ['$http', '$q', function ($http, $q) {
    return {
        getCountiesByState: function (mystate) {
            var deferred = $q.defer();
            $http.get('/assets/resources/counties.json').success(function (data) {
                    deferred.resolve(data[mystate]);
                }
            );
            return deferred.promise;

        }

    }
}]);

app.factory('states', ['$http', '$q', function ($http, $q) {
    var deferred = $q.defer();
    $http.get('/assets/resources/states.json').success(function (data) {
            deferred.resolve(data);
        }
    );
    return deferred.promise;
}
]);