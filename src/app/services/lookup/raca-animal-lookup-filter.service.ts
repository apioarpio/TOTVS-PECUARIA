import {Injectable} from '@angular/core';
import {PoLookupFilter, PoLookupFilteredItemsParams, PoLookupResponseApi} from "@portinari/portinari-ui";
import {Observable} from "rxjs";
import {RacaAnimalService} from "../cadastros/raca-animal.service";

@Injectable({
  providedIn: 'root'
})
export class RacaAnimalLookupFilterService implements PoLookupFilter {

  constructor(private racaAnimalService: RacaAnimalService) {
  }

  getFilteredItems(params: PoLookupFilteredItemsParams): Observable<any> {
    console.log('filtered items');
    console.table(params);
    return this.racaAnimalService.getRacaAnimalLocal();
  }

  getObjectByValue(value: string, filterParams?: any): Observable<any> {
    console.log('get object by value', value, filterParams);
    return this.racaAnimalService.getRacaAnimalLocalById(value);

  }
}
