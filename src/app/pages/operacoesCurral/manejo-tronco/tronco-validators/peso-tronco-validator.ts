import {FiltroTronco} from "../../components/modal-filtros-tronco/modal-filtros-tronco.component";
import {AbstractControl, ValidatorFn} from "@angular/forms";

export function pesoValidator(filtroTronco: FiltroTronco): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let arrErrors: Array<string> = [];
    console.log(control);
    if (filtroTronco.pesoAnimalDe || filtroTronco.pesoAnimalAte) {
      if (filtroTronco.pesoAnimalDe) {
        if (control.value < filtroTronco.pesoAnimalDe) {
          arrErrors.push("Valor informado para o peso é menor do que o permitido pelo filtro.")
        }
      }
      if (filtroTronco.pesoAnimalAte) {
        if (control.value > filtroTronco.pesoAnimalAte) {
          arrErrors.push("Valor informado para o peso é maior do que o permitido pelo filtro.")
        }
      }
    }
    return arrErrors.length ? {pecError: arrErrors} : null
  }
}
