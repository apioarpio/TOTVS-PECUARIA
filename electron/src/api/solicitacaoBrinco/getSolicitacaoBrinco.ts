import SolicitacaoBrinco from '../../db/models/SolicitacaoBrinco';

export default (req, res) => {

  const idFazenda = req.query.idFazenda;

  if (idFazenda) {

    SolicitacaoBrinco.get(idFazenda)
      .then(result => {
        res.status(200).json({items: result})
      })
      .catch(err => {
        res.status(500).json(err)
      })
  } else {
    res.status(500).json({mensagem: 'fazenda não informada'})
  }

}
