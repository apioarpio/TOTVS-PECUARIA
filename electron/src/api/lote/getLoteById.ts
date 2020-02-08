import Lote from '../../db/models/Lote'

export default (req, res) => {

    let idLote = req.params.id;
    let idFazenda = req.query.idFazenda;

    Lote.getById(idLote, idFazenda)
        .then(result => {
            result = result[0];
            res.status(200).json({
                idLote: result['id_lote'],
                idFazenda: result['id_fazenda'],
                idArea: result['id_area'],
                nome: result['nome'],
                tipo: result['tipo'],
                quantidadeAnimais: result['quantidade_animais'],
                ano: result['ano'],
                mes: result['mes'],
                sexo: result['sexo'],
                observacao: result['observacao'],
            })
        })
        .catch(err => {
            res.status(500).json(
                {
                    erro: err
                }
            )
        })
}
