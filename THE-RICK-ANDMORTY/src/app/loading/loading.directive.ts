import {
  Directive, Input, ComponentFactory, ViewContainerRef,
  TemplateRef, ComponentRef, ComponentFactoryResolver
} from '@angular/core';
import { LoadingComponent } from './loading.component';

@Directive({
  selector: '[apploading]'
})
export class LoadingDirective {

  loadingFactory: ComponentFactory<LoadingComponent>;
  loadingComponent?: ComponentRef<LoadingComponent>;

  constructor(private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
    this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
  }

  @Input()
  set apploading(loading: boolean) {
    this.vcRef.clear();
    if (loading) {
      this.loadingComponent = this.vcRef.createComponent(this.loadingFactory);
    }
    else {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }
}
