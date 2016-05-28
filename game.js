var room1 = {
  description: 'room 1',
};

var room2 = {
  description: 'room 2',
};

room1['north'] = room2;
room2['south'] = room1;

var player = {
  position: room1,
  move: function(direction) {
    this.position = this.position[direction];
  }
};
