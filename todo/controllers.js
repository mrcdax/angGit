var TodoController = angular.module('TodoController', []);
TodoController.controller('ctrl', ['$scope', function ($scope) {
    $scope.app_title = "ToDo app title";
    $scope.app_headline = 'App headline';
    $scope.editsave = "edit";
    $scope.readonly = true;
    $scope.todos = [
        { id: 0, text: 'first todo', done: false },
        { id: 1, text: 'second todo', done: true } 
    ];
    //watch modifications on todos to update the localstorage
    $scope.$watch('todos', function (newval) {
        for (var i = 0; i < $scope.todos.length; i++) {
            $scope.todos[i].id = i+1;
        }
        localStorage.setItem('todos', angular.toJson($scope.todos));
    }, true);
    if (localStorage.todos) {
        $scope.todos = angular.fromJson(localStorage.todos);
    }

    $scope.addTodo = function () {
        if ($scope.todoText) {
            $scope.todos.push({
                id: $scope.todos.length + 1,
                text: $scope.todoText,
                done: false
            });
            $scope.todoText = '';
        }
    }

    $scope.remaining = function () {
        var count = 0;
        angular.forEach($scope.todos, function (todo) {
            todo.done ? count : count++;
        });
        return count;
    };
    $scope.archive = function () {
        var res = $scope.todos.filter(function (value) {
            return value.done == false;
        });
        $scope.todos = res;
    };
    $scope.edit = function (todo) {
        var r;
        r = $scope.readonly ? false : true;
        document.getElementById("id" + todo.id).readOnly = r;
        $scope.readonly = r;
        document.getElementById("btn" + todo.id).innerHTML = r ? "edit" : "save";
        document.getElementById("id" + todo.id).style.border = !r ? "2px solid rgba(0, 138, 255, 0.10)" : "none";
    };
}]);