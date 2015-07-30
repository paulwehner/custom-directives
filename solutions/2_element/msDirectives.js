/*
*   To make reusable, need isolate scope and create seperate module for directive with its own namespace
*   that could be provided to other modules using dependency injection.
*
*   This also makes your directives independently testable.
*
*/

angular.module('msDirectives', [])

    .directive('msPerson', function(){
        return{
            restrict: 'E',
            link: function(scope, element, attrs){
                scope.name = attrs.name;
            },
            template: '<h1>{{name}}</h1>',
            scope: {},
//            replace: true
        };
    });