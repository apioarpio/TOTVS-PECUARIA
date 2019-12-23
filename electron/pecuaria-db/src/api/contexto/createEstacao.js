import contextoModel from '../../db/models/contexto';

export default (req, res) => {

    const codEstacao = req.body.codEstacao;
    const codFazenda = req.body.codFazenda;

    if (codEstacao && codFazenda) {

        contextoModel.create(codEstacao)
            .then(result => {
                res.status(200).json();
            })
            .catch(err => {
                res.status(500).json();
            })
    }
}
