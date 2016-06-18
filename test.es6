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

  it("player has hp", () => {

    var r1 = new Room('1', 'room 1');
    var player = new Player('Adam', r1, 20);
    expect(player.hp).toBeDefined();

  });

  it("player in room", () => {

    var r1 = new Room('1', 'room 1', true);
    var r2 = new Room('2', 'room 2');

    r1.setNeighbour('north', r2);
    var player = new Player('Adam', r1);

    player.move('north');

    expect(r1.playerIn).toBe(false);
    expect(r2.playerIn).toBe(true);

  });

  it("player loses hp in flameroom", () => {

    var r1 = new Room('1', 'room 1');
    var flameroom = new Room('2', 'flameroom', 4);

    r1.setNeighbour('north', flameroom);
    var player = new Player('Adam', r1, 20);

    player.move('north');

    expect(player.hp).toBe(16);

  });

  it("player has inventory", () => {

    var r1 = new Room('1', 'room 1');
    var player = new Player('Adam', r1, 20);

    expect(player.inventory).toEqual([]);

  });

  it("player can put items into the inventory", () => {

    var r1 = new Room('1', 'room 1');
    var player = new Player('Adam', r1, 20);

    var cheese = new Item('cheese');
    var onion = new Item('onion');
    var salt = new Item('salt');

    player.pickUpItem(cheese);
    player.pickUpItem(salt);
    player.pickUpItem(onion);

    expect(player.inventory).toEqual(['cheese', 'salt', 'onion']);

  });

  it("player can drop items from the inventory", () => {

    var r1 = new Room('1', 'room 1');
    var player = new Player('Adam', r1, 20);

    var cheese = new Item('cheese');
    var onion = new Item('onion');
    var salt = new Item('salt');

    player.pickUpItem(cheese);
    player.pickUpItem(salt);
    player.pickUpItem(onion);
    player.dropItem(salt);

    expect(player.inventory).toEqual(['cheese', 'onion']);

  });

  it("player heals when drinking healing potion", () => {

    var r1 = new Room('1', 'room 1');
    var player = new Player('Adam', r1, 16);
    var healingPotion = new Item('healing potion', 2);

    player.pickUpItem(healingPotion);
    player.useItem(healingPotion);

    expect(player.hp).toBe(18);

  });

});

describe("csv to array", () => {

  it("simple empty grid", () => {
    let csv = ",\n,";
    let result = [[0,0],[0,0]];
    expect(csvToArray(csv)).toEqual(result);
  });

  it("simple grid", () => {
    let csv = "1,\n,";
    let result = [[1,0],[0,0]];
    expect(csvToArray(csv)).toEqual(result);
  });

  it("less simple grid", () => {
    let csv = "1,2,3\n4,5,";
    let result = [[1,2,3],[4,5,0]];
    expect(csvToArray(csv)).toEqual(result);
  });


});
