import FaixaEtariaPersistence from '../../db/models/FaixaEtaria';

export default (req, res) => {

    const fields = req.query.fields;

    let idadeMeses = req.query.idadeMeses;

    let filter = {
        idadeMeses: idadeMeses
    };

    FaixaEtariaPersistence.get(fields, filter)
        .then(result => {
            res.status(200).json({items: result})
        })
        .catch(err => {
            res.status(400).json(err)
        })

}
