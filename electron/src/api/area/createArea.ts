import Area from '../../db/models/Area';

export default (req, res) => {

    const area = req.body.area;

    if (area) {
        Area.create(area)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    } else {
        res.status(500).json({erro: 'Area não informada'})
    }

}
