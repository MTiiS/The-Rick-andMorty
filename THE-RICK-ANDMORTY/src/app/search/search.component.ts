import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input() searchIsOpen: boolean = false;
  @Output() onSearch = new EventEmitter<object>();

  genders = ['male', 'female', 'genderless', 'unknown'];
  statuses = ['alive', 'dead', 'unknown'];
  request = { name: "", gender: "", status: "" };

  sendRequest(e: any) {
    e.preventDefault();
    this.onSearch.emit(this.request);
  }

  clear() {
    this.request = { name: "", gender: "", status: "" }
  }
}
