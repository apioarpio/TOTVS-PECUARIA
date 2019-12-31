import database from '../config/database';

export default {
    create: function (faixaEtaria) {
        return new Promise((resolve, reject) => {
            if (faixaEtaria) {

                const db = database();

                db.serialize(() => {

                    const stmt = db.prepare(`INSERT INTO faixa_etaria VALUES(?,?,?,?,?,?)`);

                    stmt.run(
                        faixaEtaria['id'],
                        faixaEtaria['descricao'],
                        faixaEtaria['inicio'],
                        faixaEtaria['fim'],
                        faixaEtaria['deletado'],
                        new Date().toLocaleString()
                        , (err) => {
                            if (err) {
                                console.log(err);
                                reject(err)
                            }
                            resolve();
                        });
                    stmt.finalize();
                });
                db.close();
            }
        })
    },
    get: function (fields) {
        return new Promise((resolve, reject) => {
            const db = database();
            let fieldsFilter = '';
            if (fields) {
                fields = fields.split(',');
                console.log('tem fields');
                //caso for um array, será tratado todos os campos solicitados
                if (Array.isArray(fields)) {
                    for (let i = 0; i < fields.length; i++) {
                        console.log(fields[i].trim());
                        fieldsFilter += ` ${this.getColumnFilter(fields[i].trim())} ${i === (fields.length - 1) ? '' : ','}`
                    }
                } else {
                    console.log('fields único');
                    console.log(fields)
                    fieldsFilter += ` ${this.getColumnFilter(fields)} `
                }
            } else {
                fieldsFilter = '*';
            }
            console.log(fieldsFilter);
            console.log(`SELECT ${fieldsFilter} FROM faixa_etaria`);
            db.serialize(() => {
                db.all(`SELECT ${fieldsFilter} FROM faixa_etaria`, (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err)
                    } else {
                        resolve(this.getColumnsObject(result))
                    }
                })
            });
            db.close();
        })
    },
    getById: function (fields, id) {
        return new Promise((resolve, reject) => {
            const db = database();
            let fieldsFilter = '';
            let where = '';
            if (fields) {
                fields = fields.split(',');
                //caso for um array, será tratado todos os campos solicitados
                if (Array.isArray(fields)) {
                    for (let i = 0; i < fields.length; i++) {
                        fieldsFilter += ` ${this.getColumnFilter(fields[i].trim())} ${i === (fields.length - 1) ? '' : ','}`
                    }
                } else {
                    fieldsFilter += ` ${this.getColumnFilter(fields)} `
                }
            } else {
                fieldsFilter = '*';
            }
            if (id) {
                where += !where ? ' WHERE ' : ' AND ';
                where += ` id_faixa_etaria = '${id}'`
            }
            console.log(`SELECT ${fieldsFilter} FROM faixa_etaria ${where}`);
            db.serialize(() => {
                db.get(`SELECT ${fieldsFilter} FROM faixa_etaria ${where}`, (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err)
                    } else {
                        resolve(this.getColumnsObject(result))
                    }
                })
            });
            db.close();
        });
    },
    getColumnFilter(field) {
        let columnString = '';
        switch (field) {
            case 'id':
                columnString += ' id_faixa_etaria';
                break;
            case 'descricao':
                columnString += ' descricao';
                break;
            case 'inicio':
                columnString += ' inicio';
                break;
            case 'fim':
                columnString += ' fim';
                break;
            case 'dataSincronizacao':
                columnString += ' data_sincronizacao';
                break;
        }
        return columnString;
    },
    getColumnsObject(faixaEtariaDB) {
        let faixasEtaria = [];
        if (Array.isArray(faixaEtariaDB)) {
            faixasEtaria = [];
            for (let fe of faixaEtariaDB) {
                faixasEtaria.push(this.transformFaixaEtariaObject(fe))
            }
        } else {
            faixasEtaria = this.transformFaixaEtariaObject(faixaEtariaDB)
        }
        return faixasEtaria;
    },
    /**
     * @description transforma um objeto de faixa etária da estrutura do banco para a estrutura cammelCase
     */
    transformFaixaEtariaObject(fe) {
        let faixaEtaria = {};
        if (fe.hasOwnProperty('id_faixa_etaria')) {
            faixaEtaria.id = fe['id_faixa_etaria']
        }

        faixaEtaria.descricao = fe['descricao'];
        faixaEtaria.inicio = fe['inicio'];
        faixaEtaria.fim = fe['fim'];
        return faixaEtaria
    }
}
