const comments = require("../data/test-data/comments");
const users = require("../data/test-data/users");
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

describe("createReferenceObj", () => {
  it("returns an empty object, when passed an empty array", () => {
    const input = [];
    const actual = createReferenceObj(input);
    const expected = {};
    expect(actual).toEqual(expected);
  });
  it("returns a reference object when one comment object and one users object are passed", () => {
    const comment = [
      {
        body: "I hate streaming noses",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1385210163389,
      },
    ];
    const user = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
        user_id: 4,
      },
    ];
    expect(createReferenceObj(comment, user, "belongs_to", "user_id")).toEqual({
      "Living in the shadow of a great man": 4,
    });
  });
  it("returns a reference object when multiple comment and user objects are passed", () => {
    const comments = [
      {
        body: "I hate streaming noses",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1385210163389,
      },
      {
        body:
          "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.",
        belongs_to: "UNCOVERED: catspiracy to bring down democracy",
        created_by: "icellusedkars",
        votes: 16,
        created_at: 1101386163389,
      },
    ];
    const articles = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
        user_id: 4,
      },
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171,
        user_id: 6,
      },
    ];
    expect(
      createReferenceObj(comments, articles, "belongs_to", "user_id")
    ).toEqual({
      "Living in the shadow of a great man": 4,
      "UNCOVERED: catspiracy to bring down democracy": 6,
    });
  });
  it("Does not mutate original data", () => {
    const comment = [
      {
        body: "I hate streaming noses",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1385210163389,
      },
    ];
    const user = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
        user_id: 4,
      },
    ];
    createReferenceObj(comment, user, "belongs_to", "user_id");
    expect(comment).toEqual([
      {
        body: "I hate streaming noses",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1385210163389,
      },
    ]);
    expect(user).toEqual([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
        user_id: 4,
      },
    ]);
  });
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
    const referenceObject = { "They're not exactly dogs, are they?": 6 };
    const actual = formatComments(input, referenceObj);

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
