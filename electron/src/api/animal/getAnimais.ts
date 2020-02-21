import animalDAO from '../../db/models/Animal';
import Contexto from "../../db/models/Contexto";

/**
 * TODO UPGRADE: melhorar a forma como a paginação é realizada
 * @param req
 * @param res
 */
export default async (req, res) => {

  const recordId = req.query.recordId ? req.query.recordId : "";
  const limit = req.query.limit ? req.query.limit : "";
  const contexto = await Contexto.getContexto();

  animalDAO.getAnimais(recordId, limit, contexto['codFazendaAtual'])
    .then(result => {
      if (Array.isArray(result)) {
        const arrayReduced = result.map((a) => {
          return a.id
        });
        //busca o ultimo indice
        let ultimoIndice = arrayReduced.reduce((a, b) => {
          return Math.min(a, b)
        });
        res.status(200).json({
          ultimoIndice: ultimoIndice,
          animais: result
        });
      } else {
        res.status(200).json('nenhum registro encontrado');
      }
    })
    .catch(e => {
      res.status(500).json(e);
    });

}
