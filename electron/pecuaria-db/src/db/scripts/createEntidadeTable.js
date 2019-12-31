import database from '../config/database';

export default () => {
    return new Promise((resolve, reject) => {
        const db = database();
        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS
                entidade (
                  id_entidade INTEGER NOT NULL PRIMARY KEY,
                  nome TEXT, 
                  tipo TEXT, 
                  uf TEXT,
                  cod_municipio TEXT,
                  id_sisbov TEXT,
                  insest TEXT,
                  cnpj INTEGER,
                  id_fornecedor INTEGER,
                  sif TEXT,
                  data_sincronizacao DATE
                )`,
                (err, success) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(success);
                });
        });
        db.close();
    });

}
