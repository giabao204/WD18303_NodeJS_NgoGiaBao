const app = angular.module("appHTML", []);


app.controller("formController", function ($scope){
$scope.name = "Gia Bao";
console.log($scope.name);
});

app.controller("ListController", ListController);

function ListController($scope, $http) {
    $http.get("/api/product").then(function (response) {
        console.log(response.data.data);
        $scope.listData = response.data.data;
    })
}