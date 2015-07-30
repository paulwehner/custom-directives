/* YOU NEED TO REPLACE THIS WITH YOUR OWN LAST.FM API KEY */
var api_key='0f73674b7010325e7dd64f1989e1e807';

angular.module('app', ['msDirectives'])

  .controller('ArtistController', ['Lastfm', '$scope', function(Lastfm, $scope){
    $scope.searchValue = '';
    $scope.artists = [];

    $scope.mbidFilter = function(artist) {
        return ( artist.mbid.length > 1);
    };

    var _this = this;
    _this.stopSearch = function(){
      if(_this.timeout){
        window.clearTimeout(_this.timeout);       
      }   
    };

    $scope.$watch('searchValue', function(newValue, oldValue){
      _this.stopSearch();
      if(newValue.length > 1){
        _this.timeout = window.setTimeout(function(){
          console.log(newValue);
          Lastfm.searchArtists(newValue)
            .success(function(data,status){
              if(data && data.results.artistmatches.artist){
                var artists = data.results.artistmatches.artist;
                console.log(artists);
                $scope.artists = artists;         
              }
              else{
                $scope.artists = [];
              }
            })
            .catch(function(data, status){
              alert('Lastfm search failed. ');
              console.log('search failed...');
              $scope.artists = [];
            });
        }, 1000);
      }
    });
  }])

  .factory('Lastfm', ['$http', function LastfmFactory($http) {
    return {
      searchArtists: function(artist) {
        if(artist.length > 1){
          return $http({
            method: 'GET', 
            url: 'https://ws.audioscrobbler.com/2.0/?method=artist.search',
            params: {
              api_key: api_key,
              format: 'json',
              limit: '10',
              artist: artist,
            }
          });        
        }
        else{
          return false;
        }
      },
      artistDetail: function(mbid){
        if(mbid.length > 1){
          return $http({
            method: 'GET', 
            url: 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo',
            params: {
              api_key: api_key,
              format: 'json',
              mbid: mbid
            }
          });        
        }
        else{
          return false;
        }
      }
    };
  }]);