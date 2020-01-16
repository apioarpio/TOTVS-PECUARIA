import Lote from '../../db/models/Lote'

export default (req, res) => {

    let idLote = req.params.id;

    Lote.getById(idLote)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(
                {
                    erro: err
                }
            )
        })
}
