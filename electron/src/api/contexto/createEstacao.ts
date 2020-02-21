import contextoModel from '../../db/models/Contexto';

export default (req, res) => {

    const codEstacao = req.body.codEstacao;

    if (codEstacao) {
        contextoModel.create(codEstacao)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    } else {
        res.status(400).json({err: 'erro'})
    }
}
