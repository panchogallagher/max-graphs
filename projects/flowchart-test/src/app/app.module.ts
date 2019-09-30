import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlowchartModule } from 'flowchart';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlowchartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
