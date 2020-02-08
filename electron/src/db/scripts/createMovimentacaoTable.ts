import database from '../config/database';

export default () => {
    return new Promise((resolve, reject) => {
        const db = database();
        db.serialize(() => {
            /**
             * tipos de operacoes-curral: 1 - entrada, 2 - saída, 3 - interno
             */
            db.run(`
                CREATE TABLE IF NOT EXISTS
                    movimentacao(
                        id_movimentacao INTEGER PRIMARY KEY AUTOINCREMENT,
                        id_tm INTEGER,
                        id_fornecedor INTEGER,
                        id_fazenda,
                        quantidade_animal INTEGER,
                        tipo INTEGER,
                        observacao TEXT,
                        numero_gta INTEGER,
                        serie_gta INTEGER,
                        data_emissao_gta DATE,
                        data_validade_gta DATE,
                        data_saida_gta DATE,
                        data_chegada_gta DATE,
                        data_cadastro DATE
                    )
            `,
                (err, success) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(success)
                });
        });
        db.close();
    })
}
