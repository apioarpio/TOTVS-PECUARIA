import Area from '../../db/models/Area';

export default (req, res) => {

  let fields;
  let params;
  let idFazenda = req.query.idFazenda;

  Area.getAll(idFazenda, params)
    .then(result => {
      if (Array.isArray(result)) {
        let areas = [];
        for (let a of result) {
          areas.push({
            idArea: a['id_area'],
            idFazenda: a['id_fazenda'],
            nome: a['nome'],
            tamanhoHectares: a['tamanho_hectares'],
            quantidadeAnimais: a['quantidade_animais'],
            status: a['status'],
            caracteristicas: a['caracteristicas'],
            tipo: a['tipo']
          })
        }
        res.status(200).json({items: areas});
      } else {
        res.status(200).json('Nenhum registro encontrado');
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}
