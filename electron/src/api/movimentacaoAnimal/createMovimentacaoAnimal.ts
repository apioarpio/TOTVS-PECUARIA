import MovimentacaoAnimal from '../../db/models/movimentacaoAnimal';
import AnimalDao from '../../db/models/animal';
import HistoricoPeso from "../../db/models/historicoPeso";
import HistoricoArea from '../../db/models/HistoricoArea'
import HistoricoLote from '../../db/models/HistoricoLote'

export default async (req, res) => {

  const movimentacaoAnimal = req.body.movimentacaoAnimal;
  if (movimentacaoAnimal) {
    if (movimentacaoAnimal.hasOwnProperty('animal.ts') && movimentacaoAnimal.hasOwnProperty('movimentacao.ts')) {
      try {
        let idAnimal = movimentacaoAnimal.animal['idAnimal'];
        const existeAnimal = await AnimalDao.getAnimalBySisbov(movimentacaoAnimal.animal['sisbov']);
        if (movimentacaoAnimal.movimentacao.tipoMovimentacao === 1 && typeof existeAnimal === "object") {
          let responseCreateAnimal = await AnimalDao.createAnimal({
            sisbov: movimentacaoAnimal.animal.sisbov,
            dataNascimento: movimentacaoAnimal.animal.dataNascimento,
            raca: movimentacaoAnimal.animal.raca,
            sexo: movimentacaoAnimal.animal.sexo,
            peso: movimentacaoAnimal.animal.peso,
            area: movimentacaoAnimal['areaAtual'] ? movimentacaoAnimal['areaAtual'] : null,
            lote: movimentacaoAnimal['loteAtual'] ? movimentacaoAnimal['loteAtual'] : null
          });
          idAnimal = responseCreateAnimal;
          movimentacaoAnimal.animal['idAnimal'] = idAnimal;
        }
        //verifica se o animal a ser registrado já foi adicionado a esta movimentação.
        const animalMovimento = await MovimentacaoAnimal.getAnimaisMovimento(movimentacaoAnimal.movimentacao['idMovimentacao'], idAnimal);
        //rejeita a inserção por já haver um animal cadastrado nessa operacoes-curral{
        if (animalMovimento > 0) {
          res.status(500).json({cod: 1, mensagem: 'SISBOV já incluso na movimentação', erro: null});
        } else {
          //cria o histórico para o peso inserido
          const hp = await HistoricoPeso.create({
            idAnimal: idAnimal,
            idMovimentacao: movimentacaoAnimal.movimentacao['idMovimentacao'],
            tipoMovimentacao: movimentacaoAnimal.movimentacao['tipoMovimentacao'],
            peso: movimentacaoAnimal.animal['peso'],
            integrado: movimentacaoAnimal['integrado']
          });
          //se a área for informada, cria o histórico
          if (movimentacaoAnimal['areaAtual']) {
            console.log('Existe Area', movimentacaoAnimal['areaAtual']);
            await HistoricoArea.create({
              idAnimal: idAnimal,
              idArea: movimentacaoAnimal['areaAtual'],
              idMovimentacaoAnimal: movimentacaoAnimal.movimentacao['idMovimentacao'],
              areaOrigem: movimentacaoAnimal.animal['area'],
              integrado: 'false',
              deletado: false,
              dataIntegracao: ''
            });
          }
          //se a lote for informada, cria o histórico
          if (movimentacaoAnimal['loteAtual']) {
            console.log('Existe lote', movimentacaoAnimal['loteAtual']);
            await HistoricoLote.create({
              animal: idAnimal,
              lote: movimentacaoAnimal['loteAtual'],
              movimentacaoAnimal: movimentacaoAnimal.movimentacao['idMovimentacao'],
              loteOrigem: movimentacaoAnimal.animal['lote'],
              integrado: false,
              dataIntegracao: null
            });
          }
          await MovimentacaoAnimal.create(movimentacaoAnimal.movimentacao, movimentacaoAnimal.animal, hp['idHistorico']);
          res.status(201).json({
            mensagem: 'Animal adicionado à movimentação com sucesso.'
          })
        }
      } catch (e) {
        console.log(e);
        res.status(400).json({
          cod: e.cod,
          message: e.mensagem,
          erro: e.erro
        });
      }
    } else {
      res.status(500).json({
        cod: 0,
        mensagem: 'Parametros não informado',
        erro: null
      })
    }
  } else {
    res.status(500).json({
      cod: 0,
      mensagem: 'Parametros não informado',
      erro: null
    })
  }
}
