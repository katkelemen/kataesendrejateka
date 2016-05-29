'use strict';

describe("A suite", () => {
  it("contains spec with an expectation", () => {
    let fn = (x) => x + 2;
    expect(fn(2)).toBe(4);
  });
});

describe("room", () => {

  it("room is ok", () => {

    var r1 = new Room('1', 'First room')
    expect(r1).toBeDefined();

  });

  it("set neighbour rooms", () => {

    var r1 = new Room('1', 'room 1');
    var r2 = new Room('2', 'room 2');

    r1.setNeighbour('north', r2);

    expect(r1.north).toBe(r2);
    expect(r2.south).toBe(r1);

  });

  it("player is ok", () => {

    var r1 = new Room('1', 'room 1');
    var player = new Player('Adam', r1);
    expect(player).toBeDefined();
    expect(player.currentRoom).toBeDefined();

  });

  it("player can move", () => {

    var r1 = new Room('1', 'room 1');
    var r2 = new Room('2', 'room 2');

    r1.setNeighbour('north', r2);
    var player = new Player('Adam', r1);

    player.move('north');

    expect(player.currentRoom).toBe(r2);

  });

  it('room can return list of possible directions', () => {
    var r1 = new Room('1', 'room 1');
    var r2 = new Room('2', 'room 2');
    var r3 = new Room('3', 'room 3');
    r1.setNeighbour('north', r2);
    r2.setNeighbour('east', r3);
    expect(r1.directions()).toEqual(['north']);
    expect(r2.directions()).toEqual(['south', 'east']);

  });



});
