import {Injectable} from '@angular/core';
import {PoLookupFilter, PoLookupFilteredItemsParams, PoLookupResponseApi} from "@portinari/portinari-ui";
import {Observable} from "rxjs";
import {AreaService} from "../models/area.service";

@Injectable({
  providedIn: 'root'
})
export class AreaLookupService implements PoLookupFilter {

  constructor(private areaService: AreaService) {
  }

  getFilteredItems(params: PoLookupFilteredItemsParams): Observable<PoLookupResponseApi> {
    return this.areaService.getAreaLocal(1)
  }

  getObjectByValue(value: string, filterParams?: any): Observable<any> {
    return this.areaService.getAreaLocalById(value, 1)
  }

}
