import {FiltroTronco} from "../../components/modal-filtros-tronco/modal-filtros-tronco.component";
import {AbstractControl, ValidatorFn} from "@angular/forms";

export function aparteTroncoValidator(filtroTronco: FiltroTronco): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {

    let arrErros = [];

    if (filtroTronco.aparte) {
      if (control.value !== filtroTronco.aparte) {
        arrErros.push(`O aparte não pode ser diferente de ${filtroTronco.aparte}. Favor Verificar o filtro.`)
      }
    }

    return arrErros.length ? {pecError: arrErros} : null;
  }

}
