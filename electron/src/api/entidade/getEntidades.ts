import entidadeModel from '../../db/models/Entidade';

export default async (req, res) => {

    console.log(req.query);
    const tipo = req.query.tipo;
    try {
        if (req.query.indice || req.query.limite) {
            const limite = req.query.limite ? req.query.limite : null;

            console.log(`limite ${limite}`);
            const entidades = await entidadeModel.getEntidadesPaginado(req.query.indice, limite, tipo);
            res.status(200).send({items: entidades});
        } else {
            const entidades = await entidadeModel.getEntidades(tipo);
            let arrEntidades = [];

            // @ts-ignore
          for (let entidade of entidades) {
                arrEntidades.push({
                    idEntidade: entidade['id_entidade'],
                    nome: entidade['nome'],
                    tipo: entidade['tipo'],
                    uf: entidade['uf'],
                    codMunicipio: entidade['cod_municipio'],
                    idSisbov: entidade['id_sisbov'],
                    inscricaoEstadual: entidade['insest'],
                    cnpj: entidade['cnpj'],
                    sif: entidade['sif'],
                    idFornecedor: entidade['id_fornecedor']
                })
            }
            res.status(200).send({items: arrEntidades});
        }
    } catch (e) {
        throw new Error(e)
    }


}
