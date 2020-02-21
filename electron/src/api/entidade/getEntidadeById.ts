import EntidadeDao from '../../db/models/Entidade';

export default (req, res) => {
    const idEntidade = req.params.id;
    EntidadeDao.getEntidadeById(idEntidade)
        .then(result => {
            res.status(200).json({
                idEntidade: result['id_entidade'],
                nome: result['nome'],
                tipo: result['tipo'],
                uf: result['uf'],
                codMunicipio: result['cod_municipio'],
                idSisbov: result['id_sisbov'],
                insest: result['insest'],
                cnpj: result['cnpj'],
                idFornecedor: result['id_fornecedor'],
                sif: result['sif'],
                dataSincronizacao: result['dataSincronizacao']
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
}
