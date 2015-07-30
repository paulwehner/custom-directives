angular.module('app', [])

    .directive('initialFocus', function(){
        return{
            restrict: 'A',
            link: function(scope, element){
                element[0].focus();
            }
        };
    })

    .directive('selectOnFocus', function(){
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
    });