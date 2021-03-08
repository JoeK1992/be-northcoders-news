const { formatArticles } = require("./data-manipulation");

describe("formatArticles", () => {
  it("returns an empty array when passed an empty array", () => {
    expect(formatArticles([])).toEqual([]);
  });
  it("returns correct data types and output for a single input", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];

    const actual = formatArticles(input);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual[0]).toMatchObject({
      title: expect.any(String),
      topic: expect.any(String),
      author: expect.any(String),
      body: expect.any(String),
      created_at: expect.any(String),
      votes: expect.any(Number),
    });
  });
});

// input array output array
// returns empty if passed empty
// for one input
//  check colum formats
//  check output
// for multiple inputs
//  check output
// does not mutate array
// does not mutate objects within array
