import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }


  CONFIG: any = {
    TOTAL_PAGES: 34,
    TOTAL_PAGIN_BUTTONS: 6,
    OFFSET_START: 5,
    OFFSET_STEP: 3,
    FIRST_LOAD_PAGE: 1,

    PREV_BUTTON: {
      id: "prev",
      content: "<<"
    },
    NEXT_BUTTON: {
      id: "next",
      content: ">>"
    }
  }

  getConfig(name: any) {
    if (name) return this.CONFIG[name];
    return this.CONFIG;
  }
}
