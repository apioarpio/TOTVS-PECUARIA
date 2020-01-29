import HistoricoArea from '../../db/models/HistoricoArea';

export default (req, res) => {

    const historicoArea = req.body.historicoArea;

    if (historicoArea) {
        HistoricoArea.create(historicoArea)
            .then(result => {
                res.status(200).json('registro criado com sucesso!')
            })
            .catch(err => res.status(500).json({erro: err}))
    } else {
        res.status(400).json('Histórico não informado');
    }

}
