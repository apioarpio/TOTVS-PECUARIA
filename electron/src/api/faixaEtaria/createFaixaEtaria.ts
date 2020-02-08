import FaixaEtariaPersistence from '../../db/models/FaixaEtaria';

export default (req, res) => {

    const faixaEtaria = req.body.faixaEtaria;
    if (faixaEtaria) {
        FaixaEtariaPersistence.create(faixaEtaria)
            .then(result => {
                res.status(201).json({
                    mensagem: 'Registro Criado com Sucesso.'
                })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({erro: err, mensagem: 'Não foi possível incluir a faixa etária.'})
            })
    } else {
        res.status(500).json({mensagem: 'Faixa Etária não informada no corpo da requisição.'})
    }
}
