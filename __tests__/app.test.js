const request = require("supertest");
const app = require("../../be-nc-news/app");
const dbConnection = require("../db/dbConnection");
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
    describe("Get Articles", () => {
      describe("Get articles with no query (default created_at/desc) and set to order asc", () => {
        test("Status:200 and returns all articles sorted by created at desc", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(Array.isArray(articles)).toBe(true);
              expect(articles.length).toEqual(12);
              expect(articles).toBeSortedBy("created_at", { descending: true });
              articles.forEach((users) => {
                expect(users).toMatchObject({
                  title: expect.any(String),
                  article_id: expect.any(Number),
                  topic: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                });
              });
            });
        });
        test("Status: 200 and returns all articles sorted_by created_at asc", () => {
          return request(app)
            .get("/api/articles?order=asc")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).toBeSortedBy("created_at");
            });
        });
      });
      describe("Get articles sorted by comment-count asc/desc", () => {
        test("Status:200 and returns articles sorted by comment_count, desc default, asc if specified", () => {
          return request(app)
            .get("/api/articles?sort_by=comment_count")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).toBeSortedBy("comment_count", {
                descending: true,
                coerce: true,
              });
            });
        });
        test("Status:200 and returns articles sorted by comment_count, desc default, asc if specified", () => {
          return request(app)
            .get("/api/articles?sort_by=comment_count&order=asc")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).toBeSortedBy("comment_count", {
                coerce: true,
              });
            });
        });
      });
      describe("Filter articles by author or topic", () => {
        test("Returns articles by author specified", () => {
          return request(app)
            .get("/api/articles/?author=butter_bridge")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(Array.isArray(articles)).toBe(true);
              articles.forEach((article) => {
                expect(article).toMatchObject({
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: "butter_bridge",
                  votes: expect.any(Number),
                  created_at: expect.any(String),
                });
              });
            });
        });
        test("Returns articles with topic specified", () => {
          return request(app)
            .get("/api/articles?topic=cats")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(Array.isArray(articles)).toBe(true);
              articles.forEach((article) => {
                expect(article).toMatchObject({
                  title: expect.any(String),
                  topic: "cats",
                  author: expect.any(String),
                  votes: expect.any(Number),
                  created_at: expect.any(String),
                });
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
            expect(user).toEqual({
              username: "lurker",
              name: "do_nothing",
              avatar_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            });
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
              expect(article).toEqual({
                article_id: 2,
                title: "Sony Vaio; or, The Laptop",
                body:
                  "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
                votes: 0,
                topic: "mitch",
                author: "icellusedkars",
                created_at: expect.any(String),
              });
            });
        });
      });
    });
    describe("Patch", () => {
      test("Updates article votes by article ID", () => {
        return request(app)
          .patch("/api/articles/2")
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article).toEqual({
              article_id: 2,
              title: "Sony Vaio; or, The Laptop",
              body:
                "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
              votes: 1,
              topic: "mitch",
              author: "icellusedkars",
              created_at: expect.any(String),
            });
          });
      });
      test("Update comment votes by comment ID", () => {
        return request(app)
          .patch("/api/comments/13")
          .send({ inc_votes: -1 })
          .expect(200)
          .then(({ body: { comment } }) => {
            expect(comment).toEqual({
              comment_id: 13,
              author: "icellusedkars",
              article_id: 1,
              votes: -1,
              created_at: expect.any(String),
              body: "Fruit pastilles",
            });
          });
      });
    });
    describe("Post comment", () => {
      test("Can post and retrieve comment", () => {
        return request(app)
          .post("/api/articles/4/comments")
          .send({ author: "jessjelly", body: "Great article!" })
          .expect(201)
          .then(({ body: { comment } }) => {
            expect(comment).toEqual({
              comment_id: expect.any(Number),
              author: "jessjelly",
              article_id: 4,
              votes: 0,
              created_at: expect.any(String),
              body: "Great article!",
            });
          });
      });
    });
    describe("Delete", () => {
      test("Delete article by article_id", () => {
        return request(app)
          .delete("/api/articles/3")
          .expect(204)
          .then(() => {
            return request(app).get("/api/articles/3").then(expect(404));
          });
      });
    });
    describe("Get", () => {
      test("Gets comments by article ID", () => {
        return request(app)
          .get("/api/articles/9/comments")
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).toEqual([
              {
                article_id: 9,
                comment_id: 1,
                votes: 16,
                created_at: expect.any(String),
                author: "butter_bridge",
                body:
                  "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
              },
              {
                article_id: 9,
                comment_id: 17,
                votes: 20,
                created_at: expect.any(String),
                author: "icellusedkars",
                body: "The owls are not what they seem.",
              },
            ]);
          });
      });
    });
  });
});

describe("Sort", () => {
  describe("Sorts comments by column", () => {
    test("Sort by created_at descending) default", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
    test("Sort by votes descending", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toBeSortedBy("votes", { descending: true });
        });
    });
  });
});

describe("Errors", () => {
  describe("400 errors", () => {
    test("Invalid article ID", () => {
      return request(app)
        .get("/api/articles/pidgeon")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
  });
  describe("404 errors", () => {
    test("Article ID does not exist", () => {
      return request(app)
        .get("/api/articles/106")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article not found");
        });
    });
    test("Username does not exist", () => {
      return request(app)
        .get("/api/users/Bob")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("User not found");
        });
    });
  });
  describe("405 errors", () => {
    test("Not allowed to add user", () => {
      return request(app)
        .put("/api/users/steve")
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Method not allowed");
        });
    });
    test("Not allowed to delete user", () => {
      return request(app)
        .delete("/api/users/lurker")
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Method not allowed");
        });
    });
    test("Not allowed to post article", () => {
      return request(app)
        .put("/api/articles/20")
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Method not allowed");
        });
    });
    test("Not allowed to delete topics", () => {
      return request(app)
        .delete("/api/topics")
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Method not allowed");
        });
    });
  });
});
