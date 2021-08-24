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
  return db.runSql("INSERT INTO rooms (hotel_id, name, type, price) VALUES " +
      "(1, 'Junior Suite', '1 large double bed', 50), " +
      "(1, 'Family Room with Bathroom', '1 sofa bed and 1 large double bed', 60), " +
      "(2, 'Double Room', '2 single beds', 85), " +
      "(2, 'Standard Double or Twin Room for Single Use', '1 single bed', 46), " +
      "(3, 'Standard Room 1 Queen Bed', '1 double bed', 55), " +
      "(4, 'Queen Room', '1 double bed', 84), " +
      "(5, 'Standard Double Room', '1 large double bed', 68), " +
      "(5, 'Standard Twin Room', '2 single beds', 68), " +
      "(5, 'Superior Double Room with Sofa', '1 sofa bed and 1 large double bed', 96), " +
      "(6, 'Marina Classic', '1 extra-large double bed', 251), " +
      "(6, 'Premium Room with Sea View', '2 single beds', 276), " +
      "(7, 'Superior Sea View', '2 single beds', 39), " +
      "(7, 'Standard Double Room', '1 large double bed', 46), " +
      "(8, 'Deluxe Double Room with Sea View', '1 extra-large double bed', 23), " +
      "(9, 'Standard Queen Room', '1 large double bed', 35), " +
      "(10, 'Deluxe Room', '1 single bed', 154), " +
      "(10, 'Deluxe Double Room with Sea View', '1 extra-large double bed', 217), " +
      "(11, 'Deluxe Bungalow', '1 extra-large double bed', 90), " +
      "(12, 'Deluxe Double Room with Garden View', '1 large double bed', 308), " +
      "(13, 'Standard Double or Twin Room', '2 single beds', 52), " +
      "(13, 'Double Room with Sea View', '1 large double bed', 70), " +
      "(14, 'Standard Double Room with Balcony', '1 double bed', 911), " +
      "(15, 'Budget Double Room', '1 large double bed', 5), " +
      "(15, 'Deluxe Double Room with Balcony', '1 large double bed', 11), " +
      "(16, 'Cabana', '1 extra-large double bed', 121), " +
      "(17, 'Deluxe Queen Studio', '1 sofa bed and 1 large double bed', 225), " +
      "(18, 'Single Room', '1 single bed', 73), " +
      "(19, 'Standard Room', '1 large double bed', 311), " +
      "(19, 'Classic Double or Twin Room', '1 large double bed', 340), " +
      "(19, 'Deluxe King Room', '1 large double bed', 373), " +
      "(20, 'Standard Double or Twin Room', '1 large double bed', 199), " +
      "(20, 'Standard Room - High Floor', '1 double bed', 203), " +
      "(21, 'Double or Twin Room with Balcony', '1 double bed', 52), " +
      "(21, 'Junior Suite', '1 double bed', 73), " +
      "(22, 'Budget Double Room', '1 extra-large double bed', 22), " +
      "(22, 'Suite with Balcony', '1 extra-large double bed', 32);");
};

exports.down = function(db) {
  return db.runSql("DELETE FROM rooms;");
};

exports._meta = {
  "version": 1
};
