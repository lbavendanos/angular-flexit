import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Own Modules
import { CoreModule } from './core/core.module';

// Own Components
import { LayoutComponent } from './core/layout/layout.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [
    LayoutComponent
  ]
})
export class AppModule { }
