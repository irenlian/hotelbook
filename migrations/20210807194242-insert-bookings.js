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
  return db.runSql("INSERT INTO bookings (user_id, room_id, check_in, check_out) VALUES " +
      "(1, 1, '2020-04-20', '2020-04-25'), " +
      "(1, 3, '2020-05-10', '2020-06-15'), " +
      "(2, 2, '2021-01-21', '2020-01-23'), " +
      "(2, 2, '2021-03-04', '2021-03-09');");
};

exports.down = function(db) {
  return db.runSql("DELETE FROM bookings WHERE id IN (1, 2, 3, 4);");
};

exports._meta = {
  "version": 1
};
