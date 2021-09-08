import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ModalService } from "./modal.service";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
    @Input() character: any;
    @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();

    constructor(private modalService: ModalService) {}

    ngOnInit() {}

    close() {
      this.modalService.removeDynamicComponent();
    }
}