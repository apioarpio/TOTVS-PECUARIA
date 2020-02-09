import {Injectable} from '@angular/core';
import {PoStorageService} from "@portinari/portinari-storage";

@Injectable({
  providedIn: 'root'
})
export class AparteDestinoService {

  constructor(
    private poStorage: PoStorageService
  ) {
  }

  saveDestino() {
    return new Promise((resolve, reject) => {
      this.poStorage.set('aparteDestino', [{id: 1, nome: 'teste1'}, {id: 2, nome: 'teste2'}])
        .then(() => {
        })
        .catch(err => {
          console.log(err)
        });
    })
  }

  getDestinoByAparte(idAparte) {
    this.poStorage.getItemByField('aparteDestino', 'nome', 'teste2')
      .then(result => {
        console.log(result)
      });
  }

}
