import TMDb from '../../db/models/TiposMovimento';

export default (req, res) => {

    let codTM = req.query.codTM;
    let fields = req.query.fields;
    let tiposTm = req.query.tiposTm;


    if (tiposTm === "entrada") {
        TMDb.getTMsEntrada()
            .then(result => {
                let items = [];
                for (let item of result) {
                    items.push({
                        idTm: item['id_tm'],
                        descricao: item['descricao'],
                        tipo: item['tipo'],
                        codigoCertificadora: item['codigo_certificadora'],
                        status: item['status']
                    })
                }

                res.status(200).json({items: items});
            })
            .catch(err => {
                res.status(200).json(err);
            })
    } else {
        TMDb.getTM(codTM, fields)
            .then(result => {
                let items = [];
                for (let item of result) {
                    items.push({
                        idTm: item['id_tm'],
                        descricao: item['descricao'],
                        tipo: item['tipo'],
                        codigoCertificadora: item['codigo_certificadora'],
                        status: item['status']
                    })
                }

                res.status(200).json({items: items});
            })
            .catch(err => {
                res.status(200).json(err);
            })
    }
}
