const {
  formatArticles,
  formatComments,
  createReferenceObj,
} = require("./data-manipulation");

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
      created_at: expect.any(Object),
      votes: expect.any(Number),
    });
  });
  it("returns correct data types and output for multiple inputs", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171,
        votes: 98,
      },
    ];

    const actual = formatArticles(input);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual[1]).toMatchObject({
      title: expect.any(String),
      topic: expect.any(String),
      author: expect.any(String),
      body: expect.any(String),
      created_at: expect.any(Object),
      votes: expect.any(Number),
    });
  });
  describe("Mutations", () => {
    it("Does not mutate input array", () => {
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

      expect(actual).not.toBe(input);
    });
    it("Does not mutate input objects", () => {
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
      expect(actual[0]).not.toBe(input[0]);
    });
  });
});

describe.only("createReferenceObj", () => {
  it("returns an empty object, when passed an empty array", () => {
    const input = [];
    const actual = createReferenceObj(input);
    const expected = {};
    expect(actual).toEqual(expected);
  });
  it("returns a reference object when one");
});

describe("formatComments", () => {
  it("Returns an empty array when passed an empty array", () => {
    expect(formatComments([])).toEqual([]);
  });
  it("Returns correct data types for a single input", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
    ];
    const actual = formatComments(input);

    expect(Array.isArray(actual)).toBe(true);
    expect(actual[0]).toMatchObject({
      body: expect.any(String),
      votes: expect.any(Number),
      created_at: expect.any(Object),
      author: expect.any(String),
      article_id: expect.any(Number),
    });
  });
});
