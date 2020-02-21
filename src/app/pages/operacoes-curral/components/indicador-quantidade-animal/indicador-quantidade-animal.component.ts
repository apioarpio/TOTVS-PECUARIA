import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AnimaisService} from "../../../../services/models/animais.service";

@Component({
  selector: 'pec-indicador-quantidade-animal',
  templateUrl: './indicador-quantidade-animal.component.html',
  styleUrls: ['./indicador-quantidade-animal.component.scss']
})
/**
 * @description Componente responsável por exibir a quantidade de animais da fazenda atual.
 * também há a possibilidade de navegar para a lista dos animais.
 */
export class IndicadorQuantidadeAnimalComponent implements OnInit {

  quantidadeAnimais: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private animalService: AnimaisService
  ) {
  }

  ngOnInit() {
    this.getIndicadores()
  }

  navigateAnimal() {
    this.router.navigate(['../animal'], {relativeTo: this.route});
  }

  getIndicadores() {
    this.animalService.getIndicadoresAnimais()
      .subscribe(value => {
        this.quantidadeAnimais = value['quantidadeAnimais']
      })
  }

}
