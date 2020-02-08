import EntidadeDao from '../../db/models/Entidade';

export default (req, res) => {
    const idEntidade = req.params.id;
    EntidadeDao.getEntidadeById(idEntidade)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}
