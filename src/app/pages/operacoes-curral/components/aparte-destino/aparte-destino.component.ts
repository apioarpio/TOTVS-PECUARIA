import {Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoteLookupService} from "../../../../services/lookup/lote-lookup.service";
import {AreaLookupService} from "../../../../services/lookup/area-lookup.service";
import {
  PoModalAction,
  PoModalComponent, PoNotificationService, PoTableAction,
  PoTableColumn,
  PoToasterOrientation,
  PoToasterType
} from "@portinari/portinari-ui";
import {PoStorageService} from "@portinari/portinari-storage";
import {Movimentacao} from "../../../../model/movimentacao";

@Component({
  selector: 'pec-aparte-destino',
  templateUrl: './aparte-destino.component.html',
  styleUrls: ['./aparte-destino.component.scss']
})
export class AparteDestinoComponent implements OnInit, OnChanges {

  @Input('modalControl') modal: EventEmitter<boolean>;
  @Input() movimentacao: Movimentacao;

  @ViewChild(PoModalComponent, {static: true}) poModal: PoModalComponent;

  //Lookup columns
  public readonly loteLookupColumns = [
    {property: 'idLote', label: 'Código'},
    {property: 'nome', label: 'Descrição'}
  ];
  public readonly areaLookupColumns = [
    {property: 'idArea', label: 'Código'},
    {property: 'nome', label: 'Descrição'}
  ];
  public readonly actions: Array<PoTableAction> = [
    {action: this.deleteItem, icon: 'po-icon-delete', label: 'Excluir'},
  ];

  columns: Array<PoTableColumn> = [
    {label: 'Aparte', property: 'aparte'},
    {label: 'Código Área', property: 'codigoArea'},
    {label: 'Área', property: 'area'},
    {label: 'Código Lote', property: 'codigoLote'},
    {label: 'lote', property: 'lote'},
  ];
  items: Array<any>;

  formGroup: FormGroup = new FormGroup({
    'aparte': new FormControl('', [Validators.required]),
    'codigoLote': new FormControl('', [Validators.required]),
    'lote': new FormControl(),
    'codigoArea': new FormControl('', [Validators.required]),
    'area': new FormControl()
  });
  aparte: number = null;
  codigoLote: number = null;
  lote: string = null;
  codigoArea: number = null;
  area: string = null;

  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Close',
    danger: true
  };


  constructor(
    private loteLookupService: LoteLookupService,
    private areaLookupService: AreaLookupService,
    //portinari
    private poStorageService: PoStorageService,
    private poNotification: PoNotificationService
  ) {
  }

  ngOnInit() {
    this.modal.subscribe(abrir => {
      if (abrir) {
        this.updateApartesTable();
        this.poModal.open()
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['movimentacao']);
    console.log(this.movimentacao)
  }

  /**
   * @description adiciona o destino no array, vinculado a movimentacao atual
   * @param event
   */
  async save(event) {
    try {
      //verifica se existe um destino já cadastrado
      let destinos = await this.poStorageService.get(`movimentacao.${this.movimentacao.id}`);
      //verifica se o aparte selecionado já doi cadastrado
      let aparteExistente = await this.poStorageService.getItemByField(`movimentacao.${this.movimentacao.id}`, 'aparte', this.aparte);
      if (aparteExistente) {
        if (Array.isArray(destinos)) {
          destinos.map((e) => {
            if (e['aparte'] === this.aparte) {
              e['aparte'] = this.aparte;
              e['codigoArea'] = this.codigoArea;
              e['area'] = this.area;
              e['codigoLote'] = this.codigoLote;
              e['lote'] = this.lote;
            }
            return e
          });
          await this.poStorageService.set(`movimentacao.${this.movimentacao.id}`, destinos);
        }
        this.updateApartesTable();
        this.formGroup.reset();
      }
      //Verifica se os valores retornados é do tipo Array
      else if (!Array.isArray(destinos)) {
        await this.poStorageService.set(`movimentacao.${this.movimentacao.id}`, [{
          aparte: this.aparte,
          codigoArea: this.codigoArea,
          area: this.area,
          codigoLote: this.codigoLote,
          lote: this.lote
        }]);
        this.updateApartesTable();
        this.formGroup.reset();
      } else {
        await this.poStorageService.appendItemToArray(`movimentacao.${this.movimentacao.id}`, {
          aparte: this.aparte,
          codigoArea: this.codigoArea,
          area: this.area,
          codigoLote: this.codigoLote,
          lote: this.lote
        });
        this.updateApartesTable();
        this.formGroup.reset()
      }
    } catch (e) {
      console.log(e)
    }
  }

  async deleteItem(event) {
    await this.poStorageService.removeItemFromArray(`movimentacao.${this.movimentacao.id}`, 'aparte', event.aparte)
    this.updateApartesTable();
  }

  /**
   * @description atualiza os items da tabela de destino
   */
  updateApartesTable() {
    this.poStorageService.get(`movimentacao.${this.movimentacao.id}`)
      .then(result => {
        if (result) {
          this.items = result
        }
      });
  }

  closeModal() {
    this.poModal.close();
    this.formGroup.reset()
  }

  //====================================== EVENTS ======================================
  /**
   * @description
   * @param area
   */
  onSelectArea(area) {
    this.area = area.nome ? area.nome : null;
  }

  onSelectAreaError(err) {
    console.log(err);
    this.area = ''
  }

  onSelectLote(lote) {
    this.lote = lote.nome ? lote.nome : null;
  }

  onSelectLoteError(err) {
    console.log(err);
    this.lote = ''
  }
}
