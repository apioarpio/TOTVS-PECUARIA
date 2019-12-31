import FaixaEtariaPersistence from '../../db/models/FaixaEtaria';

export default (req, res) => {

    const fields = req.query.fields;
    const id = req.params.id;
    let params = {};

    FaixaEtariaPersistence.getById(fields, id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err)
        })

}
