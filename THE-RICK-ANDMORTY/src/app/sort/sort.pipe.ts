import { Pipe, PipeTransform } from '@angular/core';
import { Character } from 'src/app/services/character.interface';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(characters: Array<Character>, property: string, isReverse: boolean = false): Array<Character> {

    let characterslist = Array.from(characters);
    characterslist.sort(function (a: any, b: any) {
      return a[property] > b[property] ? 1 : -1;
    });
    return isReverse ? characterslist.reverse() : characterslist;
  }
}

