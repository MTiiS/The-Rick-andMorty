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
  reset = { name: '', status: '', gender: '' };

  sendRequest(request: any) {
    this.onSearch.emit(request);
  }
}
