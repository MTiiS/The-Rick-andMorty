import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppLockService } from './app-lock.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  isLocked: boolean = false;
  constructor(private appLock: AppLockService) { }

  ngOnInit(): void {
     this.appLock.watch().subscribe( (val) =>{
      this.isLocked = val;
    });
  }
}
