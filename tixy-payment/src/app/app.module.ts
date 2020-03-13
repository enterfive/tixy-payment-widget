import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventPageComponent } from './event-page/event-page.component';
import { BuyATicketComponent } from './buy-local/buy-a-ticket/buy-a-ticket.component';
import { BuyTicketsComponent } from './buy-international/buy-tickets/buy-tickets.component';
import { PaymentService } from './Service/payment.service';
import { FrameComponent } from './frame/frame.component';

@NgModule({
  declarations: [
    AppComponent,
    EventPageComponent,
    BuyATicketComponent,
    BuyTicketsComponent,
    FrameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
