exports.up = function (knex) {
  console.log("Created users table");
  return knex.schema.createTable("Users", (usersTable) => {
    usersTable.string("Username").primary();
    usersTable.string("Avatar_url").notNullable();
    usersTable.string("Name").notNullable();
  });
};

exports.down = function (knex) {
  console.log("Removed users table");
  return knex.schema.dropTable("Users");
};
