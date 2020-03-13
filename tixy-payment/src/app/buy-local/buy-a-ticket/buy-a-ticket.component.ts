import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { PaymentService } from '../../Service/payment.service';

@Component({
  selector: 'app-buy-a-ticket',
  templateUrl: './buy-a-ticket.component.html',
  styleUrls: ['./buy-a-ticket.component.css']
})
export class BuyATicketComponent implements OnInit {

  ticket = true
  information  = false
  payment = false
  eventId;
  ticketDetails;
  constructor(private activatedRoute: ActivatedRoute, private paymentService: PaymentService) { }


  toggleTicket(){
    this.ticket = true
    this.information = false
    this.payment = false

  }

  toggleInformation(){
    this.information = true
    this.ticket = false
    this.payment = false
  }

  togglePayment(){
    this.payment = true;
    this.ticket = false;
    this.information = false
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.eventId = params['id'];
     console.log(this.eventId);
   });
   this.getOpenEventDetails()
  }

  getOpenEventDetails(){
    const eventId = this.eventId
    this.paymentService.getOpenTicketCategory(eventId).subscribe( (res:any) => {
      this.ticketDetails = res;
      console.log(this.ticketDetails)
    })
  }


}
