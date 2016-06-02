var app = angular.module('RoomGame', []);

app.controller('RoomController', ($scope, RoomLoader) => {

  $scope.room1 = new Room('1', 'doge room');
  $scope.room2 = new Room('2', 'cate room');
  $scope.room3 = new Room('3', 'birde room');
  $scope.room4 = new Room('4', 'buge room');
  $scope.room5 = new Room('5', 'fishe room');
  $scope.room6 = new Room('6', 'slothe room');

  $scope.room1.setNeighbour('east', $scope.room2);
  $scope.room2.setNeighbour('east', $scope.room3);
  $scope.room3.setNeighbour('south', $scope.room4);
  $scope.room4.setNeighbour('west', $scope.room5);
  $scope.room5.setNeighbour('west', $scope.room6);
  $scope.room1.setNeighbour('south', $scope.room6);
  $scope.room2.setNeighbour('south', $scope.room5);

  $scope.player = new Player('Kat', $scope.room1);

  $scope.invalidDirection = (direction) => {
    return $scope.player.currentRoom.directions().indexOf(direction) == -1;
  }

  RoomLoader.getRooms();
})

app.factory('RoomLoader', ($http) => {
  return {
    getRooms: () => {
      $http.get('rooms.csv').then((data)=> {
        console.log(data)
      })
    }
  }
});
