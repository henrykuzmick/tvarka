angular.module('tvarkaApp')
.controller('vardaiCtrl', ['vardaiFactory', function(vardaiFactory) {
  var vm = this;
  vardaiFactory.getAllItems().$loaded(function(data){
    vm.vardai = data;
  });
}]);
