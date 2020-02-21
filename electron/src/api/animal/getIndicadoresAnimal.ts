import Animal from "../../db/models/Animal";
import Contexto from "../../db/models/Contexto";


export default async (req, res) => {
    try {
        console.log('busca contexto')
        const contexto = await Contexto.getContexto();
        const quantidadeAnimais = await Animal.quantidadeAnimaisFazenda(contexto['codFazendaAtual']);
        res.status(200).json({
            quantidadeAnimais: quantidadeAnimais
        })
    } catch (e) {
        res.status(500).json({error: e})
    }
}
