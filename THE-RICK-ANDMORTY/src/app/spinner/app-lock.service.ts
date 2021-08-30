import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppLockService {

  public isLocked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  watch() {
    return this.isLocked;
  }

  setIsLocked(value: boolean) {
    this.isLocked.next(value);
  }
}
