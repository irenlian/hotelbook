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
  return db.runSql("INSERT INTO hotels (id, name, country, city) VALUES " +
      "(1, 'Malyatko', 'Ukraine', 'Kyiv'), " +
      "(2, 'Valentino', 'Spain', 'Valencia');");
};

exports.down = function(db) {
  return db.runSql("DELETE FROM hotels WHERE id IN (1, 2);");
};

exports._meta = {
  "version": 1
};