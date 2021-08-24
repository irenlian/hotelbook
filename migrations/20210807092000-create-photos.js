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
  return db.createTable('photos', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true },
    hotel_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'hotel_photo_id',
        table: 'hotels',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
    name: 'string',
    main: 'boolean',
  });
};

exports.down = function(db) {
  return db.dropTable('photos');
};

exports._meta = {
  "version": 1
};
