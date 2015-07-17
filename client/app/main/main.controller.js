'use strict';

angular.module('localNightlifeApp')
	.controller('MainCtrl', function ($scope, $http, Auth) {
		$scope.searchString = '';
		$scope.locations = [];

		$scope.working = false;

		$scope.startSearching = function (searchString) {
			if(searchString === '')
				return;

			$scope.locations = [];
			$scope.working = true;

			$http.get('/api/locations/'+searchString+'/'+Auth.getCurrentUser()._id).success(function(locations) {
				$scope.locations = locations;
				$scope.working = false;
			}).error(function() {
				$scope.working = false;
			});
		};

		$scope.addMe = function(location) {
			if(!location.userGoing && Auth.isLoggedIn()) {
				$scope.working = true;

				$http.post('/api/locations/'+location.id+'/'+Auth.getCurrentUser()._id).success(function() {
					location.userGoing = true;
					location.going++;

					$scope.working = false;
				}).error(function() {
					$scope.working = false;
				});
			}

			// TODO: Remeber user to log in if he's not
		};

		$scope.removeMe = function(location) {
			if(location.userGoing && Auth.isLoggedIn()) {
				$scope.working = true;

				$http.delete('/api/locations/'+location.id+'/'+Auth.getCurrentUser()._id).success(function() {
					location.userGoing = false;
					location.going--;

					$scope.working = false;
				}).error(function() {
					$scope.working = false;
				});
			}

			// TODO: Remeber user to log in if he's not
		};

		$scope.$on('$destroy', function () {
		});
	});
