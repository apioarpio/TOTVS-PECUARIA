import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appValidPeso]'
})
export class ValidPesoDirective {

  @HostListener('change') hostChange(el) {
    console.log(el);
    console.log(this.el);
    console.log('teste')
  }

  constructor(private el: ElementRef) {
    console.log(el)
  }
}
