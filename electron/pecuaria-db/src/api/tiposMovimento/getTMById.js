import TMDb from '../../db/models/TiposMovimento'

export default (req, res) => {

    let codTM = req.params.id;
    console.log(codTM)

    if (codTM) {

        TMDb.getTM(codTM)
            .then(result => {
                res.status(200).json({
                    tm: result
                })
            })
            .catch(err => {
                console.log('err', err);
                res.status(500).json({
                    err: err
                })
            })
    } else {
        res.status(400).json({
            mensagem: 'Código do tipo de operacoesCurral não informado'
        })
    }

}
