import SisbovChip from '../../db/models/SisbovChip';

export default (req, res) => {

    const idFazenda = req.query.idFazenda;

    if (idFazenda) {
        SisbovChip.get(idFazenda)
            .then(result => {
                res.status(200).json(result.length > 1 ? {items: result} : result);
            })
            .catch(err => {
                res.status(500).json({erro: err})
            })
    } else {
        res.status(400).json({mensagem: 'Fazenda não informada.'})
    }

}
