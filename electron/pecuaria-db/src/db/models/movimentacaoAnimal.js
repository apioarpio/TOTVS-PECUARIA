import database from '../config/database';

export default {

    create: (idMovimento, idAnimal) => {

        return new Promise((resolve, reject) => {
            const db = database();
            let stmt = db.prepare('INSERT INTO movimentacao_animal VALUES(? ,? ,? )');
            stmt.run('', idMovimento, idAnimal);

        })

    }

}
