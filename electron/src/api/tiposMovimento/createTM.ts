import TMDb from '../../db/models/TiposMovimento';

export default (req, res) => {

    let tm = req.body.TM;
    console.log('createTM : inicio da requisição');
    console.log(tm)
    if (tm) {
        TMDb.createTM(tm)
            .then(result => {
                console.log('tipo de operacoes-curral criado');
                res.status(200).json({
                    resposta: 'Registro criado com sucesso'
                })
            })
            .catch(err => {
                res.status(500).json({
                    resposta: 'Não foi possível criar o registro.',
                    err: err
                })
            })
    } else {
        res.status(400).json({mensagem: 'Tipo de operacoes-curral não informado'})
    }

}
