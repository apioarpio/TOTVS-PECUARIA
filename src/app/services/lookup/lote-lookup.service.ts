import {Injectable} from '@angular/core';
import {PoLookupFilter, PoLookupFilteredItemsParams, PoLookupResponseApi} from "@portinari/portinari-ui";
import {Observable} from "rxjs";
import {LoteService} from "../models/lote.service";

@Injectable({
  providedIn: 'root'
})
export class LoteLookupService implements PoLookupFilter {

  constructor(private loteService: LoteService) {
  }

  getFilteredItems(params: PoLookupFilteredItemsParams): Observable<PoLookupResponseApi> {
    return this.loteService.getAllLotesSubscribe()
  }

  getObjectByValue(value: string, filterParams?: any): Observable<any> {
    return this.loteService.getLoteLocalByIdSubscribe(value)
  }

}
