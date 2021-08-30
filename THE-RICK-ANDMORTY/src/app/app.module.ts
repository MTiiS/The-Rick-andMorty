import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { RickAndMortyService } from './services/rickAndMorty/rick-and-morty.service';
import { CharactersService } from './services/character/characters.service';
import { ConfigService } from './services/config/config.service';
import { CurrentPageService } from './services/currentPage/current-page.service';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SortComponent } from './sort/sort.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PaginationComponent,
    SortComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [RickAndMortyService, CharactersService, ConfigService, CurrentPageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
