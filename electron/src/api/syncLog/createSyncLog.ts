import syncLogDb from '../../db/models/syncLog';

export default (req, res) => {

    const tabela = req.body.tabela;
    const registrosSalvos = req.body.registrosSalvos;

    if (tabela && registrosSalvos >= 0) {
        syncLogDb.createLog(tabela, registrosSalvos)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                //internal server error
                res.status(500).json({
                    resposta: "Não foi possível incluir o resgistro",
                    erro: err   
                });
            })
    } else {
        //Bad Request - o body não contem os campos necessários
        res.status(400).send();
    }

}
