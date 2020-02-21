import animalDAO from '../../db/models/Animal';
import historicoPesoDAO from '../../db/models/historicoPeso';

export default async (req, res) => {
    try {
        if (req.body.animais) {
            const animais = req.body.animais;
            const animaisInseridos = [];
            for (let animal of animais) {
                let animalCriado = await animalDAO.createAnimal(animal);
                console.log(animalCriado)
                if (animal.dataPesagem && animal.peso) {
                    console.log('criando Historico');
                    let hp = await historicoPesoDAO.create({
                        idAnimal: animalCriado,
                        idMovimentacao: null,
                        tipoMovimentacao: null,
                        peso: animal.peso,
                        dataPesagem: animal.dataPesagem,
                        integrado: false,
                    });
                }
                animaisInseridos.push(animalCriado);
            }
            res.status(201).json({message: 'registros criados com sucesso', animais: animaisInseridos})
        } else {
            res.status(400).json({message: 'nenhum animal foi informado'});
        }
    } catch (e) {
        console.log('erro', e);
        res.status(500).json({message: 'Erro ao Salvar a entidade', erro: e})
    }
}
