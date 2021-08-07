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
  return db.runSql("INSERT INTO rooms (id, hotel_id, name, type, price) VALUES " +
      "(1, 1, 'Junior Suite', '1 large double bed', 50), " +
      "(2, 1, 'Family Room with Bathroom', '1 sofa bed and 1 large double bed', 60), " +
      "(3, 2, 'Double Room', '2 single beds', 85), " +
      "(4, 2, 'Standard Double or Twin Room for Single Use', '1 single bed', 46);");
};

exports.down = function(db) {
  return db.runSql("DELETE FROM rooms WHERE id IN (1, 2, 3, 4);");
};

exports._meta = {
  "version": 1
};
