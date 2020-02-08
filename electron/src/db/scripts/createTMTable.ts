import database from '../config/database'

export default () => {
    return new Promise((resolve, reject) => {

        const db = database();

    //         CODIGO INTEGER PRIMARY KEY AUTOINCREMENT,
    //         DESCRICAO STRING NOT NULL,
    //         TIPO INTEGER, 1 - ENTRADA, 2 - SAIDA, 3 - MANEJO
    //         CDCERT INTEGER, CODIGO CERTIFICADORA
    //         STATUS INTEGER,
    //         BRELET INTEGER, BRINCO ELETRONICO
    //         IDTFSB INTEGER, INCLUI SISBOV
    //         PESANI INTEGER, PESA ANIMAL
    //         TRASAN INTEGER, SANITARIO
    //         VCLOTE INTEGER, VINCULA LOTE
    //         VCAREA INTEGER, VINCULA AREA
    //         TPSAID INTEGER,  1 - TRANSFERENCIA, 2 - VENDA PRODUTOR, 3 - VENDA FRIGORIFICO
    //         TPENTR INTEGER, 1 - TRANSFERENCIA, 2 - COMPRA, 3 - CADASTRO

        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS
                tipo_movimento(
                    id_tm INTEGER PRIMARY KEY AUTOINCREMENT,
                    descricao STRING NOT NULL,
                    tipo INTEGER,
                    codigo_certificadora INTEGER,
                    status INTEGER,
                    brinco_eletronico INTEGER,
                    inclui_sisbov INTEGER,
                    pesa_animal INTEGER,
                    sanitario INTEGER,
                    vincula_lote INTEGER,
                    vincula_area INTEGER,
                    tipo_saida INTEGER,
                    tipo_entrada INTEGER,
                    data_integracao DATE
                )
            `, (err, success) => {
                if (err)
                    reject(new Error(err));

                resolve(success)
            })
        })
        db.close();
    })
}
