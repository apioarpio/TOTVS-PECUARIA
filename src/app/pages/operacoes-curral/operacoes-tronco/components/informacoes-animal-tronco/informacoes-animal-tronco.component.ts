import {Component, Input, OnInit} from '@angular/core';
import {Animal} from "../../../../../model/animal";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'pec-informacoes-animal-tronco',
  templateUrl: './informacoes-animal-tronco.component.html',
  styleUrls: ['./informacoes-animal-tronco.component.scss']
})
export class InformacoesAnimalTroncoComponent implements OnInit {

  @Input() animal: Animal = new Animal();
  @Input('formGroup') troncoFormGroup = new FormGroup({});
  @Input() animalValido: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

}
