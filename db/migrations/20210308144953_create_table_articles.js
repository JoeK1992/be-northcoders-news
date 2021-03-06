exports.up = function (knex) {
  return knex.schema.createTable("articles", (articlesTable) => {
    articlesTable.increments("article_id").primary().notNullable();
    articlesTable.string("title").notNullable();
    articlesTable.text("body").notNullable();
    articlesTable.string("topic").references("topics.slug");
    articlesTable.string("author");
    articlesTable.timestamp("created_at").defaultTo(knex.fn.now());
    articlesTable.integer("votes").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("articles");
};
