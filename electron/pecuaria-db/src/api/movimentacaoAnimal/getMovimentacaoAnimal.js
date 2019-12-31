import MovimentacaoAnimal from '../../db/models/movimentacaoAnimal';

export default (req, res) => {

    let idMovimentacao = req.params.id;
    let idAnimal = req.query.idAnimal;

    if (idMovimentacao) {

        MovimentacaoAnimal.getAnimaisMovimento(idMovimentacao, idAnimal)
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                res.status(400).json({
                    message: 'Ocorreu um erro no processamento da requisição',
                    erro: err
                });
            })
    } else {
        res.status(500).json({
            mensagem: 'Id da movimentação não informado'
        })
    }
}
