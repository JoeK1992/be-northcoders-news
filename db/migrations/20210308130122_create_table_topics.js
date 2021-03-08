exports.up = function (knex) {
  console.log("Created topics table");
  return knex.schema.createTable("topics", (topicsTable) => {
    topicsTable.string("slug").primary();
    topicsTable.string("description").notNullable();
  });
};

exports.down = function (knex) {
  console.log("Removed topics table");
  return knex.schema.dropTable("topics");
};
