import entidadeModel from '../../db/models/entidade';

export default async (req, res) => {
  try {
    console.log(req.body);

    const entidades = req.body.entidades;
    console.log(entidades);

    let responseCreate = [];

    if (Array.isArray(entidades)) {

      for (let entidade of entidades) {

        let resCreateEntidade = await entidadeModel.createEntidade(
          entidade.codigo,
          entidade.nome,
          entidade.tipo,
          entidade.uf,
          entidade.codmun,
          entidade.idSisBov,
          entidade.insest,
          entidade.cnpj,
          entidade.codFor,
          entidade.sif
        );
        responseCreate.push(resCreateEntidade);
      }


    } else if (entidades) {

    }

    res.status(200).json({response: responseCreate})
  } catch (e) {
    console.log(e);
    res.status(500).json({message: 'erro ao salvar a entidade', erro: e});

  }
}
