import contextoPersistence from '../../db/models/contexto';

export default (req, res) => {
    const codFazenda = req.body.codFazenda;

    if (codFazenda) {
        contextoPersistence.addFazendaContexto(codFazenda)
            .catch()
            .then(err => {
                
            })
    } else {
        req.status(500).json({codErro: 2, mensagem: 'codigo da fazenda não informado'})
    }
}
