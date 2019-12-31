import RacaAnimalDAO from '../../db/models/RacaAnimal';

export default (req, res) => {
    const racaAnimal = req.body['racaAnimal'];
    if (racaAnimal) {
        RacaAnimalDAO.create(racaAnimal)
            .then(result => {
                res.status(200).json({
                    mensagem: 'Registro Incluído com sucesso.'
                })
            })
            .catch(err => {
                res.status(400).json({
                    mensagem: 'não foi posível incluir o registro.',
                    erro: err
                })
            });
    } else {
        res.status(500).json({
            mensagem: 'Raca não informada.'
        })
    }
}
