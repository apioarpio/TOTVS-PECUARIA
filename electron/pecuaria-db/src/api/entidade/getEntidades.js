import entidadeModel from '../../db/models/entidade';

export default async (req, res) => {

  console.log(req.query);
  try{
    if (req.query.indice || req.query.limite) {

      const limite = req.query.limite ? req.query.limite : null;
      console.log(`limite ${limite}`);

      const entidades = await entidadeModel.getEntidadesPaginado(req.query.indice, limite);

      res.status(200).send({entidades: entidades});

    } else {
      const entidades = await entidadeModel.getEntidades();
      res.status(200).send(entidades);
    }
  }catch (e) {
    throw new Error(e)
  }


}
