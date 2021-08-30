import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }
  reverse = false;

  sort(characters: [], property: string) {
    let characterslist = this.deepClone(characters);
    characterslist.sort(function (a: any, b: any) {
      return a[property] > b[property] ? 1 : -1;
    });
    if (this.reverse) {
      characterslist.reverse();
    }
    return (characterslist);
  }

  deepClone(input: any): any {

    // primitive types of null
    if (typeof (input) !== "object" || input === null) {
      return input;
    }

    let result: any;
    if (Array.isArray(input)) {
      return input.map((e) => this.deepClone(e));
    } else {
      result = {};
      for (var property in input) {
        if ( input.hasOwnProperty(property) ) {
          result[property] = this.deepClone( input[property] );
        }
      }
    }
    return result;
  }

  toogleSort() {
    this.reverse = !this.reverse;
  }
}
