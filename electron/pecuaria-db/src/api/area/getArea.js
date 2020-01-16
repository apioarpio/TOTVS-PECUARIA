import Area from '../../db/models/Area';

export default (req, res) => {

    let fields;
    let params;

    Area.getAll(fields, params)
        .then(result => {
            res.status(200).json(result.length > 1 ? {items: result} : result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}
