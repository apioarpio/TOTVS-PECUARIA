import contextoPersistence from '../../db/models/Contexto'

export default (req, res) => {
    contextoPersistence
        .getCodEstacaoAtual()
        .then(result => {
                res.status(200).json(result);
            }
        )
        .catch(err => {
            res.status(400).json({codErro: 1, mensagem: "Erro ao processar o webservice", erro: err});
        })

}
