import Animal from '../../db/models/animal';

export default (req, res) => {

    const animal = req.body.animal;

    if (animal['idAnimal']) {

        Animal.updateAnimal(animal)

    }

}
