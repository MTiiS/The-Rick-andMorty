import { ComponentFactoryResolver, Injectable, ViewContainerRef } from "@angular/core";
import { Character } from "../services/character.interface";
import { ModalComponent } from "./modal.component";
import { CharactersService } from "../services/characters.service";


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private rootViewContainer!: ViewContainerRef;
  component: any;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private characterService: CharactersService
  ) { }


  setRootViewContainerRef(viewContainerRef: any) {
    this.rootViewContainer = viewContainerRef;
    console.log(this.rootViewContainer);
  }
  async addDynamicComponent(character: Character) {
    character = await this.characterService.setCharacterEpisodeName(character);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    this.component = this.rootViewContainer.createComponent<any>(componentFactory);
    this.component.instance.character = character;
  }

  removeDynamicComponent() {
    this.component.destroy();
  }
}
