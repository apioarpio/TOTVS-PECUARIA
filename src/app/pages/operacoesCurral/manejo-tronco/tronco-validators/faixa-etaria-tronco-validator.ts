import {AbstractControl, ValidatorFn} from "@angular/forms";
import {FiltroTronco} from "../../components/modal-filtros-tronco/modal-filtros-tronco.component";
import {Animal} from "../../../../model/animal";
import {FaixaEtaria} from "../../../../model/faixa-etaria";

export function faixaEtariaTroncoValidator(filtroTronco: FiltroTronco, animal: Animal, faixasEtarias: Array<FaixaEtaria>): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {

    console.log(filtroTronco.faixaEtaria);
    let arrError = [];
    if (filtroTronco.faixaEtaria) {
      for (let fx of faixasEtarias) {
        if (animal.idadeMeses >= fx.inicio && animal.idadeMeses <= fx.fim) {
          if (fx.id !== filtroTronco.faixaEtaria) {
            arrError.push('O animal não está na Faixa Etária permitida pelo filtro')
          }
        }
      }
    }
    return arrError.length ? {pecError: arrError} : null;
  }

}
