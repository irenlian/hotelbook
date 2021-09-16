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
  return db.runSql(
      "CREATE OR REPLACE PROCEDURE insert_booking(userId integer, roomId integer, checkIn varchar, checkOut varchar, INOUT last_id integer DEFAULT null)\n" +
      "LANGUAGE plpgsql\n" +
      "AS $$\n" +
      "BEGIN\n" +
      "IF NOT EXISTS (\n" +
      "SELECT bookings.id\n" +
      "FROM bookings \n" +
      "WHERE room_id = roomId AND \n" +
      "  ((CAST(checkIn AS DATE) BETWEEN bookings.check_in AND bookings.check_out - 1) OR\n" +
      "  (CAST(checkOut AS DATE) BETWEEN bookings.check_in + 1 AND bookings.check_out) OR\n" +
      "  (bookings.check_in + 1 BETWEEN CAST(checkIn AS DATE) AND CAST(checkOut AS DATE)))\n" +
      "GROUP BY bookings.id\n" +
      ")\n" +
      "THEN\n" +
      "INSERT INTO bookings (user_id, room_id, check_in, check_out) \n" +
      "    VALUES (userId, roomId, CAST(checkIn AS DATE), CAST(checkOut AS DATE))\n" +
      "    RETURNING id INTO last_id;\n" +
      "END IF;\n" +
      "END;\n" +
      "$$;\n"
  );
};

exports.down = function(db) {
  return db.runSql(
      "DROP PROCEDURE insert_booking(userId integer, roomId integer, checkIn varchar, checkOut varchar, INOUT last_id integer)"
  );
};

exports._meta = {
  "version": 1
};
