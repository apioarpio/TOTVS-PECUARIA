import database from '../config/database';

export default () => {
    return new Promise((resolve, reject) => {
        const db = database();
        db.serialize(() => {
            db.run(
                `CREATE TABLE IF NOT EXISTS
                historico_medicamento(
                    id_historico_medicamento,
                    id_medicamento,
                    id_animal,
                    id_movimentacao_animal,
                    integrado BOOLEAN,
                    deletado BOOLEAN,
                    data_operacao DATE NOT NULL,
                    data_integracao DATE,
                    FOREIGN KEY(id_medicamento) REFERENCES medicamento(id_medicamento),
                    FOREIGN KEY(id_animal) REFERENCES animal(id_animal),
                    FOREIGN KEY(id_movimentacao_animal) movimentacao_animal(id_movimentacao_animal)
                )`
                , err => {
                    if (err) {
                        console.log(err);
                        reject(err)
                    }
                })
        });
        db.close();
    })
}
