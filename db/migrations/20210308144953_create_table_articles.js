exports.up = function (knex) {
  console.log("Creating articles table");
  return knex.schema.createTable("articles", (articlesTable) => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title").notNullable();
    articlesTable.text("body").notNullable();
    articlesTable.string("topic").references("topics.slug");
    articlesTable.string("author").references("users.username");
    articlesTable.timestamp("created_at");
    articlesTable.integer("votes").defaultTo(0);
  });
};

exports.down = function (knex) {
  console.log("Removed articles table");
  return knex.schema.dropTable("articles");
};
