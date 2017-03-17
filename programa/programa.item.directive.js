angular.module('tvarkaApp')
.directive('programaItem', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs, controller) {
      scope.lastElement = "";
      element.click(function(){
        if(element.hasClass('selected')) {
          closeAprasymasSlow(element);
        } else {
          insertAprasymas();
        }
      });

      var closeAprasymas = function(el) {
        el.parent().parent().find('.pusher').remove();
        el.removeClass('selected');
        el.find('.programa-name').animate({
          opacity: 1
        });
      };

      var closeAprasymasSlow = function(el) {
        el.removeClass('selected');
        el.parent().parent().find('.programa-aprasymas').fadeOut(100,
          function(){
            el.parent().parent().find('.pusher').each(function(){
              $(this).slideUp(((Math.random()*300)+200), function(){
                this.remove();
              });
            });
          }
        );
        el.find('.programa-name').animate({
          opacity: 1
        });
      };

      var insertAprasymas = function() {
        if(scope.lastElement instanceof jQuery) {
          closeAprasymas(scope.lastElement);
        }
        scope.lastElement = element;
        element.addClass('selected');

        var info = attrs.bio;
        var pusherhtml = "<div class='pusher'></div>";
        var img = element.find('img')[0].currentSrc;
        var aprasymashtml = "<div class='programa-aprasymas'><div class='closebtn'></div><img src='"+ img +"'><h1>" + attrs.pavadinimas + "</h1>" + info + "<br></div>";
        var buttonhtml = "<a href='" + attrs.pdf + "' target='_blank'><div class='bluebutton' style='margin-top:0'><span class='ico-pdfblue'></span>Atsisiųsti programą</div></a>";
        var sibling = getSibling(element);
        var siblings = getSiblings(element);

        element.after(pusherhtml);
        for(var s in siblings) {
          siblings[s].after(pusherhtml);
        }

        var pushers = element.parent().parent().find('.pusher');
        var infoElement = pushers.first();
        pushers.click(function(){
          closeAprasymasSlow(element);
        });

        // sibling.parent().find('.pusher').append("<div class='ttlogo'><h1>" + attrs.pavadinimas + "</h1></div>").find('.ttlogo').hide().fadeIn(300);
        infoElement.append(aprasymashtml).find('.programa-aprasymas').css('opacity', 0).css('marginTop', '20px').delay(500).animate({ opacity: 1, marginTop: 0 }, 300);
        if (attrs.pdf !== 'undefined') {
          infoElement.find(".programa-aprasymas").append(buttonhtml);
        }
        // infoElement.find(".programa-aprasymas").append(buttonhtml);
        element.find('.programa-name').animate({
          opacity: 0
        });

        var pusherHeight = getNewHeight(infoElement);

        pushers.each(function(){
          $(this).delay(Math.random()*300).animate({
              height: pusherHeight
            }, { duration: (400+Math.random()*200), complete: function(){
              element.parent().find('.pusher').addClass('infoElement');
            }});
        });

        angular.element('html, body').animate({
          scrollTop: $(".programa-aprasymas").offset().top - pusherHeight
        }, 600);

      };

      var getNewHeight = function(el) {
        if(el.parent().find('.pusher').find('.programa-aprasymas').outerHeight() > el.outerHeight()) {
          return el.parent().find('.pusher').find('.programa-aprasymas').outerHeight();
        }
        else {
          return el.outerHeight();
        }
      };
      var getSibling = function(el) {
        var sibRow;
        if(el.parent().index()+1 === numOfSquaresPerRow()) {
          sibRow = el.parent().prev();
        } else {
          sibRow = el.parent().next();
        }
        if(el.index()+1 <= sibRow.children().length) {
          return sibRow.children().eq(el.index());
        } else {
          sibRow.children().last().after("<div class='empty'></div>");
          return sibRow.children().last();
        }
      };
      var getSiblings = function(el) {
        var thisRow = el.parent().index();
        var siblings = [];

        for(var i = 0; i < el.parent().siblings().length; i++) {
          var row = el.parent().siblings().eq(i);
          if(el.index()+1 <= row.children().length) {
            siblings.push((row.children().eq(el.index())));
          } else {
            siblings.push(row.children().last());
          }
        }
        return(siblings);
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
    }
  };
});
