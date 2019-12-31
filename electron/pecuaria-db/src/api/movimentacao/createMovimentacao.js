import Movimentacao from '../../db/models/movimentacao';

export default (req, res) => {
    const movimentacao = req.body.movimentacao;
    if (movimentacao) {
        const movimentacaoObj = {
            $idMovimentacao: null,
            $idTm: movimentacao.idTm ? movimentacao.idTm : "",
            $quantidadeAnimal: movimentacao.quantidadeAnimal ? movimentacao.quantidadeAnimal : "",
            $tipo: movimentacao.tipo ? movimentacao.tipo : "",
            $observacao: movimentacao.observacao ? movimentacao.observacao : "",
            $idFornecedor: movimentacao.idFornecedor ? movimentacao.idFornecedor : "",
            $numeroGta: movimentacao.numeroGta ? movimentacao.numeroGta : "",
            $serieGta: movimentacao.serieGta ? movimentacao.serieGta : "",
            $dataEmissaoGta: movimentacao.dataEmissaoGta ? movimentacao.dataEmissaoGta : "",
            $dataValidadeGta: movimentacao.dataValidadeGta ? movimentacao.dataValidadeGta : "",
            $dataSaidaGta: movimentacao.dataSaidaGta ? movimentacao.dataSaidaGta : "",
            $dataChegadaGta: movimentacao.dataChegadaGta ? movimentacao.dataChegadaGta : "",
            $dataCadastro: new Date().toLocaleString()
        };
        console.log(movimentacaoObj)
        Movimentacao.createMovimentacao(movimentacaoObj)
            .then(record => {
                res.status(201).json({mensagem: 'Movimentação criado com sucesso', result: record});
            })
            .catch(err => {
                res.status(400).json({message: 'Não foi possível incluir a movimentação', erro: err});
            })
    } else {
        res.status(500).json({message: 'Corpo da requisição incompleto'});
    }

}
