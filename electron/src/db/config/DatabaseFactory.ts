// const sqlite3 = require('sqlite3').verbose();
import * as sqlite from "sqlite3";
import * as path from 'path'

export class DatabaseFactory {

    constructor() {

    }

    createDatabase() {
        const sqlite3 = sqlite.verbose();
        const dbPath = path.join(__dirname, '../../../../../../pecuaria.db').replace('/app.asar', '');
        return new sqlite3.Database(dbPath);
    }
}
