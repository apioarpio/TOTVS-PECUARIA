import {Animal} from "../models/Animal";
import {DatabaseFactory} from "../db/config/DatabaseFactory";
import * as moment from 'moment';
import 'moment/locale/pt-br';
import historicoPesoDAO from "../db/models/historicoPeso";
import database from "../db/config/database";

moment.updateLocale('pt-BR');

export class AnimalDAO {

  constructor() {
  }

  /**
   * @description Cria um animal na base local.
   * antes da criação do animal, é verificado se o mesmo já existe na base, caso existir, é realizado um update nas informações do animal.
   * esse update é realizado apenas se a data de atualização do animal for maior do que a existente na base.
   * @param animal
   * @param fazenda fazenda em que será inserido o animal
   */
  public createAnimal(animal: Animal): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const animalLocal: Animal = await this.getAnimalBySisbov(animal.sisbov, animal.codFazenda);
        if (animalLocal) { //verifica se o animal já existe

          if ((animal.dataAtualizacaoAnimal && animalLocal.dataAtualizacaoAnimal) && (moment(animal.dataAtualizacaoAnimal, "YYYYMMDD") >= moment(animalLocal.dataAtualizacaoAnimal, "YYYYMMDD"))) {
            await this.sincronizacaoUpdateAnimal(animal);
            console.log('animal atualizado');
          }
          resolve();
        } else {
          animal.id = await this.insertAnimal(animal);
          if (animal.dataPesagem && animal.peso) {
            let hp = await historicoPesoDAO.create({
              idAnimal: animal.id,
              idMovimentacao: null,
              tipoMovimentacao: null,
              peso: animal.peso,
              dataPesagem: animal.dataPesagem,
              integrado: false,
            });
          }
          resolve(animal);
        }
      } catch (e) {
        console.log(e);
        reject(e);
      }
    })
  }

  /**
   * @description atualiza o animal com os dados da sincronização
   */
  public sincronizacaoUpdateAnimal(animal: Animal): Promise<Animal> {
    return new Promise((resolve, reject) => {
      const db = database();
      try {
        db.parallelize(() => {
          db.run(`
              UPDATE animal
              SET
                raca = ${animal.raca},
                sexo = ${animal.sexo},
                data_inclusao_sisbov = ${animal.dataIncSisbov},
                codigo_faixa_etaria = ${animal.codFaixaEtaria},
                peso = ${animal.peso},
                data_pesage = ${animal.dataPesagem},
                codigo_fornecedor = ${animal.codFornecedor},
                numero_solicitacao_sisbov = ${animal.numeroSolSisbov},
                data_entrada = ${animal.dataEntrada},
                movimento_origem = ${animal.movimentoOrigem},
                rfid = ${animal.rfid},
                lote = ${animal.lote},
                area = ${animal.area},
                data_lib_abate_certificadora = ${animal.dataLibAbateCertificadora},
                data_abate = ${animal.dataAbate},
                data_lib_abate_sanitario = ${animal.dataLibAbateSanitario},
                data_apontamento_morte = ${animal.dataApontamentoMorte},
                controle_webservice = ${animal.controleWebservice},
                status = ${animal.status},
                data_limite_cota_hilton = ${animal.dataLimiteCotaHilton},
                data_cadastro = ${animal.cadastro},
                data_atualizacao_animal = ${animal.dataAtualizacaoAnimal},
                fazenda_origem = ${animal.fazendaOrigem},
                certificadora = ${animal.certificadora},
                data_certificadora = ${animal.dataCertificadora},
                controle_transferencia = ${animal.controleWebservice},
                deletado = ${animal.deletado}
              WHERE sisbov = ${animal.sisbov}
            `, err => {
            if (err) {
              reject(err)
            } else {
              resolve()
            }
          })
        });
        db.close();
      } catch (e) {
        db.close();
        console.log(e);
        reject(e);
      }
    })
  }

  /**
   * @description busca o animal na base local.
   * @param sisbov
   * @param fazenda
   */
  public getAnimalBySisbov(sisbov: number, fazenda: number): Promise<Animal> {
    return new Promise((resolve, reject) => {
      if (sisbov && fazenda) {
        let databaseFactory = new DatabaseFactory();
        let db = databaseFactory.createDatabase(); // busca a instancia do banco
        db.parallelize(() => {
          db.get(`SELECT * FROM ANIMAL WHERE sisbov = ${sisbov} AND codigo_fazenda = ${fazenda}`,
            (err, result) => {
              if (err) {
                console.log('Erro ao consultar o animal pelo sisbov : ', err);
                reject(err)
              } else if (result) {
                let animalRetorno = new Animal();

                animalRetorno.id = result.hasOwnProperty('id_animal') ? result.sisbov : '';
                animalRetorno.sisbov = result.hasOwnProperty('sisbov') ? result.sisbov : '';
                animalRetorno.manejo = result.hasOwnProperty('manejo') ? result.sisbov : '';
                animalRetorno.raca = result.hasOwnProperty('raca') ? result.sisbov : '';
                animalRetorno.sexo = result.hasOwnProperty('sexo') ? result.sisbov : '';
                animalRetorno.dataNascimento = result.hasOwnProperty('data_nascimento') ? result.sisbov : '';
                animalRetorno.dataIncSisbov = result.hasOwnProperty('data_inclusao_sisbov') ? result.sisbov : '';
                animalRetorno.codFaixaEtaria = result.hasOwnProperty('codigo_faixa_etaria') ? result.sisbov : '';
                animalRetorno.peso = result.hasOwnProperty('peso') ? result.sisbov : '';
                animalRetorno.dataPesagem = result.hasOwnProperty('data_pesagem') ? result.sisbov : '';
                animalRetorno.codFazenda = result.hasOwnProperty('codigo_fazenda') ? result.sisbov : '';
                animalRetorno.codFornecedor = result.hasOwnProperty('codigo_fornecedor') ? result.sisbov : '';
                animalRetorno.numeroSolSisbov = result.hasOwnProperty('numero_solicitacao_sisbov') ? result.sisbov : '';
                animalRetorno.dataEntrada = result.hasOwnProperty('data_entrada') ? result.sisbov : '';
                animalRetorno.movimentoOrigem = result.hasOwnProperty('movimento_origem') ? result.sisbov : '';
                animalRetorno.rfid = result.hasOwnProperty('rfid') ? result.sisbov : '';
                animalRetorno.lote = result.hasOwnProperty('lote') ? result.sisbov : '';
                animalRetorno.area = result.hasOwnProperty('area') ? result.sisbov : '';
                animalRetorno.dataLibAbateCertificadora = result.hasOwnProperty('data_lib_abate_certificadora') ? result.sisbov : '';
                animalRetorno.dataAbate = result.hasOwnProperty('data_abate') ? result.sisbov : '';
                animalRetorno.dataLibAbateSanitario = result.hasOwnProperty('data_lib_abate_sanitario') ? result.sisbov : '';
                animalRetorno.dataApontamentoMorte = result.hasOwnProperty('data_apontamento_morte') ? result.sisbov : '';
                animalRetorno.controleWebservice = result.hasOwnProperty('controle_webservice') ? result.sisbov : '';
                animalRetorno.status = result.hasOwnProperty('status') ? result.sisbov : '';
                animalRetorno.dataLimiteCotaHilton = result.hasOwnProperty('data_limite_cota_hilton') ? result.sisbov : '';
                animalRetorno.cadastro = result.hasOwnProperty('data_cadastro') ? result.sisbov : '';
                animalRetorno.dataAtualizacaoAnimal = result.hasOwnProperty('data_atualizacao_animal') ? result.sisbov : '';
                animalRetorno.fazendaOrigem = result.hasOwnProperty('fazenda_origem') ? result.sisbov : '';
                animalRetorno.certificadora = result.hasOwnProperty('certificadora') ? result.sisbov : '';
                animalRetorno.dataCertificadora = result.hasOwnProperty('data_certificadora') ? result.sisbov : '';
                animalRetorno.controleTransferencia = result.hasOwnProperty('controle_transferencia') ? result.sisbov : '';
                animalRetorno.deletado = result.hasOwnProperty('deletado') ? result.sisbov : '';
                animalRetorno.dataSincronizacao = result.hasOwnProperty('data_sincronizacao') ? result.sisbov : '';

                resolve(animalRetorno)
              } else {
                resolve()
              }
            })
        });
        // fecha a conexão
        db.close()
      } else {
        reject("Parâmetros não informados");
      }
    })
  }

  private insertAnimal(animal: Animal): Promise<number> {
    return new Promise((resolve, reject) => {
      let databaseFactory = new DatabaseFactory();
      let db = databaseFactory.createDatabase();
      db.parallelize(() => {
        let stmt = db.prepare('INSERT INTO ANIMAL VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
        stmt.run(
          null,
          animal.sisbov,
          animal.manejo,
          animal.raca,
          animal.sexo,
          animal.dataNascimento,
          animal.dataIncSisbov,
          animal.codFaixaEtaria,
          animal.peso,
          animal.dataPesagem,
          animal.codFazenda,
          animal.codFornecedor,
          animal.numeroSolSisbov,
          animal.dataEntrada,
          animal.movimentoOrigem,
          animal.rfid,
          animal.lote,
          animal.area,
          animal.dataLibAbateCertificadora,
          animal.dataAbate,
          animal.dataLibAbateSanitario,
          animal.dataApontamentoMorte,
          animal.controleWebservice,
          animal.status,
          animal.dataLimiteCotaHilton,
          animal.cadastro ? moment(animal.cadastro, "DD/MM/YYYY h:mm:ss").format("DD/MM/YYYY h:mm:ss") : moment().format("DD/MM/YYYY h:mm:ss"),
          animal.dataAtualizacaoAnimal ? moment(animal.dataAtualizacaoAnimal, "DD/MM/YYYY h:mm:ss").format("DD/MM/YYYY h:mm:ss") : moment().format("DD/MM/YYYY h:mm:ss"),
          animal.fazendaOrigem,
          animal.certificadora,
          animal.dataCertificadora,
          animal.controleTransferencia,
          null,//deletado
          new Date().toLocaleString() //data Sincronização
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
  }

}
