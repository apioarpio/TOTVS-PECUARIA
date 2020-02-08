import SolicitacaoBrincoDao from '../../db/models/SolicitacaoBrinco';

export default (req, res) => {

    const sisbov = req.params.sisbov;
    const idFazenda = req.query.idFazenda;

    if (sisbov && idFazenda) {
        SolicitacaoBrincoDao.validaSisbov(sisbov, idFazenda)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    } else {
        res.status(400).json("Parâmetros não informados.")
    }

}
