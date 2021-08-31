import { Component } from '@angular/core';
import { SortService } from './sort.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent {

  constructor(private sortService: SortService) { }

  ngOnInit(): void {
  }

  addSortEvent(e: any) {
    this.sortService.toogleSort();
    e.target.classList.toggle("filter__button_reverse");
  }
}
