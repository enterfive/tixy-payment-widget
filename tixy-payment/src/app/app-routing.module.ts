import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventPageComponent } from './event-page/event-page.component';
import { BuyATicketComponent } from './buy-local/buy-a-ticket/buy-a-ticket.component';


const routes: Routes = [
  {path: 'event-landing', component: EventPageComponent},
  {path: 'buy-a-ticket', component: BuyATicketComponent},
  { path: '', redirectTo: '/event-landing', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 