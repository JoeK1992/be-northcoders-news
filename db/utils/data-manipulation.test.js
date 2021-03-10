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
      created_at: expect.any(Date),
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
    const articles = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        body: "I find this existence challenging",
        topic: "mitch",
        author: "butter_bridge",
        created_at: new Date(),
        votes: 100,
      },
    ];
    const actual = createReferenceObj(articles, "title", "article_id");
    expect(actual).toEqual({
      "Living in the shadow of a great man": 1,
    });
  });
  it("returns a reference object when multiple comment and user objects are passed", () => {
    const articles = [
      {
        article_id: 3,
        title: "Eight pug gifs that remind me of mitch",
        body: "some gifs",
        topic: "mitch",
        author: "icellusedkars",
        created_at: new Date(),
        votes: 0,
      },
      {
        article_id: 4,
        title: "Student SUES Mitch!",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        topic: "mitch",
        author: "rogersop",
        created_at: new Date(),
        votes: 0,
      },
      {
        article_id: 5,
        title: "UNCOVERED: catspiracy to bring down democracy",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        topic: "cats",
        author: "rogersop",
        created_at: new Date(),
        votes: 0,
      },
    ];
    const actual = createReferenceObj(articles, "title", "article_id");
    expect(actual).toEqual({
      "Eight pug gifs that remind me of mitch": 3,
      "Student SUES Mitch!": 4,
      "UNCOVERED: catspiracy to bring down democracy": 5,
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
  it.only("Returns correct data types for a single input", () => {
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
    const referenceObj = { "They're not exactly dogs, are they?": 9 };
    const actual = formatComments(input, referenceObj);

    expect(Array.isArray(actual)).toBe(true);
    expect(actual[0]).toEqual({
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      article_id: 9,
      author: "butter_bridge",
      votes: 16,
      created_at: expect.any(Date),
    });
  });
  it("Returns correct data types for a multiple inputs", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 100,
        created_at: 1448282163389,
      },
    ];
    const referenceObj = {
      "They're not exactly dogs, are they?": 6,
      "Living in the shadow of a great man": 4,
    };
    const actual = formatComments(input, referenceObj);

    expect(Array.isArray(actual)).toBe(true);
    expect(actual[1]).toMatchObject({
      body: expect.any(String),
      votes: expect.any(Number),
      created_at: expect.any(Object),
      author: expect.any(String),
      article_id: expect.any(Number),
    });
  });
  it("Does not mutate the input array", () => {
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
    const referenceObj = { "They're not exactly dogs, are they?": 6 };
    const output = formatComments(input, referenceObj);
    expect(output).not.toBe(input);
    expect(input).toEqual([
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
    ]);
  });
  it("Does not mutate objects in input array", () => {
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
    const referenceObj = { "They're not exactly dogs, are they?": 6 };
    const output = formatComments(input, referenceObj);
    expect(output[0]).not.toBe(input[0]);
    expect(input[0]).toEqual({
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: "butter_bridge",
      votes: 16,
      created_at: 1511354163389,
    });
  });
  it("Does not mutate reference object", () => {
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
    const referenceObj = { "They're not exactly dogs, are they?": 6 };
    formatComments(input, referenceObj);
    expect(referenceObj).toEqual({ "They're not exactly dogs, are they?": 6 });
  });
});

// multiple inputs
// mutates array
// mutates objects
// mutates refobj
