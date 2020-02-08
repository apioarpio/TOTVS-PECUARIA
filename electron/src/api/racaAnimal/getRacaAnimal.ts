import RacaAnimalDAO from '../../db/models/RacaAnimal';

export default (req, res) => {

  const fields = req.query.fields;
  const idRacaAnimal = req.params.id

  RacaAnimalDAO.getRacasAnimal(idRacaAnimal, fields)
    .then(result => {
      res.status(200).json({items: result})
    })
    .catch(err => {
      res.status(500).json({mensagem: 'Não foi possível consultar.'})
    })

}
