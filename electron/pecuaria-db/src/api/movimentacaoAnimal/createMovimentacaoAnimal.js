import MovimentacaoAnimal from '../../db/models/movimentacaoAnimal';
import historicoPeso from "../../db/models/historicoPeso";

export default (req, res) => {

    const idMovimentacao = req.body.idMovimentacao;
    const idAnimal = req.body.idAnimal;
    const aparte = req.body.aparte;
    const peso = req.body.peso;
    const dataCadastro = new Date().toLocaleString();

    if (idMovimentacao && idAnimal && aparte && peso) {
        console.log('criando movimentacao x animal');
        MovimentacaoAnimal.create(idMovimentacao, idAnimal, aparte, peso)
            .then(result => {
                historicoPeso.create(idAnimal, peso, dataCadastro);
                res.status(201).json(result);
            })
            .catch(err => {
                res.status(400).json({
                    cod: err.cod,
                    message: err.mensagem,
                    erro: err.erro
                });
            })
    } else {
        res.status(500).json({
            cod: 0,
            mensagem: 'Parametros não informado',
            erro: null
        })
    }
}
