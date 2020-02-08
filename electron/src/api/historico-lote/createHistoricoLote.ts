import HistoricoLoteDao from '../../db/models/HistoricoLote';

export default (req, res) => {

    const historicoLote = req.body.historicoLote;
    if (historicoLote) {
        HistoricoLoteDao.create(historicoLote)
            .then(result => {
                res.status(200).json('Registro Criado com sucesso')
            })
            .catch(err => {
                if (err) {
                    res.status(500).json({err: err})
                }
            })
    } else {
        res.status(400).json('Histórico não informado.')
    }
}
