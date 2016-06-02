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
  constructor(name, healValue = 0) {
    this.name = name;
    this.healValue = healValue;
  };
};
