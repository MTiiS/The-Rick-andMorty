import { Component, Input } from '@angular/core';
import { Character } from '../character';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() character?: Character;
}
