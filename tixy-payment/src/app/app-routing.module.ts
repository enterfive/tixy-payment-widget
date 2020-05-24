import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventPageComponent } from './event-page/event-page.component';
import { BuyATicketComponent } from './buy-local/buy-a-ticket/buy-a-ticket.component';
import { BuyTicketsComponent } from './buy-international/buy-tickets/buy-tickets.component';
import { FrameComponent } from './frame/frame.component';
import { PaymentComponent } from './buy-local/payment/payment.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: 'event-landing/:id', component: EventPageComponent},
  {path: 'buy-international-ticket/:id', component: BuyTicketsComponent},
  {path: 'buy-a-local-ticket/:id', component: BuyATicketComponent},
  {path: 'frame', component: FrameComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'home/:id', component: HomeComponent},
  { path: '', redirectTo: '/home/:id', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 