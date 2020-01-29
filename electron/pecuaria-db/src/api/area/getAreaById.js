import HistoricoAreaDao from '../../db/models/Area'

export default (req, res) => {

    const idArea = req.params.idArea;
    const idFazenda = req.query.idFazenda;

    if (idFazenda && idArea) {
        HistoricoAreaDao.getHistoricoAreaAnimal()
    }else{
        res.status(400).json('parâmetros não informados.')
    }

}
