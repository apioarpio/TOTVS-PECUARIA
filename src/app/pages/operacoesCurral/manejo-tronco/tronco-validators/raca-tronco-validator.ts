import {FiltroTronco} from "../../components/modal-filtros-tronco/modal-filtros-tronco.component";
import {AbstractControl, ValidatorFn} from "@angular/forms";

export function racaTroncoValidator(filtroTronco: FiltroTronco): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {

    let arrError: Array<string> = [];

    if (filtroTronco.raca) {
      if (filtroTronco.raca !== control.value) {
        arrError.push(`O animal da raça informada não pertence a raça ${filtroTronco.racaDesc}, Favor Verificar o Filtro.`)
      }
    }

    return arrError.length ? {pecError: arrError} : null;
  }

}
