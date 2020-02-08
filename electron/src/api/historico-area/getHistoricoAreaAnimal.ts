import HistoricoArea from '../../db/models/HistoricoArea';

export default (req, res) => {

  const idAnimal = req.params.idAnimal;

  if (idAnimal) {
    HistoricoArea.getHistoricoAreaAnimal(idAnimal)
      .then(result => {
        let response = [];
        if (Array.isArray(result)) {
          for (let historico of result) {
            response.push({
              idHistoricoArea: historico['id_historico_area'],
              idAnimal: historico['id_animal'],
              sisbov: historico['sisbov'],
              id_area: historico['id_area'],
              fazenda: historico['id_fazenda'],
              descricaoArea: historico['descricao']
            });
          }
          res.status(200).json(response.length > 1 ? {items: response} : result)
        } else {
          res.status(200).json('Nenhum registro encontrado!')
        }
      })
      .catch(err => res.status(500).json({erro: err}))
  } else {
    res.status(400).json('Histórico não informado');
  }

}
