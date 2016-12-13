
exports.up = function(knex, Promise) {
  return knex.schema.createTable('packers', table => {
    table.increments();
    table.string('name').notNullable();
    table.text('comment');
    table.dateTime('date');
    table.string('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('packers');
};
