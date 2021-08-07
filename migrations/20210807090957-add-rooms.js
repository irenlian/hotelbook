'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  console.log('Creating rooms');

  return db.createTable('rooms', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true },
    hotel_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'hotel_room_id',
        table: 'hotels',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
    name: 'string',
    type: 'string',
    price: 'decimal',
  });
};

exports.down = function (db) {
  console.log('Removing rooms');

  return db.dropTable('rooms');
};

exports._meta = {
  version: 3,
};
