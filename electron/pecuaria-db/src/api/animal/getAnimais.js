import animalDAO from '../../db/models/animal';

/**
 * TODO UPGRADE: melhorar a forma como a paginação é realizada
 * @param req
 * @param res
 */
export default (req, res) => {

    const recordId = req.query.recordId ? req.query.recordId : "";
    const limit = req.query.limit ? req.query.limit : "";

    animalDAO.getAnimais(recordId, limit)
        .then(result => {
            const arrayReduced = result.map( (a) => {
                return a.id
            });
            let ultimoIndice = arrayReduced.reduce((a, b) => {
                return Math.min(a, b)
            });
            res.status(200).json({
                ultimoIndice: ultimoIndice,
                animais: result
            });
        })
        .catch(e => {
            res.status(500).json(e);
        });

}
