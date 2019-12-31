import database from '../config/database';

export default {
    createAnimal(animal) {
        return new Promise((resolve, reject) => {
            const db = database();
            db.serialize(() => {

                let stmt = db.prepare('INSERT INTO ANIMAL VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
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
                    new Date().toLocaleString()
                    , (err, record) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }

                        resolve(record);

                    });
                stmt.finalize();
            });
            db.close();
        })
    },
    getAnimalBySisbov(sisbov) {
        return new Promise((resolve, reject) => {
            const db = database();
            db.all(`SELECT * FROM animal 
            INNER JOIN raca_animal RA ON ANIMAL.raca = RA.id_raca_animal
            WHERE SISBOV = ${sisbov}`, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
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
                        codFAixaEtaria: animal['codigo_faixa_etaria'],
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

                resolve(arrAnimais)
            });
            db.close();
        })
    },
    getAnimais(rowId, records) {
        return new Promise((resolve, reject) => {

            let queryPaginate = "";

            if (!records) {
                records = 50;
            }

            const queryMaxRecords = `LIMIT ${records}`;

            if (rowId) {
                queryPaginate += `WHERE ANIMAL.ROWID < ${rowId}`
            }

            console.log(queryMaxRecords);
            console.log(queryPaginate);

            const db = database();

            db.all(`
                    SELECT 
                        *
                     FROM ANIMAL ${queryPaginate} 
                     INNER JOIN raca_animal RA ON ANIMAL.raca = RA.id_raca_animal
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
                        codFAixaEtaria: animal['codigo_faixa_etaria'],
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
    }
}
