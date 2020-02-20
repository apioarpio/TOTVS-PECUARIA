import database from '../config/database';

export default {
    /**
     * @description cria o contexto para a maquina de trabalho
     * @param codEstacao
     * @return {Promise<any>}
     */
    create: function (codEstacao) {
        return new Promise(async (resolve, reject) => {
            const db = database();
            try {
                //todo refatorar o contexto com MACAddress
                // const hasMAC = await this.checkMACContext(MAC_CURRENT_STATION);
                // if (hasMAC) {
                //     reject({codErro: 1, mensagem: 'Já existe um contexto cadastrado para esta estação'})
                // }
                db.serialize(() => {
                    db.run(`INSERT INTO contexto VALUES(${codEstacao},null, null)`,
                        (err, result) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            resolve(result);
                        })
                });
                db.close();
            } catch (e) {
                db.close();
                reject({codErro: 2, mensagem: 'ocorreu um erro no processamento do webservice', erro: e})
            }
        })
    },
    /**
     * @description adiciona uma fazenda para o contexto atual
     * @param codEstacao
     * @param codFazenda
     * @return {Promise<any>}
     */
    addFazendaContexto: function (codFazenda) {
        return new Promise(async (resolve, reject) => {
            const db = database();
            try {
                let contexto = await this.getContexto();
                contexto = contexto.contexto;

                let hasFazenda = await this.getFazendasContexto(codFazenda)
                if (hasFazenda) {
                    reject({codErro: 3, mensagem: 'Fazenda já cadastrada para a estação de trabalho informada.'})
                }
                db.serialize(() => {
                    db.run(`INSERT INTO contexto_fazenda VALUES(${null}, ${codFazenda}, ${contexto.codEstacao})`
                        , (err, result) => {
                            if (err) {
                                console.log(err);
                                reject({
                                    codErro: 1,
                                    mensagem: 'Não foi possível adicionar a fazenda para a entação.',
                                    erro: err
                                })
                            }
                            resolve(result);
                        }
                    )
                });
                db.close();
            } catch (e) {
                db.close();
                console.log(e);
                if (e.codErro === 2) {
                    reject({
                        codErro: 2,
                        mensagem: 'Nenhum contexto foi inserido para a estação de trabalho atual.',
                        erro: e
                    })
                }
                reject({codErro: 1, mensagem: 'Não foi possível adicionar a fazenda para a entação.', erro: e});
            }

        })
    },
    /**
     * @description seleciona a fazenda atuante
     * @param codEstacao
     * @param codFazenda
     */
    setFazendaAtual: function (codFazenda) {
        return new Promise(async (resolve, reject) => {
            if (codFazenda) {
                const db = database();
                try {

                    let contexto = await this.getContexto();
                    contexto = contexto.contexto;

                    db.serialize(() => {
                        db.run(`
                        UPDATE contexto SET cod_fazenda_atual = ${codFazenda} 
                        WHERE cod_estacao = '${contexto.codEstacao}' 
                    `, (err, result) => {
                            if (err) {
                                console.log(err)
                                reject({codErro: 1, mensagem: 'Erro ao atualizar a fazenda de trabalho.', erro: err})
                            }
                            resolve(result)
                        })
                    });
                    db.close()
                } catch (e) {
                    db.close();

                    if (e.codErro === 2) {
                        reject({
                            codErro: 3,
                            mensagem: 'Nenhum contexto foi inserido para a estação de trabalho atual'
                        })
                    }
                }
            } else {
                reject({
                    codErro: 2,
                    mensagem: 'Contexto não informado'
                })
            }
        });
    },
    /**
     * @description busca o context do macAddress
     * @param macAddress
     * @return {Promise<any>}
     */
    getContexto: function () {
        return new Promise((resolve, reject) => {
            const db = database();

            db.serialize(() => {
                db.get(`SELECT * FROM contexto`, (err, result) => {
                    if (err) {
                        console.log('erro', err);
                        reject(err);
                    } else {
                        console.log(result);
                        if (result) {
                            resolve({
                                contexto: {
                                    codEstacao: result['cod_estacao'],
                                    codFazendaAtual: result['cod_fazenda_atual'],
                                    macAddress: result['mac_address']
                                }
                            })
                        } else {
                            reject({
                                codErro: 2,
                                mensagem: 'Nenhum contexto foi inserido para a estação de trabalho atual.'
                            })
                        }
                    }
                })
            });
            db.close();
        })
    },
    getFazendasContexto: function (codFazenda) {
        return new Promise(async (resolve, reject) => {
            const db = database();
            try {
                const contextoResponse = await this.getContexto();
                const contexto = contextoResponse['contexto'];
                resolve(contexto);
                // if (contexto) {
                //     db.serialize(() => {
                //         let query = '';
                //         if (codFazenda) {
                //             query += `AND cf.cod_fazenda = '${codFazenda}'`
                //         }
                //         db.all(`
                //         SELECT *
                //         FROM contexto c
                //         INNER JOIN contexto_fazenda cf ON c.cod_estacao = cf.cod_estacao
                //         `, (err, result) => {
                //             if (err) {
                //                 console.log(err);
                //                 reject({codErro: 1, mensage: 'Erro ao buscar as fazendas do contexto', erro: err});
                //             }
                //             if (result.length > 0) {
                //                 const fazendasContexto = [];
                //                 for (let fazendaEstacao of result) {
                //                     fazendasContexto.push({
                //                         codFazenda: fazendaEstacao['cod_fazenda']
                //                     })
                //                 }
                //
                //                 resolve({
                //                     contexto: {
                //                         codEstacao: result[0]['cod_estacao'],
                //                         codFazendaAtual: result[0]['cod_fazenda_atual'],
                //                         fazendasContexto: fazendasContexto
                //                     }
                //                 })
                //             }
                //             resolve();
                //         })
                //     });
                // }
                db.close();
            } catch (e) {
                reject({codErro: 1, mensage: 'Erro ao buscar as fazendas do contexto', erro: e});
                db.close();
            }
        })
    },
    /**
     * @description Verifica se já existe um registro de contexto para este mac
     * @param macAddress
     * @return {Promise<any>}
     */
    checkMACContext: function (macAddress) {
        return new Promise((resolve, reject) => {
            const db = database();
            db.serialize(() => {
                db.get(`SELECT * FROM contexto WHERE mac_address = '${macAddress}'`, (err, result) => {
                    console.log('result', result, err);
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    if (result) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                })
            });
            db.close();
        })
    },
    getCodEstacaoAtual: function () {
        return new Promise((resolve, reject) => {
            const db = database();
            db.serialize(() => {
                db.get(`SELECT * FROM contexto`, (err, result) => {
                    if (err) {
                        console.log('erro', err);
                        reject(err)
                    } else {
                        resolve(result ? result : null)
                    }
                })
            });
            db.close()
        })
    }
}
