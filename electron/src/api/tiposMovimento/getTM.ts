import TMDb from '../../db/models/TiposMovimento';

export default (req, res) => {

  let codTM = req.query.codTM;
  let fields = req.query.fields;
  let tiposTm = req.query.tiposTm;


  if (tiposTm) {
    TMDb.getTMsByTipo(tiposTm)
      .then(result => {
        if (Array.isArray(result)) {
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
        } else {
          res.status(200).json()
        }
      })
      .catch(err => {
        res.status(200).json(err);
      })
  } else {
    TMDb.getTM(codTM, fields,'')
      .then(result => {
        if(Array.isArray(result)) {
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
        }else{
          res.status(200).json()
        }
      })
      .catch(err => {
        res.status(200).json(err);
      })
  }
}
