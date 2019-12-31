import db from '../config/database';

export default {

    createEntidade: (idEntidade, nome, tipo, uf, codMunicipio, idSisbov, insest, cnpj, idFornecedor, sif) => {
        return new Promise((resolve, reject) => {
            const database = db();
            database.serialize(() => {
                var stmt = database.prepare("INSERT INTO entidade VALUES (?,?,?,?,?,?,?,?,?,?,?)");
                stmt.run(idEntidade, nome, tipo, uf, codMunicipio, idSisbov, insest, cnpj, idFornecedor, sif, new Date().toLocaleString(), (err, row) => {
                    if (err) {
                        resolve({
                            cod: 0,
                            mensage: 'Não Foi possível incluir o registro',
                            erro: err
                        });
                    }
                    resolve({response: 'registro criado com sucesso', result: row});
                });
                stmt.finalize();
            });
            database.close();
        })
    },
    getEntidades: () => {
        return new Promise((resolve, reject) => {
            const database = db();
            database.all("SELECT * FROM entidade", function (err, row) {
                console.log(`terminou de ler ${new Date().toLocaleString()}`);
                resolve(row);
            });
            database.close();
        })
    },
    getEntidadesPaginado: function (indiceInicial, limite) {
        const that = this;
        const maxRecords = limite ? limite : 100;
        let query = '';

        if (!indiceInicial) {
            query = `SELECT 
          CODIGO,
            NOME,
            TIPO,
            UF,
            codmun,
            IDSISBOV,
            INSEST,
            CNPJ,
            CODFOR,
            SIF,
            DATASYNC
       FROM entidade ORDER BY codigo LIMIT ${maxRecords}`;
        } else if (indiceInicial) {
            query = `SELECT 
            CODIGO,
            NOME,
            TIPO,
            UF,
            codmun,
            IDSISBOV,
            INSEST,
            CNPJ,
            CODFOR,
            SIF,
            DATASYNC
            FROM entidade
            WHERE codigo >= ${indiceInicial} ORDER BY codigo LIMIT ${maxRecords}`;
        }
        console.log(query)
        //executa a query para a busca das entidades
        return new Promise((resolve, reject) => {
            const database = db();
            database.all(query, function (err, row) {
                if (err) {
                    resolve(err)
                }
                console.log(`terminou de ler ${new Date().toLocaleString()}`);
                that.getUltimoIndice().then(ultimoIndice => {
                    resolve({
                        ultimoIndice: ultimoIndice[0]['ultimoIndice'],
                        values: row
                    });
                });
            });
            database.close();
        });
    },
    getUltimoIndice: () => {
        return new Promise((resolve, reject) => {
            const database = db();
            database.all('SELECT MAX(codigo) ultimoIndice FROM entidade', function (err, row) {
                if (err) {
                    resolve(err)
                }
                console.log(`terminou de ler ${new Date().toLocaleString()}`);
                resolve(row);
            });
            database.close();
        })
    }

}
