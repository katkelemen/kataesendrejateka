'use strict';

class Room {

  constructor(id, description, damage ) {
    this.id = id;
    this.description = description;
    this.playerIn = false;
    this.damage = damage || 0;
  }
  setNeighbour(direction, neighbourRoom) {

    let opposites = {
      north: 'south',
      south: 'north',
      west: 'east',
      east: 'west'
    };

    this[direction] = neighbourRoom;
    neighbourRoom[opposites[direction]] = this;

  };
  directions() {
    let directions = [];
    ['north', 'south', 'east', 'west'].forEach(
      (direction) => {
        if (this[direction]) {
          directions.push(direction);

        }
      }
    )
    return directions;
  };


}

class Player {
  constructor(name, currentRoom, hp){
    this.name = name;
    this.currentRoom = currentRoom;
    this.hp = hp;
    this.currentRoom.playerIn = true;
    this.inventory = [];
  };
  move(direction) {
    this.previousRoom = this.currentRoom;
    this.currentRoom = this.currentRoom[direction];
    this.currentRoom.playerIn = true;
    this.previousRoom.playerIn = false;
    this.hp -= this.currentRoom.damage;
  };
  pickUpItem(item) {
    this.inventory.push(item.name);
  };
  dropItem(item) {
    var index = this.inventory.indexOf(item.name);
    if (index > -1) {
    this.inventory.splice(index, 1);
    }
  };
  useItem(item) {
    this.hp += item.healValue;
  }
};

class Item {
  constructor(name, healValue) {
    this.name = name;
    this.healValue = healValue || 0;
  };
};

var csvRoomConverter = (room) =>
  (room == "") ? 0 : parseInt(room);

var csvToArray = (csv) =>
  csv.split("\n")
  .map((row) => row.split(",").map(csvRoomConverter));

var roomArrayToJson = (roomArray) => {
  let width = roomArray[0].length;
  let height = roomArray.length;
  let result = {};
  roomArray.forEach((row, rowIndex) => row
    .forEach((room, roomIndex) => {
      if (roomArray[rowIndex][roomIndex+1] > 0) {
        result[room] = result[room] || {}
        result[room].east = roomArray[rowIndex][roomIndex+1];
      }
      if ((rowIndex < (height - 1)) && roomArray[rowIndex+1][roomIndex] > 0) {
        result[room] = result[room] || {}
        result[room].south = roomArray[rowIndex+1][roomIndex];
      }
    }));
  return result
}
