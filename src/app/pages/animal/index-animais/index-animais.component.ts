import {Component, OnInit} from '@angular/core';
import {AnimaisService} from "../../../services/models/animais.service";

@Component({
  selector: 'app-index-animais',
  templateUrl: './index-animais.component.html',
  styleUrls: ['./index-animais.component.scss']
})
export class IndexAnimaisComponent implements OnInit {

  constructor(
    private animaisService: AnimaisService
  ) {
  }

  ngOnInit() {
  }

  sync() {
    this.animaisService.syncAnimais();
  }

}
