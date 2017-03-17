angular.module('tvarkaApp')
.directive('vardai', function() {
  return {
    restrict: 'E',
    templateUrl: 'vardai.directive.html',
    replace: true,
    link: function(scope, elem, attrs, controller) {

		}
  };
});
