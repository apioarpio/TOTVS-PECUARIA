const sqlite3 = require('sqlite3').verbose();

export default () => {

  return new sqlite3.Database('pecuaria-db');

}
