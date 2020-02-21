import ContextoPersistence from '../../db/models/Contexto';

export default (req, res) => {

    let codFazenda = req.body.codFazenda;

    ContextoPersistence.setFazendaAtual(codFazenda)
        .then(result => {
            res.status(200).json(result);
        })
        .catch( err => {
            res.status(200).json(err);
        })

}
