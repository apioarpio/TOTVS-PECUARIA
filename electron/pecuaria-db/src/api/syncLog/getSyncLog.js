import syncLogDb from '../../db/models/syncLog';

export default (req, res) => {
    const tabela = req.query.tabela;
    if (tabela) {
        syncLogDb.getLastLog(tabela)
            .then(result => {
                res.status(200).json(result[0]);
            })
            .catch(err => {
                res.status(500).send(err);
            })
    } else {
        res.status(400).send()
    }
}
