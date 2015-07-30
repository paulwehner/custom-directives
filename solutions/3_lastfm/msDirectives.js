/*
*   To make reusable, need isolate scope and create seperate module for directive with its own namespace
*   that could be provided to other modules using dependency injection.
*
*   This also makes your directives independently testable.
*
*/

angular.module('msDirectives', [])

    .directive('msInitialFocus', function(){
        return{
            restrict: 'A',
            link: function(scope, element){
                element[0].focus();
            }
        };
    })

   .directive('msSelectOnFocus', function(){
        return{
            restrict: 'A',
            link: function(scope, element){
                element.on('focus', function(){
                    element[0].select();
                });

                element.on('mouseup', function(event){
                    event.preventDefault();
                });
            }
        };
    })

    .directive('msPerson', function(){
        return {
            replace: true,
            restrict: "E",
            scope: {
                img: "@",
                name: "@",
                mbid: "@"
            },
            template:   '<div>'+
                            '<div>{{name}}</div>'+
                        '</div>',
            link: function(scope, element, attrs){
                element.click(function(){
                    alert(scope.name+' - '+scope.mbid);
                });

                element.css({
                    'height': '150px',
                    'width': '150px',
                    'border': '1px solid grey',
                    'margin': '30px',
                    'float': 'left',
                    'background-image': 'url(' + scope.img +')',
                    'background-size' : 'cover',
                 });
            }
        };
    });