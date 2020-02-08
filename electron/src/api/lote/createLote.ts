import Lote from '../../db/models/Lote'

export default (req, res) => {

    const lote = req.body.lote;

    console.log('lote', lote);

    if (lote) {

        Lote.create(lote)
            .then(result => {
                res.status(200).json({response: 'Lote criado com sucesso'})
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })

    } else {
        res.status(500).json({response: 'Lote não informado'})
    }

}
