import database from '../config/database';

export default () => {
    return new Promise((resolve, reject) => {
        const db = database();
        db.serialize(() => {
            db.run(`
              CREATE TABLE IF NOT EXISTS
              ANIMAL (
                id_animal INTEGER PRIMARY KEY AUTOINCREMENT,
                sisbov INTEGER UNIQUE,
                manejo INTEGER,
                raca STRING,
                sexo INTEGER,
                data_nascimento DATE,
                data_inclusao_sisbov DATE,
                codigo_faixa_etaria INTEGER,
                peso NUMERIC,
                data_pesagem DATE,
                codigo_fazenda INTEGER,
                codigo_fornecedor INTEGER,
                numero_solicitacao_sisbov INTEGER,
                data_entrada DATE,
                movimento_origem TEXT,
                rfid TEXT,
                lote TEXT,
                pasto TEXT,
                data_lib_abate_certificadora DATE,
                data_abate DATE,
                data_lib_abate_sanitario TEXT,
                data_apontamento_morte DATE,
                controle_webservice TEXT,
                status INTEGER,
                data_limite_cota_hilton DATE,
                cadastro DATE,
                data_atualizacao_animal DATE,
                fazenda_origem TEXT,
                certificadora TEXT,
                data_certificadora DATE,
                controle_transferencia TEXT,
                data_sync DATE
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
    });
}
