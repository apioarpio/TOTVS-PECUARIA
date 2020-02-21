import Animal from '../../db/models/Animal';

export default (req, res) => {

    const animal = req.body.animal;

    if (animal['idAnimal']) {

        Animal.updateAnimal(animal)

    }

}
