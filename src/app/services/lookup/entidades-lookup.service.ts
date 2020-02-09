import {Injectable} from '@angular/core';
import {PoLookupFilter, PoLookupFilteredItemsParams, PoLookupResponseApi} from "@portinari/portinari-ui";
import {Observable} from "rxjs";
import {EntidadeService} from "../models/entidade.service";

@Injectable({
  providedIn: 'root'
})
export class EntidadesLookupService implements PoLookupFilter {

  constructor(
    private entidadeService: EntidadeService
  ) {
  }

  getFilteredItems(params: PoLookupFilteredItemsParams): Observable<PoLookupResponseApi> {
    const tipo = params.filterParams['tipo'];
    console.log(tipo);
    return this.entidadeService.getEntidadesByTipo(tipo);
  }

  getObjectByValue(value: string, filterParams?: any): Observable<any> {
    return this.entidadeService.getEntidadeById(value)
  }

}
