import SolicitacaoBrinco from '../../db/models/SolicitacaoBrinco';

export default (req, res) => {

    const solicitacaoBrinco = req.body.solicitacaoBrinco;
    console.log(solicitacaoBrinco)
    if (solicitacaoBrinco) {

        let result = SolicitacaoBrinco.create(solicitacaoBrinco)
            .then(result =>{
                res.status(201).json(
                    {
                        response: 'Solicitação de Brinco criada com sucesso'
                    }
                )
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({erro: err})
            });

    } else {
        res.status(500).json()
    }

}
