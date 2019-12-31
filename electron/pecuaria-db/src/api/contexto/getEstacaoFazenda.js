import contextoPersistence from '../../db/models/contexto'

export default (req, res) => {

    const fazenda = req.query.codFazenda;

    contextoPersistence.getFazendasContexto(fazenda)
        .then(result => {
                if (result) {
                    res.status(200).json({
                        contexto: result.contexto
                    });
                } else {
                    res.stat(200).json()
                }
            }
        )
        .catch(err => {
            res.status(400).json({codErro: 1, mensagem: "Erro ao processar o webservice", erro: err});
        })

}
