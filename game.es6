'use strict';

class Room {

  constructor(id, description, damage = 0) {
    this.id = id;
    this.description = description;
    this.playerIn = false;
    this.damage = damage;
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
  }
  move(direction) {
    this.previousRoom = this.currentRoom;
    this.currentRoom = this.currentRoom[direction];
    this.currentRoom.playerIn = true;
    this.previousRoom.playerIn = false;
    this.hp -= this.currentRoom.damage;
  }

}
