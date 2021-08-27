import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CharactersService } from '../services/character/characters.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private charactersService: CharactersService) { }

  private display: BehaviorSubject<any> = new BehaviorSubject('close');

  watch(): Observable<object> {
    return this.display;
  }

  open(id: number) {
    let character = this.charactersService.getCharacterById(id);
    this.charactersService.setCharacterEpisodeName(character);
    this.display.next(character);
  }

  close() {
    this.display.next('close');
  }
}
