import MovimentacaoAnimal from '../../db/models/movimentacaoAnimal';
import HistoricoPeso from "../../db/models/historicoPeso";

export default async (req, res) => {

    const movimentacaoAnimal = req.body.movimentacaoAnimal;
    console.log(movimentacaoAnimal)
    if (movimentacaoAnimal) {
        console.log('criando operacoesCurral x animal');
        try {
            console.log(movimentacaoAnimal['idMovimentacao'], movimentacaoAnimal['idAnimal']);
            //verifica se o animal a ser registrado já foi adicionado a esta movimentação.
            const animalMovimento = await MovimentacaoAnimal.getAnimaisMovimento(movimentacaoAnimal['idMovimentacao'], movimentacaoAnimal['idAnimal']);
            console.log(animalMovimento);
            //rejeita a inserção por já haver um animal cadastrado nesse operacoesCurral{
            if (animalMovimento > 0) {
                reject({cod: 1, mensagem: 'SISBOV já incluso na movimentação', erro: null});
            } else {
                //cria o histórico para o peso inserido
                const hp = await HistoricoPeso.create({
                    idAnimal: movimentacaoAnimal['idAnimal'],
                    idMovimentacao: movimentacaoAnimal['idMovimentacao'],
                    tipoMovimentacao: movimentacaoAnimal['tipoMovimentacao'],
                    peso: movimentacaoAnimal['peso'],
                    integrado: movimentacaoAnimal['integrado']
                });
                console.log(hp);
                await MovimentacaoAnimal.create(movimentacaoAnimal, hp.idHistorico);
                res.status(201).json({
                    mensagem: 'Animal adicionado à movimentação com sucesso.'
                })
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({
                cod: e.cod,
                message: e.mensagem,
                erro: e.erro
            });
        }
    } else {
        res.status(500).json({
            cod: 0,
            mensagem: 'Parametros não informado',
            erro: null
        })
    }
}
