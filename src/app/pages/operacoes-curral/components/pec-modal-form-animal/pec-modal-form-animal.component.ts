import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PecAnimaisTable} from "../../model/pec-animais-table";
import {PoModalAction, PoModalComponent, PoSelectOption} from "@portinari/portinari-ui";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'pec-modal-form-animal',
  templateUrl: './pec-modal-form-animal.component.html',
  styleUrls: ['./pec-modal-form-animal.component.scss']
})
export class PecModalFormAnimalComponent implements OnInit {
  @Input() buttonLabel: string;
  @Input() buttonType: string;
  @Input() buttonIcon: string;
  @Input() disableButton: boolean;

  @Output() private pecAnimalEmitter: EventEmitter<PecAnimaisTable> = new EventEmitter<PecAnimaisTable>();
  @ViewChild(PoModalComponent, {static: true}) poModal: PoModalComponent;

  private isEditing: boolean = false;

  pecAnimal: PecAnimaisTable;
  sexoOptions: Array<PoSelectOption> = [
    {label: "Macho", value: "M"},
    {label: "Fêmea", value: "F"}
  ];
  animalForm = new FormGroup({
    sisBov: new FormControl('', [Validators.required]),
    peso: new FormControl('', [Validators.required, Validators.maxLength(4)]),
    sexo: new FormControl('', [Validators.required]),
    raca: new FormControl('', [Validators.required]),
    aparte: new FormControl('', [Validators.required]),
    idade: new FormControl('', [Validators.required, Validators.maxLength(2)]),
    faixaEtaria: new FormControl('', [Validators.required]),
  });
  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Fechar',
    danger: true
  };
  confirm: PoModalAction = {
    action: () => {
      this.saveAnimal();
    },
    disabled: !this.animalForm.valid,
    label: 'Salvar'
  };

  constructor() {
    //verifica as modificações no formulário
    this.animalForm.statusChanges.subscribe(result => {
      if (result === "VALID") {
        this.confirm.disabled = !this.animalForm.valid //habilita o botão de salvar do modal, caso esteja válido
      } else {
        this.confirm.disabled = !this.animalForm.valid //desabilita o botão de salvar do modal
      }
    });
  }

  ngOnInit() {

    console.log(this.poModal);
    this.poModal.onXClosed.subscribe(() => {
      this.onModalClose()
    })

  }

  /**
   * @description envia o animal inserido para o componente requisitante
   */
  saveAnimal() {
    if (this.isEditing) {
      this.pecAnimal.sisBov = this.animalForm.value.sisBov;
      this.pecAnimal.sexo = this.animalForm.value.sexo;
      this.pecAnimal.peso = this.animalForm.value.peso;
      this.pecAnimal.raca = this.animalForm.value.raca;
      this.pecAnimal.aparte = this.animalForm.value.aparte;
      this.pecAnimal.idade = this.animalForm.value.idade;
      this.pecAnimal.faixaEtaria = this.animalForm.value.faixaEtaria;
    } else {
      this.pecAnimalEmitter.emit(this.animalForm.value); //emite o evento com o animal inserido
    }

    this.onModalClose();
    this.poModal.close(); //fecha o modal
  }

  /**
   * @description
   */
  closeModal() {
    this.onModalClose();
    this.poModal.close();
  }

  openModal() {
    this.animalForm.reset();
    this.pecAnimal = new PecAnimaisTable();
    this.poModal.open()
  }

  openEditModal(animal: PecAnimaisTable) {
    this.isEditing = true;
    this.pecAnimal = animal;
    this.animalForm.patchValue({
      sisBov: animal.sisBov,
      sexo: animal.sexo,
      peso: animal.peso,
      raca: animal.raca,
      aparte: animal.aparte,
      idade: animal.idade,
      faixaEtaria: animal.faixaEtaria
    });
    this.poModal.open();
  }

  onModalClose() {
    this.isEditing = false;
    this.pecAnimal = null;
  }

}
