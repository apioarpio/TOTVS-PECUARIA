import {Component, OnInit} from '@angular/core';
import {PoButtonGroupItem, PoChartType, PoPieChartSeries} from "@portinari/portinari-ui";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-manejo-home',
  templateUrl: './operacoes-curral-home.component.html',
  styleUrls: ['./manejo-home.component.scss']
})
export class OperacoesCurralHomeComponent implements OnInit {
  botoesManejo: Array<PoButtonGroupItem> = [
    {label: 'Entrada', action: this.goManejoEntrada},
    {label: 'Saída', action: this.goManejoSaida},
    {label: 'Movimentação Interna', action: this.goManejoMovInterna},
  ];

  // @ts-ignore
  coffeConsumingChartType: PoChartType = PoChartType.Donut;

  coffeeConsumption: Array<PoPieChartSeries> = [
    {category: 'Finland', value: 9.6, tooltip: 'Finland (Europe)'},
    {category: 'Norway', value: 7.2, tooltip: 'Norway (Europe)'},
    {category: 'Netherlands', value: 6.7, tooltip: 'Netherlands (Europe)'},
    {category: 'Slovenia', value: 6.1, tooltip: 'Slovenia (Europe)'},
    {category: 'Austria', value: 5.5, tooltip: 'Austria (Europe)'}
  ];

  coffeeProduction: Array<PoPieChartSeries> = [
    {category: 'Brazil', value: 2796, tooltip: 'Brazil (South America)'},
    {category: 'Vietnam', value: 1076, tooltip: 'Vietnam (Asia)'},
    {category: 'Colombia', value: 688, tooltip: 'Colombia (South America)'},
    {category: 'Indonesia', value: 682, tooltip: 'Indonesia (Asia/Oceania)'},
    {category: 'Peru', value: 273, tooltip: 'Peru (South America)'}
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit() {
  }

  backRoute() {
    // this.location.back();
    this.router.navigate(['/home/info'])
  }

  goManejoEntrada() {
    this.router.navigate(['../manejoEntradaList'], {relativeTo: this.route});
  }

  goManejoSaida() {
    this.router.navigate([`../manejoSaida`], {relativeTo: this.route})
  }

  goManejoMovInterna() {
    this.router.navigate([`../manejoMovimentacaoInterna`], {relativeTo: this.route})
  }

}
