var angServices = angular.module('angServices', ['ngResource']);
angServices.factory('phone', ['$resource', function ($resource) {
    return $resource('scripts/:name.json');/*, {}, {
        query: { method: 'GET', params: { name: 'lg' }, isArray: false }
    });*/
}]);