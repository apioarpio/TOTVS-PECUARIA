import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {PoModalAction, PoModalComponent, PoSelectOption} from "@portinari/portinari-ui";
import {RacaAnimalLookupFilterService} from "../../../../services/lookup/raca-animal-lookup-filter.service";
import {FaixaEtariaLookupFilterService} from "../../../../services/lookup/faixa-etaria-lookup-filter.service";

@Component({
  selector: 'pec-modal-filtros-tronco',
  templateUrl: './modal-filtros-tronco.component.html',
  styleUrls: ['./modal-filtros-tronco.component.scss']
})
export class ModalFiltrosTroncoComponent implements OnInit, OnChanges {

  @Output() filtrosTroncoEvent: EventEmitter<FiltroTronco> = new EventEmitter();
  @Input() filtroTroncoInput: FiltroTronco;
  @ViewChild(PoModalComponent, {static: true}) poModal: PoModalComponent;
  confirm: PoModalAction = {
    action: () => {
      this.aplicarFiltro()
    },
    label: 'Aplicar'
  };

  filtroTroncoValues: FiltroTronco = new FiltroTronco();

  sexoOptions: Array<PoSelectOption> = [{label: 'Macho', value: '1'}, {label: 'Fêmea', value: '2'}];
  simNaoOptions: Array<PoSelectOption> = [{label: 'Sim', value: '1'}, {label: 'Não', value: '2'}];
  aparteOptions: Array<PoSelectOption> = [
    {label: 'Aparte 1', value: '1'},
    {label: 'Aparte 2', value: '2'},
    {label: 'Aparte 3', value: '3'},
    {label: 'Aparte 4', value: '4'}
  ];

  //Lookup columns
  readonly racaAnimalLookupColumns = [
    {property: 'id', label: 'Código'},
    {property: 'descricao', label: 'Descrição'},
    {property: 'codigoReduzido', label: 'Código Reduzido'}
  ];
  readonly faixaEtariaLookupColumns = [
    {property: 'id', label: 'Código'},
    {property: 'descricao', label: 'Descrição'}
  ];

  //variáveis de focus

  constructor(
    public racaAnimalLookupFilterService: RacaAnimalLookupFilterService,
    public faixaEtariaLookupFilterService: FaixaEtariaLookupFilterService
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  open() {
    console.log(this.filtroTroncoInput);
    console.log(this.filtroTroncoValues);
    if (this.filtroTroncoInput) {

      this.filtroTroncoValues.sexo = this.filtroTroncoInput.sexo;
      this.filtroTroncoValues.raca = this.filtroTroncoInput.raca;
      this.filtroTroncoValues.racaDesc = this.filtroTroncoInput.racaDesc;
      this.filtroTroncoValues.validaLibAbate = this.filtroTroncoInput.validaLibAbate;
      this.filtroTroncoValues.faixaEtariaDesc = this.filtroTroncoInput.faixaEtariaDesc;
      this.filtroTroncoValues.faixaEtaria = this.filtroTroncoInput.faixaEtaria;
      this.filtroTroncoValues.validaCarenciaSanitaria = this.filtroTroncoInput.validaCarenciaSanitaria;
      this.filtroTroncoValues.pesoAnimalAte = this.filtroTroncoInput.pesoAnimalAte;
      this.filtroTroncoValues.pesoAnimalDe = this.filtroTroncoInput.pesoAnimalDe;
      this.filtroTroncoValues.aparte = this.filtroTroncoInput.aparte;
      this.filtroTroncoValues.cotaHilton = this.filtroTroncoInput.cotaHilton;

    } else {

      this.filtroTroncoValues = new FiltroTronco();

    }

    this.poModal.open();

  }

  aplicarFiltro() {

    let returnFiltro: FiltroTronco = new FiltroTronco();
    returnFiltro.sexo = this.filtroTroncoValues.sexo;
    returnFiltro.raca = this.filtroTroncoValues.raca;
    returnFiltro.racaDesc = this.filtroTroncoValues.racaDesc;
    returnFiltro.validaLibAbate = this.filtroTroncoValues.validaLibAbate;
    returnFiltro.faixaEtariaDesc = this.filtroTroncoValues.faixaEtariaDesc;
    returnFiltro.faixaEtaria = this.filtroTroncoValues.faixaEtaria;
    returnFiltro.validaCarenciaSanitaria = this.filtroTroncoValues.validaCarenciaSanitaria;
    returnFiltro.pesoAnimalAte = this.filtroTroncoValues.pesoAnimalAte;
    returnFiltro.pesoAnimalDe = this.filtroTroncoValues.pesoAnimalDe;
    returnFiltro.aparte = this.filtroTroncoValues.aparte;
    returnFiltro.cotaHilton = this.filtroTroncoValues.cotaHilton;

    this.filtrosTroncoEvent.emit(returnFiltro);
    this.poModal.close();
  }

  selectRacaLookup(raca) {
    console.log(raca);
    this.filtroTroncoValues.racaDesc = raca.descricao;
  }

  selectFaixaEtariaLookup(faixaEtaria) {
    console.log(faixaEtaria);
    this.filtroTroncoValues.faixaEtariaDesc = faixaEtaria.descricao;
  }

  //Key Events

  keyupEnterSisbov() {

  }

  //change events
  onPesoChange(field) {
    console.log(field);
    console.log(field);
    console.log(this.filtroTroncoValues.pesoAnimalDe);
    console.log(this.filtroTroncoValues.pesoAnimalAte);
  }
}

export class FiltroTronco {

  sexo: number;
  raca: number;
  racaDesc: string;
  faixaEtaria: number;
  faixaEtariaDesc: string;
  validaLibAbate: number;
  validaCarenciaSanitaria: number;
  cotaHilton: number;
  pesoAnimalDe: number;
  pesoAnimalAte: number;
  aparte: number;

  constructor() {

  }

}
