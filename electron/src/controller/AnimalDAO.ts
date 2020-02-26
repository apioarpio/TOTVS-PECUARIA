import {Animal} from '../models/Animal';
import {DatabaseFactory} from '../db/config/DatabaseFactory';
import * as moment from 'moment';


export class AnimalDAO {

  constructor() {

  }

  /**
   * @description Cria um animal na base local.
   * antes da criação do animal, é verificado se o mesmo já existe na base, caso existir, é realizado um update nas informações do animal.
   * esse update é realizado apenas se a data de atualização do animal for maior do que a existente na base.
   * @param fazenda fazenda em que será inserido o animal
   */
  public createAnimal(animal: Animal): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const animalLocal: Animal = await this.getAnimalBySisbov(animal.sisbov, animal.codFazenda);
        if (animalLocal) { // verifica se o animal já existe
          if (moment(animal.dataAtualizacaoAnimal) >= moment(animalLocal.dataAtualizacaoAnimal)) {
            console.log(moment(animal.dataAtualizacaoAnimal));
            console.log(moment(animalLocal.dataAtualizacaoAnimal));
            console.log('animal atualizado');
          }
        } else {
          this.insertAnimal(animal)
            .then((idAnimal) => {
              animal.id = idAnimal;
              resolve(animal);
            })
            .catch(reason => {
              reject(reason);
            });
        }
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  public updateAnimal(animal: Animal): Promise<Animal> {
    return new Promise((resolve, reject) => {

    });
  }

  /**
   * @description busca o animal na base local.
   */
  public getAnimalBySisbov(sisbov: number, fazenda: number): Promise<Animal> {
    return new Promise((resolve, reject) => {
      const databaseFactory = new DatabaseFactory();
      const db = databaseFactory.createDatabase(); // busca a instancia do banco
      db.parallelize(() => {
        db.get(`SELECT * FROM ANIMAL WHERE sisbov = ${sisbov} AND codigo_fazenda = ${fazenda}`,
          (err, result) => {
            if (err) {
              console.log('Erro ao consultar o animal pelo sisbov : ', err);
              reject(err);
            } else {
              resolve(result);
            }
          });
      });
      // fecha a conexão
      db.close();
    });
  }

  private insertAnimal(animal: Animal): Promise<number> {
    return new Promise((resolve, reject) => {
      const databaseFactory = new DatabaseFactory();
      const db = databaseFactory.createDatabase();
      db.parallelize(() => {

        const stmt = db.prepare('INSERT INTO ANIMAL VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
        console.log(animal.sisbov);
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
          animal.cadastro,
          animal.dataAtualizacaoAnimal,
          animal.fazendaOrigem,
          animal.certificadora,
          animal.dataCertificadora,
          animal.controleTransferencia,
          null, // deletado
          new Date().toLocaleString() // data Sincronização
          , function(err) {
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(this.lastID);
          });
        stmt.finalize();
      });
      db.close();
    });
  }

}
