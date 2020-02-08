import TMDb from '../../db/models/TiposMovimento'

export default (req, res) => {

  let codTM = req.params.id;
  console.log(codTM)

  if (codTM) {

    TMDb.getTM(codTM, '', '')
      .then(result => {
        result = result[0];
        res.status(200).json({
          idTm: result['id_tm'],
          descricao: result['descricao'],
          tipo: result['tipo'],
          codigoCertificadora: result['codigo_certificadora'],
          status: result['status'],
          brincoEletronico: result['brinco_eletronico'],
          incluiSisbov: result['inclui_sisbov'],
          pesaAnimal: result['pesa_animal'],
          sanitario: result['sanitario'],
          vinculaLote: result['vincula_lote'],
          vinculaArea: result['vincula_area'],
          tipoSaida: result['tipo_saida'],
          tipoEntrada: result['tipo_entrada'],
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
      mensagem: 'Código do tipo de operacoes-curral não informado'
    })
  }

}
