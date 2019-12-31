import RacaAnimalDAO from '../../db/models/RacaAnimal';

export default (req, res) => {

    const fields = req.query.fields;
    const idRacaAnimal = req.params.id

    RacaAnimalDAO.getRacasAnimal(idRacaAnimal, fields)
        .then(result => {
            let resposta;
            if (result.length > 1) {
                resposta = {items: result}
            } else {
                resposta = result[0]
            }
            console.log(resposta);
            res.status(200).json(resposta)
        })
        .catch(err => {
            res.status(500).json({mensagem: 'Não foi possível consultar.'})
        })

}
