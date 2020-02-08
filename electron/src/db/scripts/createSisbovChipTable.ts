import database from '../config/database';

export default () => {

    const db = database();

    db.serialize(() => {

        db.run(`
            CREATE TABLE IF NOT EXISTS
            sisbov_chip(
                id_solicitacao INTEGER PRIMARY KEY,
                id_fazenda INTEGER,
                numero_pedido INTEGER,
                data_solicitacao DATE,
                status INTEGER,
                item INTEGER,
                sisbov INTEGER,
                rfid INTEGER,
                status_sisbov INTEGER,
                data_atualizacao DATE,
                data_integracao DATE,
                deletado BOOLEAN,
                recno INTEGER 
            )
        `, err => {
            return err ? err : true;
        })

    });

    db.close();

}
