import TMDb from '../../db/models/TiposMovimento';

export default (req, res) => {

    let tm = req.body.TM;
    console.log('createTM : inicio da requisição')
    if (tm) {

        tm = {
            $CODIGO: tm.codigo,
            $DESCRICAO: tm.descricao,
            $TIPO: tm.tipo,
            $CDCERT: tm.cdcert,
            $STATUS: tm.status,
            $BRELET: tm.brelet,
            $IDTFSB: tm.idtfsb,
            $PESANI: tm.pesani,
            $TRASAN: tm.trasan,
            $VCLOTE: tm.vclote,
            $VCAREA: tm.vcarea,
            $TPSAID: tm.tpsaid,
            $TPENTR: tm.tpentr,
            $DATASYNC: new Date().toLocaleString()
        };
        console.log(tm);
        TMDb.createTM(tm)
            .then(result => {
                console.log('tipo de movimentacao criado');
                res.status(200).json({
                    resposta: 'Registro criado com sucesso'
                })
            })
            .catch(err => {
                res.status(500).json({
                    resposta: 'Não foi possível criar o registro.',
                    err: err
                })
            })
    } else {
        res.status(400).json({mensagem: 'Tipo de movimentacao não informado'})
    }

}
