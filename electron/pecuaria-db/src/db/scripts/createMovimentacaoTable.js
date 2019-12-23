import database from '../config/database';

export default () => {
    return new Promise((resolve, reject) => {
        const db = database();
        db.serialize(() => {

            db.run(`
                CREATE TABLE IF NOT EXISTS
                    MOVIMENTACAO(
                        ID INTEGER PRIAMRY KEY AUTOINCREMENT,
                        CODTM INTEGER,
                        QTDANIMAIS INTEGER,
                        OBSERVACAO TEXT,
                        NUMEROGTA INTEGER,
                        SERIEGTA INTEGER,
                        DTEMISSAOGTA DATE,
                        DTVALIDADEGTA DATE,
                        DTSAIDAGTA DATE,
                        DTCHEGADAGTA DATE,
                        DTCADASTRO DATE,
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
