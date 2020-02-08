import SisbovChip from '../../db/models/SisbovChip';

export default (req, res) => {

    const sisbovChip = req.body.sisbovChip;

    if (sisbovChip) {

        SisbovChip.create(sisbovChip)
            .then(() => {
                res.status(201).json({mensagem: 'Registro Criado com sucesso'})
            })
            .catch(err => {
                res.status(500).json({mensagem: 'Erro ao criar o registro.', erro: err})
            })

    } else {
        res.status(400).json({mensagem: 'Corpo não informado.'})
    }

}
