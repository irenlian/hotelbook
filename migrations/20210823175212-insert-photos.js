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
  return db.runSql("INSERT INTO photos (hotel_id, name, main) VALUES " +
      "(1, 'leotel1.jpeg', TRUE), " +
      "(1, 'leotel2.jpeg', FALSE), " +
      "(1, 'leotel3.jpeg', FALSE), " +
      "(1, 'leotel4.jpeg', FALSE), " +
      "(2, 'panorama1.jpeg', FALSE), " +
      "(2, 'panorama2.jpeg', TRUE), " +
      "(2, 'panorama3.jpeg', FALSE), " +
      "(3, 'tulip1.jpeg', TRUE), " +
      "(3, 'tulip2.jpeg', FALSE), " +
      "(3, 'tulip3.jpeg', FALSE), " +
      "(4, 'hampton1.jpeg', TRUE), " +
      "(4, 'hampton2.jpeg', FALSE), " +
      "(4, 'hampton3.jpeg', FALSE), " +
      "(5, 'ibis1.jpeg', TRUE), " +
      "(5, 'ibis2.jpeg', FALSE), " +
      "(5, 'ibis3.jpeg', FALSE), " +
      "(6, 'porta1.jpeg', TRUE), " +
      "(6, 'porta2.jpeg', FALSE), " +
      "(6, 'porta3.jpeg', FALSE), " +
      "(7, 'amagi1.jpeg', TRUE), " +
      "(7, 'amagi2.jpeg', FALSE), " +
      "(7, 'amagi3.jpeg', FALSE), " +
      "(8, 'wiener1.jpeg', TRUE), " +
      "(8, 'wiener2.jpeg', FALSE), " +
      "(8, 'wiener3.jpeg', FALSE), " +
      "(9, 'nuga1.jpeg', TRUE), " +
      "(9, 'nuga2.jpeg', FALSE), " +
      "(9, 'nuga3.jpeg', FALSE), " +
      "(10, 'grandgalle1.jpeg', TRUE), " +
      "(10, 'grandgalle2.jpeg', FALSE), " +
      "(10, 'grandgalle3.jpeg', FALSE), " +
      "(11, 'simplypeace1.jpeg', TRUE), " +
      "(11, 'simplypeace2.jpeg', FALSE), " +
      "(11, 'simplypeace3.jpeg', FALSE), " +
      "(12, 'sundara1.jpeg', TRUE), " +
      "(12, 'sundara2.jpeg', FALSE), " +
      "(12, 'sundara3.jpeg', FALSE), " +
      "(12, 'sundara4.jpeg', FALSE), " +
      "(12, 'sundara5.jpeg', FALSE), " +
      "(13, 'serein1.jpeg', TRUE), " +
      "(13, 'serein2.jpeg', FALSE), " +
      "(13, 'serein3.jpeg', FALSE), " +
      "(14, 'pegasus1.jpeg', TRUE), " +
      "(14, 'pegasus2.jpeg', FALSE), " +
      "(14, 'pegasus3.jpeg', FALSE), " +
      "(15, 'surfbeach1.jpeg', TRUE), " +
      "(15, 'surfbeach2.jpeg', FALSE), " +
      "(16, 'jetwing1.jpeg', FALSE), " +
      "(16, 'jetwing2.jpeg', FALSE), " +
      "(16, 'jetwing3.jpeg', TRUE), " +
      "(17, 'crystal1.jpeg', TRUE), " +
      "(17, 'crystal2.jpeg', FALSE), " +
      "(17, 'crystal3.jpeg', FALSE), " +
      "(18, 'gintama1.jpeg', TRUE), " +
      "(18, 'gintama2.jpeg', FALSE), " +
      "(18, 'gintama3.jpeg', FALSE), " +
      "(19, 'intercontinental1.jpeg', TRUE), " +
      "(19, 'intercontinental2.jpeg', FALSE), " +
      "(19, 'intercontinental3.jpeg', FALSE), " +
      "(20, 'radisson1.jpeg', TRUE), " +
      "(20, 'radisson2.jpeg', FALSE), " +
      "(20, 'radisson3.jpeg', FALSE), " +
      "(21, 'sonata1.jpeg', TRUE), " +
      "(21, 'sonata2.jpeg', FALSE), " +
      "(21, 'sonata3.jpeg', FALSE), " +
      "(22, 'fortetsya1.jpeg', TRUE), " +
      "(22, 'fortetsya2.jpeg', FALSE), " +
      "(22, 'fortetsya3.jpeg', FALSE);");
};

exports.down = function(db) {
  return db.runSql("DELETE FROM photos;");
};

exports._meta = {
  "version": 1
};
