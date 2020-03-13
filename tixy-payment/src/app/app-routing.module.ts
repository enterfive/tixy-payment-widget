import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventPageComponent } from './event-page/event-page.component';
import { BuyATicketComponent } from './buy-local/buy-a-ticket/buy-a-ticket.component';
import { BuyTicketsComponent } from './buy-international/buy-tickets/buy-tickets.component';
import { FrameComponent } from './frame/frame.component';


const routes: Routes = [
  {path: 'event-landing/:id', component: EventPageComponent},
  {path: 'buy-international-ticket', component: BuyTicketsComponent},
  {path: 'buy-a-local-ticket/:id', component: BuyATicketComponent},
  {path: 'frame', component: FrameComponent},
  { path: '', redirectTo: '/event-landing/:id', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 