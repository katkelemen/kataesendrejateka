describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

describe("room", function() {

  it("has a neighbour room", function() {

    player.move('north');

    expect(player.position).toBe(room2);
  });
});
