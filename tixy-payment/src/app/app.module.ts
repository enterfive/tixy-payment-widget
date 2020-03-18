import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventPageComponent } from './event-page/event-page.component';
import { BuyATicketComponent } from './buy-local/buy-a-ticket/buy-a-ticket.component';
import { BuyTicketsComponent } from './buy-international/buy-tickets/buy-tickets.component';
import { PaymentService } from './Service/payment.service';
import { FrameComponent } from './frame/frame.component';
import { PaymentComponent } from './buy-local/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    EventPageComponent,
    BuyATicketComponent,
    BuyTicketsComponent,
    FrameComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [PaymentService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
