import {Injectable} from '@angular/core';
import {TiposMovimentoService} from "../../pages/sincronismo/services/tipos-movimento.service";
import {PoLookupFilter, PoLookupFilteredItemsParams} from "@portinari/portinari-ui";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TiposMovimentoEntradaLookupService implements PoLookupFilter {


  constructor(
    private tiposMovimentoService: TiposMovimentoService
  ) {
  }

  getFilteredItems(params: PoLookupFilteredItemsParams): Observable<any> {
    const tipo = params.filterParams['tipoTm'];
    let tipoFiltro;
    console.log(tipo);
    switch (tipo) {
      case 1:
        tipoFiltro = 'entrada';
        break;
      case 2:
        tipoFiltro = 'interno';
        break;
      case 3:
        tipoFiltro = 'saida';
        break;
      default:
        tipoFiltro = null;
        break;
    }
    console.log(tipoFiltro)
    return this.tiposMovimentoService.getTMsLocalByTipo(tipoFiltro);
  }

  getObjectByValue(value: string, filterParams?: any): Observable<any> {
    return this.tiposMovimentoService.getTMById(value);
  }
}
