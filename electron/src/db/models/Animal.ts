import database from '../config/database';

export default {
    createAnimal(animal) {
        return new Promise((resolve, reject) => {
            const db = database();
            db.serialize(() => {

                let stmt = db.prepare('INSERT INTO ANIMAL VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
                console.log(animal.sisbov);
                stmt.run(
                    null,
                    animal.sisbov,
                    animal.manejo,
                    animal.raca,
                    animal.sexo,
                    animal.dataNascimento,
                    animal.dataIncSisbov,
                    animal.codFAixaEtaria,
                    animal.peso,
                    animal.dataPesagem,
                    animal.codFazenda,
                    animal.codFornecedor,
                    animal.numeroSolSisbov,
                    animal.dataEntrada,
                    animal.movimentoOrigem,
                    animal.rfid,
                    animal.lote,
                    animal.pasto,
                    animal.dataLibAbateCertificadora,
                    animal.dataAbate,
                    animal.dataLibAbateSanitario,
                    animal.dataApontamentoMorte,
                    animal.controleWebservice,
                    animal.status,
                    animal.dataLimiteCotaHilton,
                    animal.cadastro,
                    animal.dataAtualizacaoAnimal,
                    animal.fazendaOrigem,
                    animal.certificadora,
                    animal.dataCertificadora,
                    animal.controleTransferencia,
                    null,
                    new Date().toLocaleString()
                    , function (err) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        resolve(this.lastID);
                    });
                stmt.finalize();
            });
            db.close();
        })
    },
    getAnimalBySisbov(sisbov) {
        return new Promise((resolve, reject) => {
            const db = database();
            db.serialize(() => {
                db.get(
                    `SELECT 
                        ANIMAL.*, 
                        RA.*, 
                        HP.peso peso_historico,
                        HP.data_pesagem historico_data_pesagem
                    FROM animal 
                        INNER JOIN raca_animal RA ON ANIMAL.raca = RA.id_raca_animal 
                        LEFT JOIN historico_peso HP ON HP.id_animal = ANIMAL.id_animal 
                    WHERE ANIMAL.SISBOV = ${sisbov}`
                    , (err, result) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            let animal;
                            //adiciona ao array de animais, o objeto animal compativel com o padrão do JSON de requisição
                            if (result) {
                                animal = {
                                    idAnimal: result['id_animal'],
                                    sisbov: result['sisbov'],
                                    manejo: result['manejo'],
                                    raca: {
                                        id: result['raca'],
                                        descricao: result['descricao']
                                    },
                                    sexo: result['sexo'],
                                    dataNascimento: result['data_nascimento'],
                                    dataIncSisbov: result['data_inclusao_sisbov'],
                                    codFaixaEtaria: result['codigo_faixa_etaria'],
                                    historicoPeso: result['peso_historico'] ? {
                                        peso: result['peso_historico'],
                                        dataPesagem: result['historico_data_pesagem']
                                    } : null,
                                    dataPesagem: result['data_pesagem'],
                                    codFazenda: result['codigo_fazenda'],
                                    codFornecedor: result['codigo_fornecedor'],
                                    numeroSolSisbov: result['numero_solicitacao_sisbov'],
                                    dataEntrada: result['data_entrada'],
                                    movimentoOrigem: result['movimento_origem'],
                                    rfid: result['rfid'],
                                    lote: result['lote'],
                                    pasto: result['area'],
                                    dataLibAbateCertificadora: result['data_lib_abate_certificadora'],
                                    dataAbate: result['data_abate'],
                                    dataLibAbateSanitario: result['data_lib_abate_sanitario'],
                                    dataApontamentoMorte: result['data_apontamento_morte'],
                                    controleWebservice: result['controle_webservice'],
                                    status: result['status'],
                                    dataLimiteCotaHilton: result['data_limite_cota_hilton'],
                                    cadastro: result['cadastro'],
                                    dataAtualizacaoAnimal: result['data_atualizacao_animal'],
                                    fazendaOrigem: result['fazenda_origem'],
                                    certificadora: result['certificadora'],
                                    dataCertificadora: result['data_certificadora'],
                                    controleTransferencia: result['controle_transferencia'],
                                    dataSync: result['data_sync']
                                };
                                resolve(animal)
                            } else {
                                resolve(null)
                            }
                        }

                    });
            });
            db.close();
        })
    },
    getAnimais(rowId, records, idFazenda) {
        return new Promise((resolve, reject) => {

            let queryPaginate = "";

            if (!records) {
                records = 10;
            }

            const queryMaxRecords = `LIMIT ${records}`;

            if (rowId) {
                queryPaginate += `WHERE ANIMAL.ROWID < ${rowId}`
            }

            console.log(queryMaxRecords);
            console.log(queryPaginate);

            const db = database();
            console.log(`
                    SELECT 
                        *
                     FROM ANIMAL  
                     INNER JOIN raca_animal RA ON ANIMAL.raca = RA.id_raca_animal
                     ${queryPaginate}
                     ORDER BY ANIMAL.ROWID DESC ${queryMaxRecords}
                `);
            db.all(`
                    SELECT 
                        *
                     FROM ANIMAL
                     INNER JOIN raca_animal RA ON ANIMAL.raca = RA.id_raca_animal
                     ${queryPaginate} 
                     ORDER BY ANIMAL.ROWID DESC ${queryMaxRecords}
                `, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err)
                }
                let arrAnimais = [];
                for (let animal of result) {
                    //adiciona ao array de animais, o objeto animal compativel com o padrão do JSON de requisição
                    arrAnimais.push({
                        idAnimal: animal['id_animal'],
                        sisbov: animal['sisbov'],
                        manejo: animal['manejo'],
                        raca: {
                            id: animal['raca'],
                            descricao: animal['descricao']
                        },
                        sexo: animal['sexo'],
                        dataNascimento: animal['data_nascimento'],
                        dataIncSisbov: animal['data_inclusao_sisbov'],
                        codFaixaEtaria: animal['codigo_faixa_etaria'],
                        peso: animal['peso'],
                        dataPesagem: animal['data_pesagem'],
                        codFazenda: animal['codigo_fazenda'],
                        codFornecedor: animal['codigo_fornecedor'],
                        numeroSolSisbov: animal['numero_solicitacao_sisbov'],
                        dataEntrada: animal['data_entrada'],
                        movimentoOrigem: animal['movimento_origem'],
                        rfid: animal['rfid'],
                        lote: animal['lote'],
                        pasto: animal['pasto'],
                        dataLibAbateCertificadora: animal['data_lib_abate_certificadora'],
                        dataAbate: animal['data_abate'],
                        dataLibAbateSanitario: animal['data_lib_abate_sanitario'],
                        dataApontamentoMorte: animal['data_apontamento_morte'],
                        controleWebservice: animal['controle_webservice'],
                        status: animal['status'],
                        dataLimiteCotaHilton: animal['data_limite_cota_hilton'],
                        cadastro: animal['cadastro'],
                        dataAtualizacaoAnimal: animal['data_atualizacao_animal'],
                        fazendaOrigem: animal['fazenda_origem'],
                        certificadora: animal['certificadora'],
                        dataCertificadora: animal['data_certificadora'],
                        controleTransferencia: animal['controle_transferencia'],
                        dataSync: animal['data_sync']
                    })
                }
                resolve(arrAnimais);
            })

        })
    },
    updateAnimal(animal) {
        return new Promise(async (resolve, reject) => {
            let updateFields = '';

            //busca o animal atual, para comparar os valores a serem atualizados.
            let currentAnimal = await this.getAnimalBySisbov(animal.sisbov);

            updateFields += animal['peso'] ? ` peso = '${animal.peso}'` : '';
            updateFields += animal['lote'] ? ` lote = '${animal.lote}'` : '';
            updateFields += animal['area'] ? ` area = '${animal.area}'` : '';
            updateFields += animal['codigoFazenda'] ? ` codigo_fornecedor = '${animal.codigoFazenda}'` : '';
            updateFields += animal['area'] ? ` area = '${animal.area}'` : '';
            updateFields += animal['rfid'] ? ` rfid = '${animal.rfid}'` : '';
            updateFields += animal['status'] ? ` status = '${animal.status}'` : '';
            updateFields += animal['deletado'] ? ` deletado = '${animal.deletado}'` : '';

            if (updateFields) {
                const db = database();
                db.serialize(() => {
                    db.run(``, err => {
                        err ? reject(err) : resolve('Animal atualizado com sucesso.')
                    })
                });
                db.close();
            }
        })
    },
    quantidadeAnimaisFazenda(idFazenda) {
        return new Promise((resolve, reject) => {
            const db = database();
            try {
                db.serialize(() => {
                    db.get(`
                        SELECT COUNT(*) as animais FROM animal WHERE codigo_fazenda = ${idFazenda} 
                    `, (err, row) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(row['animais'])
                        }
                    })
                });
                db.close();
            } catch (e) {
                db.close();
                reject(null)
            }

        })
    }
}
