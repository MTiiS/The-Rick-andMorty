import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { RickAndMortyService } from './services/rickAndMorty/rick-and-morty.service';
import { CharactersService } from './services/character/characters.service';
import { ConfigService } from './services/config/config.service';
import { CurrentPageService } from './services/currentPage/current-page.service';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ModalModule } from './card-modal/modal.module';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ModalModule
  ],
  providers: [
    RickAndMortyService, 
    CharactersService,
    ConfigService, 
    CurrentPageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
