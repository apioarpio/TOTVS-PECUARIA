import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  hideMenu:EventEmitter<boolean> = new EventEmitter();

  constructor() { }
}
