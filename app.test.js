const request = require("supertest");
const app = require("./app");
const dbConnection = require("./dbConnection");
process.env.NODE_ENV = "test";

beforeEach(() => dbConnection.seed.run());
afterAll(() => dbConnection.destroy());

describe("/api", () => {
  describe("/topics", () => {
    describe("GET", () => {
      it("status:200 - returns array with key of topics that contains topic objects", () => {
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
    describe("Get user by username", () => {
      it("status:200 and returns user object", () => {
        return request(app)
          .get("api/users/lurker")
          .expect(200)
          .then(({ body }) => {
            expect({ body }).toEqual({
              username: "lurker",
              name: "do_nothing",
              avatar_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            });
          });
      });
    });
  });
});
