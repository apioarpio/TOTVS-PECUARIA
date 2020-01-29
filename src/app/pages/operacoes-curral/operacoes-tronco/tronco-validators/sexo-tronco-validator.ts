import {AbstractControl, ValidatorFn} from "@angular/forms";
import {FiltroTronco} from "../../components/modal-filtros-tronco/modal-filtros-tronco.component";

export function sexoTroncoValidator(filtronTronco: FiltroTronco): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {

    let errorArray = [];

    if (filtronTronco.sexo) {
      if (filtronTronco.sexo !== control.value) {
        errorArray.push("O Sexo informado não é permitido pelo filtro selecionado.")
      }
    }

    return errorArray.length ? {pecError: errorArray} : null;
  }

}
