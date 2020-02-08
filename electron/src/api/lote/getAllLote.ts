import Lote from '../../db/models/Lote'

export default (req, res) => {
  const fields = [];
  const params = {
    idFazenda: req.query.idFazenda,
    idArea: req.query.idArea
  };

  Lote.getAll(fields, params)
    .then(result => {
      if (Array.isArray(result)) {
        let lotes = [];
        for (let l of result) {
          lotes.push({
            idLote: l['id_lote'],
            idFazenda: l['id_fazenda'],
            idArea: l['id_area'],
            nome: l['nome'],
            tipo: l['tipo'],
            quantidadeAnimais: l['quantidade_animais'],
            ano: l['ano'],
            mes: l['mes'],
            sexo: l['sexo'],
            observacao: l['observacao'],
          })
        }
        res.status(200).json({items: lotes})
      } else {
        res.status(200).json('Nenhum registro encontrado');
      }
    })
    .catch(err => {
      res.status(500).json({
        erro: err
      })
    })

}
