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
  return db.runSql("INSERT INTO hotels (name, country, city) VALUES " +
      "('Hotel Leotel', 'Ukraine', 'Lviv'), " +
      "('PANORAMA Lviv Hotel', 'Ukraine', 'Lviv'), " +
      "('Tulip Residences Warsaw Targowa', 'Poland', 'Warsaw'), " +
      "('Hampton by Hilton Warsaw City Centre', 'Poland', 'Warsaw'), " +
      "('ibis Styles Warszawa Centrum', 'Poland', 'Warsaw'), " +
      "('Hotel Spa Porta Maris by Melia', 'Spain', 'Alicante'), " +
      "('Amagi Beach', 'Sri Lanka', 'Marawila'), " +
      "('Villa Jungle & Wiener', 'Sri Lanka', 'Habaraduwa'), " +
      "('Nuga Eden Tangalle', 'Sri Lanka', 'Tangalle'), " +
      "('Le Grand Galle By Asia Leisure', 'Sri Lanka', 'Kaluwalla'), " +
      "('Simply Peace', 'Sri Lanka', 'Tangalle'), " +
      "('Sundara by Mosvold', 'Sri Lanka', 'Tangalle'), " +
      "('Serein Beach Hotel', 'Sri Lanka', 'Tangalle'), " +
      "('Pegasus Reef Hotel', 'Sri Lanka', 'Colombo'), " +
      "('Surf Beach Hotel', 'Sri Lanka', 'Arugam Bay'), " +
      "('Jetwing Surf', 'Sri Lanka', 'Arugam Bay'), " +
      "('Crystal Hotel', 'Ukraine', 'Kyiv'), " +
      "('Gallery Hotel Gintama', 'Ukraine', 'Kyiv'), " +
      "('InterContinental', 'Ukraine', 'Kyiv'), " +
      "('Radisson Blu Hotel', 'Ukraine', 'Kyiv'), " +
      "('Sonata hotel & restaurant', 'Ukraine', 'Lviv'), " +
      "('Fortetsya Malehiv', 'Ukraine', 'Lviv');");
};

exports.down = function(db) {
  return db.runSql("DELETE FROM hotels;");
};

exports._meta = {
  "version": 1
};
