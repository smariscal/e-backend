/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('messages', table => {
    table.increments('messageid').primary().notNullable();
    table.string('messageemail', 100).notNullable();
    table.string('messagecontent', 255).notNullable();
    table.dateTime('messagedate').notNullable();
    table.string('messagesocketid', 45).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('messages');
};
