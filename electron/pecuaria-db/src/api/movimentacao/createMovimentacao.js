import Movimentacao from '../../db/models/movimento';

export default (req, res) => {

    const movimentacao = req.body.movimentacao;

    if (movimentacao) {

        const movimentacaoObj = {
            $ID: '',
            $CODTM: movimentacao.codTm,
            $QTDANIMAIS: movimentacao.qtdAnimais,
            $OBS: movimentacao.obs,
            $CODFORNECEDOR: movimentacao.codFornecedor,
            $NUMEROGTA: movimentacao.numeroGta,
            $SERIEGTA: movimentacao.serieGta,
            $DTEMISSAOGTA: movimentacao.dtEmissaoGta,
            $DTVALIDADEGTA: movimentacao.dtValidadeGta,
            $DATASAIDAGTA: movimentacao.dataSaidaGta,
            $DATACHEGADAGTA: movimentacao.dataChegadaGta,
            $DATACADASTRO: new Date().toLocaleString()
        };

        Movimentacao.createMovimentacao(movimentacaoObj)
            .then(record => {
                res.status(201).json({mensagem: 'Movimentação criado com sucesso', result: record});
            })
            .catch(err => {
                res.status(400).json({message: 'Não foi possível incluir o movimentacao', erro: err});
            })

    } else {
        res.status(500).json({message: 'Corpo da requisição incompleto'});
    }

}
