import database from '../config/database';
import ContextoPersistence from '../models/contexto';

export default {

    createMovimentacao: function (movimentacao) {
        return new Promise(async (resolve, reject) => {
            const db = database();
            try {
                const dataAtualFormatada = new Date().toLocaleDateString().replace(/\//g, '');
                let contexto = await ContextoPersistence.getContexto();
                contexto = contexto.contexto;
                console.log('contexto', contexto.codFazendaAtual);
                if (!contexto.codFazendaAtual) {
                    reject({mensagem: 'Nenhuma fazenda foi selecionada para trabalho nesta entação'})
                } else {

                    //filtros para buscar todas as movimentacoes com base na data atual e a fazenda
                    let filtersMovimentacao = {
                        dataCadastro: new Date().toLocaleDateString(),
                        codFazenda: contexto.codFazendaAtual
                    };
                    let movimentacoesSaved = await this.getMovimentacoes(filtersMovimentacao);
                    let sequencialDia = movimentacoesSaved.length > 9 ? "0" + (movimentacoesSaved.length + 1) : "00" + (movimentacoesSaved.length + 1);
                    let pkMovimentacao = contexto.codEstacao + '' + contexto.codFazendaAtual + dataAtualFormatada + sequencialDia;

                    console.log(dataAtualFormatada);
                    console.log(contexto);
                    console.log(filtersMovimentacao);
                    console.log(movimentacoesSaved);
                    console.log(sequencialDia);
                    console.log(pkMovimentacao);

                    movimentacao["$idMovimentacao"] = pkMovimentacao;
                    movimentacao["$codFazendaAtual"] = contexto.codFazendaAtual;

                    console.log(movimentacao)

                    db.serialize(() => {
                        let stmt = db.prepare(
                            `
                            INSERT INTO movimentacao VALUES(
                                $idMovimentacao,
                                $idTm,
                                $idFornecedor,
                                $codFazendaAtual,
                                $quantidadeAnimal,
                                $tipo,
                                $observacao,
                                $numeroGta,
                                $serieGta,
                                $dataEmissaoGta,
                                $dataValidadeGta,
                                $dataSaidaGta,
                                $dataChegadaGta,
                                $dataCadastro)
                        `);
                        stmt.run(movimentacao, (err, result) => {
                            console.log('teste');
                            console.log(err, result);
                            if (err) {
                                console.log('erro ao incluir uma movimentacao');
                                console.log(err);
                                reject(err);
                            } else {
                                console.log('movimentacao incluído com sucesso', result);
                                resolve(result)
                            }
                        });
                    })
                }

            } catch (e) {
                console.log('CATCH');
                console.log('erro ao incluir um movimentacao');
                console.log(e);
                reject(e)
            }
        });
    },
    getMovimentacoes: function (filters, fields, order) {
        return new Promise((resolve, reject) => {
            const db = database();
            let fieldsFilter = '*';
            let query = '';
            if (fields) {
                fieldsFilter = fields;
            }
            if (filters) {
                if (filters.id) {
                    query += !query ? 'WHERE ' : 'AND ';
                    query += `movimentacao.id_movimentacao = ${filters.id} `;
                }
                if (filters.tipo) {
                    query += !query ? 'WHERE ' : 'AND ';
                    query += `movimentacao.tipo = ${filters.tipo} `;
                }
                if (filters.dataCadastro) {
                    query += !query ? 'WHERE ' : 'AND ';
                    query += `movimentacao.data_cadastro like '${filters.dataCadastro}%' `;
                }
            }
            console.log(`SELECT ${fieldsFilter} FROM movimentacao INNER JOIN TIPOSMOVIMENTO TM ON TM.CODIGO = movimentacao.id_tm ${query}`)
            db.all(`SELECT ${fieldsFilter} FROM movimentacao INNER JOIN TIPOSMOVIMENTO TM ON TM.CODIGO = movimentacao.id_tm ${query}`, (err, results) => {
                if (err) {
                    reject(err);
                }
                console.log(results)
                resolve(results);
            })
        })
    }


}
