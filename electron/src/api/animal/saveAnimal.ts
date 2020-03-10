import {AnimalDAO} from "../../controller/AnimalDAO";
import {Animal} from "../../models/Animal";

export default async (req, res) => {
  try {
    if (req.body.animais) {

      const animais = req.body.animais;
      const animaisInseridos: Array<Promise<any>> = [];

      for (let animal of animais) {
        console.log('Inserindo Animal');
        let animalDAO: AnimalDAO = new AnimalDAO();
        let newAnimal: Animal = new Animal();

        newAnimal.sisbov = animal.sisbov;
        newAnimal.manejo = animal.manejo;
        newAnimal.raca = animal.raca;
        newAnimal.sexo = animal.sexo;
        newAnimal.dataNascimento = animal.dataNascimento;
        newAnimal.dataIncSisbov = animal.dataIncSisbov;
        newAnimal.codFaixaEtaria = animal.codFaixaEtaria;
        newAnimal.peso = animal.peso;
        newAnimal.dataPesagem = animal.dataPesagem;
        newAnimal.codFazenda = animal.codFazenda;
        newAnimal.codFornecedor = animal.codFornecedor;
        newAnimal.numeroSolSisbov = animal.numeroSolSisbov;
        newAnimal.dataEntrada = animal.dataEntrada;
        newAnimal.movimentoOrigem = animal.movimentoOrigem;
        newAnimal.rfid = animal.rfid;
        newAnimal.lote = animal.lote;
        newAnimal.area = animal.area;
        newAnimal.dataLibAbateCertificadora = animal.dataLibAbateCertificadora;
        newAnimal.dataAbate = animal.dataAbate;
        newAnimal.dataLibAbateSanitario = animal.dataLibAbateSanitario;
        newAnimal.dataApontamentoMorte = animal.dataApontamentoMorte;
        newAnimal.controleWebservice = animal.controleWebservice;
        newAnimal.status = animal.status;
        newAnimal.dataLimiteCotaHilton = animal.dataLimiteCotaHilton;
        newAnimal.cadastro = animal.cadastro;
        newAnimal.dataAtualizacaoAnimal = animal.dataAtualizacaoAnimal;
        newAnimal.fazendaOrigem = animal.fazendaOrigem;
        newAnimal.certificadora = animal.certificadora;
        newAnimal.dataCertificadora = animal.dataCertificadora;
        newAnimal.controleTransferencia = animal.controleTransferencia;
        newAnimal.certificadora = animal.certificadora;

        animaisInseridos.push(animalDAO.createAnimal(animal));

      }
      Promise.all(animaisInseridos)
        .then(value => {
          res.status(201).json({message: 'Animais criados com sucesso', response: value})
        })
        .catch(reason => {
          res.status(400).json({message: reason});
        })
    } else {
      res.status(400).json({message: 'nenhum animal foi informado'});
    }
  } catch (e) {
    console.log('erro', e);
    res.status(500).json({message: 'Erro ao Salvar a entidade', erro: e})
  }
}
