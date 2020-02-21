import contextoPersistence from '../../db/models/Contexto';

export default (req, res) => {
    const codFazenda = req.body.codFazenda;

    console.log('requisição');
    console.log(codFazenda);


    //TODO a função está permitido a inclusão da mesma fazenda em contextos iguais
    if (codFazenda) {
        contextoPersistence.addFazendaContexto(codFazenda)
            .then(result => {
                res.status(200).json({cod: 1, mensagem: `Fazenda ${codFazenda} Adicionada com sucesso.`})
            })
            .catch(err => {
                if (err.codErro === 2) {
                    res.status(400).json({
                        codErro: 3,
                        mensagem: 'Nenhum contexto foi inserido para a estação de trabalho atual'
                    })
                } else if (err.codErro === 3) {
                    res.status(400).json({
                        codErro: 1,
                        mensagem: 'Fazenda Já cadastrada para a estação de trabalho atual.'
                    })
                } else {
                    res.status(400).json({codErro: 1, mensagem: 'Erro no Processamento do webservice'})
                }
            })
    } else {
        res.status(500).json({codErro: 2, mensagem: 'codigo da fazenda não informado'})
    }
}
