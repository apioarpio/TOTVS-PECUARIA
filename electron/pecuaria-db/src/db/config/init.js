import db from './database'

db.serialize(function () {
  db.run("create table if not exists lorem (info TEXT)");

});

db.close();
