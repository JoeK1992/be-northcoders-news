const request = require("supertest");
const app = require("../../be-nc-news/app");
const dbConnection = require("../db/dbConnection");
process.env.NODE_ENV = "test";

beforeEach(() => dbConnection.seed.run());
afterAll(() => dbConnection.destroy());

describe("Happy paths /api", () => {
  describe("/topics", () => {
    describe("GET all topics", () => {
      test("Status:200 - returns array with key of topics that contains topic objects", () => {
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
    describe("POST a new topic", () => {
      test("Status:201 - posts a topic and returns it as a single object", () => {
        return request(app)
          .post("/api/topics")
          .send({ slug: "northcoders", description: "northcoders topic" })
          .expect(201)
          .then(({ body: { topic } }) => {
            expect(topic).toEqual({
              slug: "northcoders",
              description: "northcoders topic",
            });
          });
      });
    });
  });
  describe("/users", () => {
    describe("GET all users", () => {
      test("Status:200 - returns an array with the key of users containing user objects", () => {
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
    describe("GET a user by their username", () => {
      test("Status:200 - returns single user object", () => {
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
    describe("POST a new user", () => {
      test("Status:201 - posts a new user and returns the new user object", () => {
        return request(app)
          .post("/api/users")
          .send({
            username: "jpk17",
            avatar_url:
              "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            name: "joe",
          })
          .expect(201)
          .then(({ body: { user } }) => {
            expect(user).toEqual({
              username: "jpk17",
              avatar_url:
                "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              name: "joe",
            });
          });
      });
    });
    describe("/articles", () => {
      describe("GET articles with no query (default sort by created_at/descending) and can set order to ascending", () => {
        test("Status:200 - returns an array with a key of articles containing article objects sorted by created_at in descending order", () => {
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
        test("Status: 200 - returns an array with the key of articles containing articles objects sorted by created_at in ascending order", () => {
          return request(app)
            .get("/api/articles?order=asc")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).toBeSortedBy("created_at");
            });
        });
      });
      describe("GET articles sorted by comment-count descending or ascending", () => {
        test("Status:200 - returns an array with the key of articles containing articles objects sorted by comment_count in descending order by default", () => {
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
        test("Status:200 - returns an array of article objects with the key of articles sorted by comment_count in ascending order when specified", () => {
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
      describe("GET articles sorted by votes descending or ascending", () => {
        test("Status:200 - returns an array with the key of articles containing articles objects sorted by votes in descending order by default", () => {
          return request(app)
            .get("/api/articles?sort_by=votes")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).toBeSortedBy("votes", {
                descending: true,
              });
            });
        });
        test("Status:200 - returns an array of article objects with the key of articles sorted by votes in ascending order when specified", () => {
          return request(app)
            .get("/api/articles?sort_by=votes&order=asc")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).toBeSortedBy("votes");
            });
        });
      });
      describe("Filter articles by author or topic", () => {
        test("Status: 200 - returns an array of article objects with the key of articles by the specified author", () => {
          return request(app)
            .get("/api/articles?author=butter_bridge")
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
        test("Status: 200 - returns an array of article objects with the key of articles belonging to specified topic ", () => {
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
      describe("GET articles ordered by votes and limit them to top 3", () => {
        test("Returns top 3 articles by votes", () => {
          return request(app)
            .get("/api/articles?sort_by=votes&limit=3")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).toEqual([
                {
                  article_id: 1,
                  author: "butter_bridge",
                  comment_count: "13",
                  created_at: "2018-11-15T12:21:54.171Z",
                  title: "Living in the shadow of a great man",
                  topic: "mitch",
                  votes: 100,
                },
                {
                  article_id: 10,
                  author: "rogersop",
                  comment_count: "0",
                  created_at: "1982-11-24T12:21:54.171Z",
                  title:
                    "Seven inspirational thought leaders from Manchester UK",
                  topic: "mitch",
                  votes: 0,
                },
                {
                  article_id: 7,
                  author: "icellusedkars",
                  comment_count: "0",
                  created_at: "1994-11-21T12:21:54.171Z",
                  title: "Z",
                  topic: "mitch",
                  votes: 0,
                },
              ]);
            });
        });
      });
      describe("GET paginated articles", () => {
        test("Status: 200 - returns articles 1-4", () => {
          return request(app)
            .get("/api/articles/paginate?limit=4&page=1")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).toEqual([
                {
                  article_id: 1,
                  title: "Living in the shadow of a great man",
                  topic: "mitch",
                  author: "butter_bridge",
                  body: "I find this existence challenging",
                  created_at: expect.any(String),
                  votes: 100,
                },
                {
                  article_id: 2,
                  title: "Sony Vaio; or, The Laptop",
                  topic: "mitch",
                  author: "icellusedkars",
                  body:
                    "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
                  created_at: expect.any(String),
                  votes: 0,
                },
                {
                  article_id: 3,
                  title: "Eight pug gifs that remind me of mitch",
                  topic: "mitch",
                  author: "icellusedkars",
                  body: "some gifs",
                  created_at: expect.any(String),
                  votes: 0,
                },
                {
                  article_id: 4,
                  title: "Student SUES Mitch!",
                  topic: "mitch",
                  author: "rogersop",
                  body:
                    "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
                  created_at: expect.any(String),
                  votes: 0,
                },
              ]);
            });
        });
        test("Status: 200 - returns articles 5-8", () => {
          return request(app)
            .get("/api/articles/paginate?limit=4&page=2")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).toEqual([
                {
                  article_id: 5,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
                {
                  article_id: 6,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
                {
                  article_id: 7,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
                {
                  article_id: 8,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
              ]);
            });
        });
        test("Status: 200 - returns articles 9-12", () => {
          return request(app)
            .get("/api/articles/paginate?limit=4&page=3")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).toEqual([
                {
                  article_id: 9,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
                {
                  article_id: 10,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
                {
                  article_id: 11,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
                {
                  article_id: 12,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
              ]);
            });
        });
        test("Status: 200 - returns articles 1-6", () => {
          return request(app)
            .get("/api/articles/paginate?limit=6&page=1")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).toEqual([
                {
                  article_id: 1,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
                {
                  article_id: 2,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
                {
                  article_id: 3,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
                {
                  article_id: 4,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
                {
                  article_id: 5,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
                {
                  article_id: 6,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
              ]);
            });
        });
        test("Status: 200 - returns articles 7-12", () => {
          return request(app)
            .get("/api/articles/paginate?limit=6&page=2")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).toEqual([
                {
                  article_id: 7,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
                {
                  article_id: 8,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
                {
                  article_id: 9,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
                {
                  article_id: 10,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
                {
                  article_id: 11,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
                {
                  article_id: 12,
                  title: expect.any(String),
                  topic: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                },
              ]);
            });
        });
      });
    });
    describe("GET article by article_id", () => {
      test("Status:200 - returns correct article object", () => {
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
    describe("POST a new article", () => {
      test("Status: 201 - posts a new article and returns correct article object", () => {
        return request(app)
          .post("/api/articles")
          .send({
            title: "New article",
            body: "This is a new article",
            topic: "mitch",
            author: "jessjelly",
          })
          .expect(201)
          .then(({ body: { article } }) => {
            expect(article).toEqual({
              article_id: expect.any(Number),
              title: "New article",
              body: "This is a new article",
              topic: "mitch",
              author: "jessjelly",
              created_at: expect.any(String),
              votes: 0,
            });
          });
      });
    });
    describe("PATCH article votes", () => {
      test("Status: 200 - updates an article's votes and returns the new article object", () => {
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
      describe("DELETE an article", () => {
        test("Status: 204 - deletes an article and returns 404 when trying to get that article", () => {
          return request(app)
            .delete("/api/articles/3")
            .expect(204)
            .then(() => {
              return request(app).get("/api/articles/3").then(expect(404));
            });
        });
      });
      describe("/comments", () => {
        describe("GET comments by article ID", () => {
          test("Status: 200 - returns an array with the key of comments containing comments for a specific article", () => {
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
        describe("GET sorted comments by article ID", () => {
          test("Status: 200 - returns comments sorted by created_at descending (default)", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).toBeSortedBy("created_at", {
                  descending: true,
                });
              });
          });
          test("Status: 200 - returns comments sorted by created_at ascending when specified", () => {
            return request(app)
              .get("/api/articles/1/comments?order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).toBeSortedBy("created_at");
              });
          });
          test("Status: 200 - returns comments by votes descending (default)", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=votes")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).toBeSortedBy("votes", {
                  descending: true,
                });
              });
          });
          test("Status: 200 - returns comments by votes ascending when specified ", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=votes&order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).toBeSortedBy("votes");
              });
          });
        });
        describe("PATCH a comment", () => {
          test("Status: 200 - changes a comment's votes and returns the modified comment", () => {
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
      });
      describe("POST a comment", () => {
        test("Status: 201 - posts a comment and returns the correct comment", () => {
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
      describe("DELETE a comment", () => {
        test("Status: 204 - deletes comment and responds with 404 when getting that comment", () => {
          return request(app)
            .delete("/api/comments/1")
            .expect(204)
            .then(() => {
              return request(app).get("/api/comments/1").then(expect(404));
            });
        });
      });
    });
  });
});

describe("Errors", () => {
  describe("/articles", () => {
    describe("400 errors", () => {
      test("GET article invalid article ID", () => {
        return request(app)
          .get("/api/articles/pidgeon")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad request");
          });
      });
      test("DELETE article nvalid article ID", () => {
        return request(app)
          .delete("/api/articles/table")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad request");
          });
      });
      test("PATCH article invalid article ID", () => {
        return request(app)
          .delete("/api/articles/hello")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad request");
          });
      });
    });
    describe("404 errors", () => {
      test("GET article ID does not exist", () => {
        return request(app)
          .get("/api/articles/106")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Article not found");
          });
      });
      test("DELETE article ID does not exist", () => {
        return request(app)
          .delete("/api/articles/1000")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Article not found");
          });
      });
      test("PATCH article ID does not exist", () => {
        return request(app)
          .patch("/api/articles/70")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Article not found");
          });
      });
      test("GET paginated articles page does not exist", () => {
        return request(app)
          .get("/api/articles/paginate?limit=6&page=3")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Page not found");
          });
      });
    });
    describe("405 errors", () => {
      test("Cannot PATCH paginated articles", () => {
        return request(app)
          .patch("/api/articles/paginate")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Method not allowed");
          });
      });
      test("Cannot PUT by article ID ", () => {
        return request(app)
          .put("/api/articles/1")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Method not allowed");
          });
      });
      test("Cannot DELETE all articles", () => {
        return request(app)
          .delete("/api/articles")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe("Method not allowed");
          });
      });
    });
    describe("/comments", () => {
      describe("400 errors", () => {
        test("GET comments by article_id, invalid article_id", () => {
          return request(app)
            .get("/api/articles/table/comments")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("Bad request");
            });
        });
        test("PATCH comment, invalid comment_id", () => {
          return request(app)
            .patch("/api/comments/pidgeon")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("Bad request");
            });
        });
        test("DELETE comment, invalid comment_id", () => {
          return request(app)
            .delete("/api/comments/hello")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe("Bad request");
            });
        });
      });
      describe("404 errors", () => {
        test("PATCH comment, comment does not exist", () => {
          return request(app)
            .patch("/api/comments/100")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe("Comment does not exist");
            });
        });
        test("DELETE comment, comment does not exist", () => {
          return request(app)
            .delete("/api/comments/1000")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe("Comment does not exist");
            });
        });
      });
      describe("405 errors", () => {
        test("Cannot GET single comment", () => {
          return request(app)
            .get("/api/comments/10")
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).toBe("Method not allowed");
            });
        });
      });
    });
    describe("/topics", () => {
      describe("405 errors", () => {
        test("Cannot DELETE topics", () => {
          return request(app)
            .delete("/api/topics")
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).toBe("Method not allowed");
            });
        });
      });
    });
    describe("/users", () => {
      describe("404 errors", () => {
        test("GET user, user does not exist", () => {
          return request(app)
            .get("/api/users/dave")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe("User not found");
            });
        });
        describe("405 errors", () => {
          test("Cannot DELETE user", () => {
            return request(app)
              .delete("/api/users/dave")
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).toBe("Method not allowed");
              });
          });
        });
      });
    });
  });
});
