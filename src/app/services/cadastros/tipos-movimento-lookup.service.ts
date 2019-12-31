import {Injectable} from '@angular/core';
import {PoLookupFilter, PoLookupFilteredItemsParams, PoLookupResponseApi} from "@portinari/portinari-ui";
import {Observable} from "rxjs";
import {TiposMovimentoService} from "../../pages/sincronismo/services/tipos-movimento.service";

@Injectable({
  providedIn: 'root'
})
export class TiposMovimentoLookupService implements PoLookupFilter {

  constructor(
    private tiposMovimentoService: TiposMovimentoService
  ) {
  }

  getFilteredItems(params: PoLookupFilteredItemsParams): Observable<any> {
    return this.tiposMovimentoService.getTMsLocal();
  }

  getObjectByValue(value: string, filterParams?: any): Observable<any> {
    return undefined;
  }
}
