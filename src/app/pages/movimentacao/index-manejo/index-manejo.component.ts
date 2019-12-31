import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {PoButtonGroupItem} from "@portinari/portinari-ui";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-index-manejo',
  templateUrl: './index-manejo.component.html',
  styleUrls: ['./index-manejo.component.scss']
})
export class IndexManejoComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit() {
    console.log(this.location.path());
    console.log(this.location.getState());
    this.router.navigate(['./manejoHome'], {relativeTo: this.route})
  }
}
