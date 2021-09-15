import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ModalComponent } from './modal/modal.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { SortPipe } from './sort/sort.pipe';
import { SortComponent } from './sort/sort.component'
import { LoadingDirective } from './loading/loading.directive';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PaginationComponent,
    ModalComponent,
    SearchComponent,
    SortPipe,
    SortComponent,
    LoadingDirective,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
