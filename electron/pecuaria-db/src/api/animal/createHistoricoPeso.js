import HistoricoPeso from '../../db/models/historicoPeso';

export default (req, res) => {

    const historicoPeso = req.body.historicoPeso;

    if (historicoPeso) {

        HistoricoPeso.create(historicoPeso)
            .then(result => {
                res.status(201).json({
                    mensagem: 'Registro Criado com Sucesso.'
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })

    } else {
        res.status(400).json({
            mensagem: 'Histórico do peso não informado.'
        })
    }

}
