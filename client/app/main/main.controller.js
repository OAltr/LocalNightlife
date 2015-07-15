'use strict';

angular.module('localNightlifeApp')
	.controller('MainCtrl', function ($scope, $http, socket) {
		$scope.searchString = '';
		$scope.locations = [];

		$scope.startSearching = function (searchString) {
			if(searchString === '')
				return;

			$scope.locations = [{
				name: 'Bar One',
				going: 3,
				userGoing: false
			}, {
				name: 'Bar Two',
				going: 4,
				userGoing: true
			}, {
				name: 'Bar Three',
				going: 5,
				userGoing: false
			}];
		};

		$scope.addMe = function(location) {
			if(!location.userGoing) {
				location.userGoing = true;
				location.going++;
			}
		};

		$scope.$on('$destroy', function () {
		});
	});
