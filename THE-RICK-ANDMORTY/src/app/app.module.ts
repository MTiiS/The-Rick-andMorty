import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CardModalComponent } from './card-modal/card-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PaginationComponent,
    CardModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
