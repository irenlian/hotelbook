'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('bookings', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true },
    user_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'user_booking_id',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
    room_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'room_booking_id',
        table: 'rooms',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
    check_in: 'date',
    check_out: 'date',
  });
};

exports.down = function(db) {
  return db.dropTable('bookings');
};

exports._meta = {
  "version": 4
};
