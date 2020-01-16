import {FiltroTronco} from "../../components/modal-filtros-tronco/modal-filtros-tronco.component";
import {Animal} from "../../../../model/animal";
import {AbstractControl} from "@angular/forms";

export function liberadoAbateTroncoValidator(filtroTronco: FiltroTronco, animal: Animal) {

  return (control: AbstractControl): { [key: string]: any } | null => {

    let arrErrors = [];

    if (filtroTronco.validaLibAbate) {
      if (animal.sisbov) {
        if (!animal.dataLibAbateCertificadora) {
          arrErrors.push('O Animal não foi liberado para abate!. Verificar o filtro do tronco.')
        }
      }
    }

    return arrErrors.length ? {pecError: arrErrors} : null;

  }

}
