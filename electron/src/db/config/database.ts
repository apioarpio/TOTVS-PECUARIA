// const sqlite3 = require('sqlite3').verbose();
import {verbose} from "sqlite3";
import * as path from 'path'

export default () => {
  const sqlite3 = verbose();
  const dbPath = path.join(__dirname, '../../../../../../pecuaria.db').replace('/app.asar', '');
  return new sqlite3.Database(dbPath);
}
