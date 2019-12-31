import TMDb from '../../db/models/TiposMovimento';

export default (req, res) => {

    let codTM = req.query.codTM;
    let fields = req.query.fields;

    TMDb.getTM(codTM, fields)
        .then(result => {
            res.status(200).json({items: result});
        })
        .catch(err => {
            res.status(200).json(err);
        })
}
