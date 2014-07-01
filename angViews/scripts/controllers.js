var Ctrl = angular.module('Ctrl', []);
Ctrl.controller('angCtrl', ['$scope', 'phone',function ($scope,phone) {
    $scope.phones = [
    {
        'name': 'lg',
        'size': 11
    },
    {
        'name': 'nexus-s',
        'size': 11
    }];

    $scope.order = 'size';
}]);
Ctrl.controller('detailsCtrl', ['$scope', '$routeParams','phone', function ($scope, $routeParams,phone) {
    $scope.phone = phone.get({ 'name': $routeParams.name });

    /*$scope.phone = phone.get({ name: $routeParams.name }, function (phone) {
        //console.log(phone.id);
        $scope.name = phone.id;//phone.name[0];

    });*/
}]);