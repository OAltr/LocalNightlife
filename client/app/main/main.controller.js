'use strict';

angular.module('localNightlifeApp')
	.controller('MainCtrl', function ($scope, $http, socket, Auth) {
		$scope.searchString = '';
		$scope.locations = [];

		$scope.startSearching = function (searchString) {
			if(searchString === '')
				return;

			$http.get('/api/locations/'+searchString+'/'+Auth.getCurrentUser()._id).success(function(locations) {
				$scope.locations = locations;
			});
		};

		$scope.addMe = function(location) {
			if(!location.userGoing) {
				location.userGoing = true;
				location.going++;
			}
		};

		$scope.removeMe = function(location) {
			if(location.userGoing) {
				location.userGoing = false;
				location.going--;
			}
		};

		$scope.$on('$destroy', function () {
		});
	});
