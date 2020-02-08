import AreaDao from '../../db/models/Area'

export default (req, res) => {

    const idArea = req.params.idArea;
    const idFazenda = req.query.idFazenda;

    if (idFazenda && idArea) {
        AreaDao.getById(idArea, idFazenda)
            .then(result => {
                res.status(200).json({
                    idArea: result['id_area'],
                    idFazenda: result['id_fazenda'],
                    nome: result['nome'],
                    tamanhoHectares: result['tamanho_hectares'],
                    quantidadeAnimais: result['quantidade_animais'],
                    status: result['status'],
                    caracteristicas: result['caracteristicas'],
                    tipo: result['tipo']
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    } else {
        res.status(400).json('parâmetros não informados.')
    }

}
