var videos = angular.module('videos', ['starter.controllers.utils']);

videos.controller('videos_controller',function($cordovaInAppBrowser, $scope, req, constants, $location) {
    var CHANNEL_ID = "UCe-RJ-3Q3tUqJciItiZmjdg";
    var YT_API_KEY = "AIzaSyA5LSnAk7YftObCYuPSZIQi21WE6zZA1j0";
    //initially set the title
    $scope.title = "Resources";
    var success_getting_videos = function (data)
    {
        videos = data["data"]["items"];
        
        //Setting scope so view can have access to them
        $scope.videos = videos;
    }
    
    var failure_getting_videos = function (data)
    {
        //Just a sad message :(
    	console.log("Failure got data: " + data);

        //Goes to that lovely error page we have
        $location.path('/app/error');
    }

    angular.element(document).ready(function () 
    {
        url = "https://www.googleapis.com/youtube/v3/search?key=" + YT_API_KEY + "&channelId=" + CHANNEL_ID +
        "&part=snippet,id&order=date&maxResults=50";

        req.get(url, success_getting_videos, failure_getting_videos);
    });

    $scope.view_selected_video = function(video) 
    {
        var video_url = "https://www.youtube.com/embed/" + video["id"]["videoId"];
        var options = {
            location: 'no',
            clearcache: 'yes',
            toolbar: 'no'
        };
        $cordovaInAppBrowser.open(video_url, '_blank', options)
            .then(function(event) {
                console.log("SUCCESS: Launching Browser"+JSON.stringify(event));
            })
            .catch(function(event) {
                console.log("ERROR: Launching Browser"+JSON.stringify(event));
            });
    };
      
});