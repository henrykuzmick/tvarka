angular.module('tvarkaApp')
.directive('vardaiAprasymas', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs, controller) {
      elem.find('.closebtn').click(function(){
        scope.removeAprasymas();
      });
		}
  };
});
