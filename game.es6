'use strict';

class Room {

  constructor(id, description) {
    this.id = id;
    this.description = description;
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

  }
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
  constructor(name, currentRoom){
    this.name = name;
    this.currentRoom = currentRoom;
  }
  move(direction) {
    this.currentRoom = this.currentRoom[direction];
  }
}
