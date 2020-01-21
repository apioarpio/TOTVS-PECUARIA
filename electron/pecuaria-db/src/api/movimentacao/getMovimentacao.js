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
                movimentacoes.push({
                    idMovimentacao: mov['id_movimentacao'],
                    tipoMovimento: {
                        idTm: mov['id_tm'],
                        descricao: mov['descricao'],
                        tipo: mov['tipo'],
                        codigoCertificadora: mov['codigo_certificadora'],
                        status: mov['status'],
                        brincoEletronico: mov['brinco_eletronico'],
                        incluiSisbov: mov['inclui_sisbov'],
                        pesaAnimal: mov['pesa_animal'],
                        sanitario: mov['sanitario'],
                        vinculaLote: mov['vincula_lote'],
                        vinculaArea: mov['vincula_area'],
                        tipoSaida: mov['tipo_saida'],
                        tipoEntrada: mov['tipo_entrada']
                    },
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

            console.log(movimentacoes)

            res.status(200).json({items: movimentacoes})
        })
        .catch(err => {
            res.status(400).send({message: 'Ocorreu um erro na busca das movimentações', erro: err})
        });

}
