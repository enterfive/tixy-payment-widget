import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventPageComponent } from './event-page/event-page.component';
import { BuyATicketComponent } from './buy-local/buy-a-ticket/buy-a-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    EventPageComponent,
    BuyATicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
