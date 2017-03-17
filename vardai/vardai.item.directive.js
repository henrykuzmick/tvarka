angular.module('tvarkaApp')
.directive('vardaiItem', ['$compile', function($compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs, controller) {
      element.click(function(){
        insertAprasymas();
        addClasses();
      });
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
      var findInsertPoint = function() {
        var curSqr = element.index() + 1;
        if(element.index() + 1 === element.parent().children().length) {
          return curSqr;
        } else if(element.index() + 2 === element.parent().children().length) {
          return curSqr+1;
        }
        else {
          if(numOfSquaresPerRow() === 3) {
            if(curSqr%3 === 0) {
              return curSqr;
            } else if ((curSqr+1)%3 === 0) {
              return curSqr+1;
            } else {
              return curSqr+2;
            }
          } else {
            if(curSqr%2 === 0) {
              return curSqr;
            } else {
              return curSqr+1;
            }
          }
        }
      };
      var addClasses = function() {
        element.parent().find('.selected').removeClass('selected');
        element.addClass('selected').removeClass('grey');
        element.parent().find('.vardai-item').not('.selected').addClass('grey');
      };
      var insertAprasymas = function() {
        element.parent().find(".aprasymas").remove();
        var el = $compile("<div class='aprasymas' vardai-aprasymas><div class='closebtn'></div>"+ attrs.aprasymas +"</div>")(scope);
        var fb = $compile("<a href='"+ attrs.fb +"' target='_blank'><div class='fbico' ng-show='false'></div></a>")(scope);
        element.parent().find("li:nth-child("+ findInsertPoint() +")").after(el)
        .siblings('.aprasymas').hide().slideDown(500, function(){
          if(numOfSquaresPerRow() === 3) {
            $(this).addClass('pos3'+element.index()%3);
          } else {
            $(this).addClass('pos2'+element.index()%3);
          }
          $(this).addClass('arrow');
        });
        if (/\S/.test(attrs.fb)) {
          element.parent().find(".aprasymas").append(fb);
        }
        angular.element('html, body').animate({
          scrollTop: $(".aprasymas").offset().top - 300
        }, 600);
      };
      scope.removeAprasymas = function() {
        element.parent().find(".aprasymas").slideUp(300, function(){
          this.remove();
        });
        element.removeClass('selected').removeClass('grey');
        element.siblings().removeClass('selected').removeClass('grey');
      };
		}
  };
}]);
