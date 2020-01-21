import animalDAO from '../../db/models/animal';

export default (req, res) => {

    try {
        let sisbov = req.params.id;
        if (sisbov) {
            animalDAO.getAnimalBySisbov(sisbov).then((result) => {
                console.log(result);
                res.status(201).json(result)
            })
        } else {
            req.status(400).json()
        }
    } catch (e) {
        res.status(500).json()
    }
}
