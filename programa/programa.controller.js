angular.module('tvarkaApp')
.controller('programaCtrl', ['programaFactory', '$scope', function(programaFactory, $scope) {
  programaFactory.getAllItems().$loaded(function(data){
    $scope.programaItems = data;
  });
}]);
