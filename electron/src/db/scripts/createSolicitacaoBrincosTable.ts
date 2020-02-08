import database from '../config/database';

export default () => {

    const db = database();

    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS
            solicitacao_brinco(
                id_solicitacao INTEGER PRIMARY KEY ,
                id_fazenda INTEGER,
                id_fornecedor INTEGER,
                sisbov_inicial INTEGER,
                sisbov_final INTEGER,
                status INTEGER,
                quantidade_sisbov INTEGER,
                nota INTEGER,
                serie INTEGER,
                loja INTEGER,
                data_solicitacao DATE,
                data_validade DATE,
                data_atualizacao DATE,
                data_integracao DATE,
                deletado BOOLEAN
            )
        `, err => {
            return err ? err : true;
        })
    });

    db.close();
}
