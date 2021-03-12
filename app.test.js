const request = require("supertest");
const app = require("./app");
const dbConnection = require("./dbConnection");
process.env.NODE_ENV = "test";

beforeEach(() => dbConnection.seed.run());
afterAll(() => dbConnection.destroy());

describe("/api", () => {
  describe("/topics", () => {
    describe("GET all", () => {
      test("status:200 - returns array with key of topics that contains topic objects", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body: { topics } }) => {
            expect(Array.isArray(topics)).toBe(true);
            expect(topics.length).toBe(3);
            topics.forEach((topic) => {
              expect(topic).toMatchObject({
                description: expect.any(String),
                slug: expect.any(String),
              });
            });
          });
      });
    });
  });
  describe("Users", () => {
    describe("Get users", () => {
      test("status:200 and returns user object", () => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then(({ body: { users } }) => {
            expect(Array.isArray(users)).toBe(true);
            expect(users.length).toBe(4);
            users.forEach((users) => {
              expect(users).toMatchObject({
                username: expect.any(String),
                name: expect.any(String),
                name: expect.any(String),
              });
            });
          });
      });
    });
    describe("Get user by username", () => {
      test("status:200 and returns correct user object", () => {
        return request(app)
          .get("/api/users/lurker")
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).toEqual([
              {
                username: "lurker",
                name: "do_nothing",
                avatar_url:
                  "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
              },
            ]);
          });
      });
    });
    describe("Articles", () => {
      describe("Get article by article_id", () => {
        test("status:200 and returns correct article object", () => {
          return request(app)
            .get("/api/articles/2")
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article).toEqual([
                {
                  article_id: 2,
                  title: "Sony Vaio; or, The Laptop",
                  body:
                    "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
                  votes: 0,
                  topic: "mitch",
                  author: "icellusedkars",
                  created_at: expect.any(String),
                },
              ]);
            });
        });
      });
    });
  });
  describe("Errors", () => {
    describe("400 errors", () => {
      return request(app)
        .get("api/articles/pidgeon")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid article ID");
        });
    });
  });
});
