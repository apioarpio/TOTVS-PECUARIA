import database from '../config/database';


export default () => {

    return new Promise((resolve, reject) => {

        const db = database();

        db.serialize(() => {

            db.run(`
                CREATE TABLE IF NOT EXISTS
                historico_area(
                    id_historico_area INTEGER PRIMARY KEY AUTOINCREMENT,
                    id_animal INTEGER NOT NULL,
                    id_area INTEGER NOT NULL,
                    id_mov_animal INTEGER NOT NULL,
                    area_origem INTEGER,
                    integrado BOOLEAN,
                    deletado BOOLEAN,
                    data_operacao DATE NOT NULL,
                    data_integracao DATE,
                    FOREIGN KEY(id_animal) REFERENCES animal(id_animal),
                    FOREIGN KEY(id_area) REFERENCES area(id_area),
                    FOREIGN KEY(id_mov_animal) REFERENCES movimentacao_animal(id_mov_animal)
                )
            `, err => {
                if (err) {
                    console.log('2',err);
                    reject(err);
                } else {
                    resolve(true)
                }
            })

        });

        db.close();
    })

}
