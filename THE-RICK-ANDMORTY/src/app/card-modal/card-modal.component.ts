import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from './modal.service';


@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  display: any;
  character: any = {};

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.display = this.modalService.watch();
    this.modalService.watch().subscribe((val) => {
      this.character = val;
    });
  }
  
  close() {
    this.modalService.close();
  }

}
