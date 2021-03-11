exports.up = function (knex) {
  return knex.schema.createTable("comments", (commentsTable) => {
    commentsTable.increments("comment_id").primary();
    commentsTable.string("author").references("users.username");
    commentsTable.integer("article_id").references("articles.article_id");
    commentsTable.integer("votes").defaultsTo(0);
    commentsTable.timestamp("created_at");
    commentsTable.text("body");
  });
};

exports.down = function (knex) {
  // console.log("Removed comments table");
  return knex.schema.dropTable("comments");
};
