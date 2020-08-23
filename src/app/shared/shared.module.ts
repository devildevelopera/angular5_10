import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToggleFullScreenDirective } from './fullscreen/toggle-fullscreen.directive';
import { AccordionAnchorDirective } from './accordion/accordionanchor.directive';
import { AccordionLinkDirective } from './accordion/accordionlink.directive';
import { AccordionDirective } from './accordion/accordion.directive';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TitleComponent } from '../layout/admin/title/title.component';
import { CardComponent } from './card/card.component';
import { CardToggleDirective } from './card/card-toggle.directive';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';
import { ModalAnimationComponent } from './modal-animation/modal-animation.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ClickOutsideModule } from 'ng-click-outside';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    ToggleFullScreenDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CardToggleDirective,
    TitleComponent,
    CardComponent,
    ModalBasicComponent,
    ModalAnimationComponent,
    SpinnerComponent,

  ],
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    PerfectScrollbarModule,
    ClickOutsideModule,
    HttpModule
  ],
  exports: [
    NgbModule,
    ToggleFullScreenDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CardToggleDirective,
    HttpClientModule,
    PerfectScrollbarModule,
    TitleComponent,
    CardComponent,
    ModalBasicComponent,
    ModalAnimationComponent,
    SpinnerComponent,
    ClickOutsideModule,
    HttpModule
  ],

  providers: []
})
export class SharedModule { }