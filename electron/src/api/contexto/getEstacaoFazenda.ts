import contextoPersistence from '../../db/models/contexto'

export default (req, res) => {

    const fazenda = req.query.codFazenda;

    contextoPersistence
        .getFazendasContexto(fazenda)
        .then(result => {
                res.status(200).json(result);
            }
        )
        .catch(err => {
            res.status(400).json({codErro: 1, mensagem: "Erro ao processar o webservice", erro: err});
        })

}
