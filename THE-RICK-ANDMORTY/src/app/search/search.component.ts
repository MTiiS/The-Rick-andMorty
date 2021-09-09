import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input() searchIsOpen: boolean = false;
  @Output() onSearch = new EventEmitter<FormData>();

  generateRequest(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    this.onSearch.emit(formData);
  }
}
