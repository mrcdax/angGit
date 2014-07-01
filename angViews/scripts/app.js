var app = angular.module('app', ['ngRoute', 'Ctrl', 'angServices']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/list.html',
        controller: 'angCtrl'
    }).
    when('/:name', {
        templateUrl: 'partials/details.html',
        controller: 'detailsCtrl'
    }).
    otherwise({ redirectTo: '/' });
}]);

