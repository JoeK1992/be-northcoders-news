exports.up = function (knex) {
  return knex.schema.createTable("users", (usersTable) => {
    usersTable.string("username").primary().notNullable();
    usersTable.string("avatar_url").notNullable();
    usersTable.string("name").notNullable();
  });
};

exports.down = function (knex) {
  // console.log("Removed users table");
  return knex.schema.dropTable("users");
};
