import Movimentacao from '../../db/models/movimentacao';

export default (req, res) => {

    const idMovimentacao = req.params.id;
    const tipoMovimentacao = req.query.tipoMovimentacao;
    const fields = req.query.fields;

    const filter = {
        id: idMovimentacao,
        tipo: tipoMovimentacao
    };

    Movimentacao.getMovimentacoes(filter, fields)
        .then(result => {
            let movimentacoes = [];

            for (let mov of result) {
                console.log(result)
                movimentacoes.push({
                    idMovimentacao: mov.id_movimentacao,
                    idTm: mov.id_tm,
                    idFazenda: mov.id_fazenda,
                    quantidadeAnimal: mov.quantidade_animal,
                    tipo: mov.tipo,
                    observacao: mov.observacao,
                    idFornecedor: mov.id_fornecedor,
                    numeroGta: mov.numero_gta,
                    serieGta: mov.serie_gta,
                    dataEmissaoGta: mov.data_emissao_gta,
                    dataValidadeGta: mov.data_validade_gta,
                    dataSaidaGta: mov.data_saida_gta,
                    dataChegadaGta: mov.data_chegada_gta,
                    dataCadastro: mov.data_cadastro
                })
            }

            res.status(200).json({items: movimentacoes})
        })
        .catch(err => {
            res.status(400).send({message: 'Ocorreu um erro na busca das movimentações', erro: err})
        });

}
