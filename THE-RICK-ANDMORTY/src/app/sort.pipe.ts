import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(characterslist: any, property: string, isReverse: boolean = false): Array<object> {

    characterslist = Array.from(characterslist);
    characterslist.sort(function (a: any, b: any) {
      return a[property] > b[property] ? 1 : -1;
    });

    return isReverse ? characterslist.reverse() : characterslist;
  }
}

