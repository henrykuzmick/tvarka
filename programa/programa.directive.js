angular.module('tvarkaApp')
.directive('programa', ['$window', '$compile', function($window, $compile) {
  return {
    restrict: 'A',
    // templateUrl: 'programa.directive.html',
    replace: true,
    scope: {
      programaItems: '='
    },
    link: function(scope, elem, attrs, controller) {
      scope.numOfSquaresPerRow = 0;
      var destroyHTML = function() {
        elem.find('.col1').remove();
        elem.find('.col2').remove();
        elem.find('.col3').remove();
      };
      var buildHTML = function() {
        if(scope.programaItems){
          var c1,c2,c3;
          if(scope.numOfSquaresPerRow === 3) {
            c1 = elem.append("<div class='col-xs-4 nopad col1'></div>").children().last();
            c2 = elem.append("<div class='col-xs-4 nopad col2'></div>").children().last();
            c3 = elem.append("<div class='col-xs-4 nopad col3'></div>").children().last();
          }
          else {
            c1 = elem.append("<div class='col-xs-6 nopad col1'></div>").children().last();
            c2 = elem.append("<div class='col-xs-6 nopad col2'></div>").children().last();
          }
          for(var i = 0; i<=scope.programaItems.length; i++) {
            var curCol;
            if(scope.numOfSquaresPerRow === 3) {
              switch((i+1)%3) {
                case 0:
                  curCol = c3;
                  break;
                case 1:
                  curCol = c1;
                  break;
                case 2:
                  curCol = c2;
                  break;
              }
            } else {
              switch((i+1)%2) {
                case 0:
                  curCol = c2;
                  break;
                case 1:
                  curCol = c1;
                  break;
              }
            }
            if(i !== scope.programaItems.length) {
              var el = $compile("<div class='programa-item' programa-item pdf='" + scope.programaItems[i].pdf + "' bio='" + htmlEscape(scope.programaItems[i].aprasymas) + "' pavadinimas='" + scope.programaItems[i].pavadinimas + "'><img/><div class='programa-name'><h2>" + scope.programaItems[i].pavadinimas + "</h2></div></div>")(scope);
              curCol.append(el)
              .children().last().find('img').attr('src', scope.programaItems[i].foto);
            } else {
              var ats = $compile("<div class='programa-ats'><a href='TT_brosiura_preview.pdf'><img src='images/veliava.jpg'><div class='button button-veliava'><span class='ico-pdf'></span><span>Atsisiųsti visą programą</span></div></a></div>")(scope);
              curCol.append(ats);
            }
          }
        }
      };
      var htmlEscape = function (str) {
        return str
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      };
      var numOfSquaresPerRow = function() {
        var breakPoint = 767;
        var w = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
        if(w>breakPoint) {
          return 3;
        } else {
          return 2;
        }
      };
      angular.element($window).bind('resize', function(){
        if(scope.numOfSquaresPerRow != numOfSquaresPerRow()) {
          scope.numOfSquaresPerRow = numOfSquaresPerRow();
          destroyHTML();
          buildHTML();
        }
      });
      scope.$watch('programaItems', function(value) {
        scope.numOfSquaresPerRow = numOfSquaresPerRow();
        buildHTML();
      });
		}
  };
}]);
