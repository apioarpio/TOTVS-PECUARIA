import Lote from '../../db/models/Lote'

export default (req, res) => {
    const fields = [];
    const params = {
        idFazenda: req.query.idFazenda,
        idArea: req.query.idArea
    };

    Lote.getAll(fields, params)
        .then(result => {

            res.status(200).json(result.lenth > 1 ? {items: result} : result)

        })
        .catch(err => {
            res.status(500).json({
                erro: err
            })
        })

}
