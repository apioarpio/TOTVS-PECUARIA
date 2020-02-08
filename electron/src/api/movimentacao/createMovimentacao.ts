import Movimentacao from '../../db/models/movimentacao';

export default (req, res) => {
    const movimentacao = req.body.movimentacao;
    if (movimentacao) {
        Movimentacao.createMovimentacao(movimentacao)
            .then(record => {
                res.status(201).json({mensagem: 'Movimentação criado com sucesso', result: record});
            })
            .catch(err => {
                res.status(400).json({mensagem: 'Não foi possível incluir a movimentação', erro: err});
            })
    } else {
        res.status(500).json({mensagem: 'Corpo da requisição incompleto'});
    }

}
