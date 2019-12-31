import {Injectable} from '@angular/core';
import {ServerService} from "../utils/server.service";
import {PoLookupFilter, PoLookupFilteredItemsParams} from "@portinari/portinari-ui";
import {Observable} from "rxjs";
import {FaixaEtariaService} from "../cadastros/faixa-etaria.service";

@Injectable({
  providedIn: 'root'
})
export class FaixaEtariaLookupFilterService implements PoLookupFilter {

  constructor(
    private serverService: ServerService,
    private faixaEtariaService: FaixaEtariaService
  ) {
  }

  getFilteredItems(params: PoLookupFilteredItemsParams): Observable<any> {
    return this.faixaEtariaService.getFaixaEtariaLocal()
  }

  getObjectByValue(value: string, filterParams?: any): Observable<any> {
    console.log(value);
    console.log(filterParams);
    return this.faixaEtariaService.getFaixaEtariaByIdLocal(value)
  }

}
