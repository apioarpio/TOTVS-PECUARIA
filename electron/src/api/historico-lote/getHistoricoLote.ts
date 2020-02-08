import HistoricoLote from '../../db/models/HistoricoLote';

export default (req, res) => {

  const idAnimal = req.params.idAnimal;

  if (idAnimal) {

    HistoricoLote.getHistoricoLote(idAnimal)
      .then(result => {
        if (Array.isArray(result)) {
          res.status(200).json(result.length > 1 ? {items: result} : result);
        } else {
          res.status(200).json('Nenhum registro encontrado');
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })

  } else {
    res.status(400).json('Animal não informado')
  }

}
