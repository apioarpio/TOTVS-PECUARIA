import {Component, OnInit} from '@angular/core';
import {AnimaisService} from "../../../services/models/animais.service";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {PoTableAction, PoTableColumn, PoTableDetail, PoTableSubtitleColumn} from "@portinari/portinari-ui";
import {RacaAnimalService} from "../../../services/models/raca-animal.service";

@Component({
  selector: 'app-index-animais',
  templateUrl: './index-animais.component.html',
  styleUrls: ['./index-animais.component.scss']
})
export class IndexAnimaisComponent implements OnInit {

  actions: Array<PoTableAction> = [
    {icon: 'po-icon-finance', label: 'Apply Discount'},
    {icon: 'po-icon-info', label: 'Details'}
  ];
  columns: Array<PoTableColumn> = [];
  detail: any;
  items: Array<any> = [];
  total: number = 0;
  totalExpanded = 0;
  lastAnimalIndex = null;

  constructor(
    private animaisService: AnimaisService,
    private location: Location,
    private route: ActivatedRoute,
    private racaAnimalService: RacaAnimalService
  ) {
  }

  ngOnInit() {
    this.getColumns().then(result => {
      this.columns = result
    });
    this.getAnimais()
      .then(value => {
        this.items = value;
      })
  }

  backRoute() {
    this.location.back();
  }

  async getColumns(): Promise<Array<PoTableColumn>> {
    const airfareDetail: PoTableDetail = {
      columns: [
        {property: 'package'},
        {property: 'tour'},
        {property: 'time', label: 'Departure time', type: 'time', format: 'HH:mm'},
        {property: 'distance', label: 'Distance (Miles)', type: 'number', format: '1.0-5'}
      ],
      typeHeader: 'top'
    };

    const subtitles = await this.getSubtitles();

    return [
      {
        property: 'abate', type: 'label', width: '100px', labels: [
          {value: '0', color: 'color-08', label: 'Não Liberado'},
          {value: '1', color: 'color-10', label: 'Liberado Abate'},
          {value: '2', color: 'color-11', label: 'Liberado Abate Sanitário'}
        ]
      },
      {property: 'sisbov', width: '100px'},
      {property: 'peso', width: '30px'},
      {property: 'idade', label: 'Idade(Meses)', type: 'number', width: '30px'},
      {
        property: 'sexo', type: 'label', width: '70px', labels: [
          {value: '1', color: 'color-01', label: 'Macho'},
          {value: '2', color: 'color-05', label: 'Fêmea'},
        ]
      },
      {
        property: 'raca', label: 'Raça', type: 'subtitle', width: '80px', subtitles: subtitles
      }
      // {property: 'detail', label: 'Details', type: 'detail', detail: airfareDetail}
    ];
  }

  /**
   * @description Busca as raças do servidor, e retorna um objeto contendo todas as legendas de raças.
   */
  getSubtitles(): Promise<Array<PoTableSubtitleColumn>> {
    return new Promise((resolve, reject) => {
      this.racaAnimalService
        .getRacaAnimalLocal()
        .subscribe(value => {
          let subtitles: Array<PoTableSubtitleColumn> = [];
          let colorCount: number = 1;
          for (let raca of value['items']) {
            subtitles.push({
              value: raca['id'],
              color: colorCount < 10 ? `color-0${colorCount}` : `color-${colorCount}`,
              label: raca['descricao'],
              content: raca['codigoReduzido']
            });
            colorCount++
          }
          console.log(subtitles);
          resolve(subtitles)
        })
    })
  }

  getAnimais(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.animaisService
        .getAnimaisLocal()
        .subscribe(value => {
          let animais = [];
          for (let animal of value['animais']) {
            animais.push(
              {
                abate: '0',
                sisbov: animal['sisbov'],
                peso: animal['peso'],
                idade: 500,
                sexo: `${animal['sexo']}`,
                raca: animal['raca']['id']
              }
            )
          }
          resolve(animais);
        })
    })
  }

}
