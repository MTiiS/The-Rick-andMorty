import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ModalComponent } from './modal/modal.component';
import { SortPipe } from './sort/sort.pipe';
import { SortComponent } from './sort/sort.component'


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PaginationComponent,
    ModalComponent,
    SortPipe,
    SortComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
