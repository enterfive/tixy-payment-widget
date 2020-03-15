import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { PaymentService } from '../../Service/payment.service';

@Component({
  selector: 'app-buy-a-ticket',
  templateUrl: './buy-a-ticket.component.html',
  styleUrls: ['./buy-a-ticket.component.css']
})
export class BuyATicketComponent implements OnInit {

  ticketId
  ticket = true
  information  = false
  payment = false
  eventId;
  ticketDetails;
  log: number = 1;
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
   this.getOpenEventTicket()
  }

  getOpenEventTicket(){
    const eventId = this.eventId
    this.paymentService.getOpenTicketCategory(eventId).subscribe( (res:any) => {
      this.ticketDetails = res;
      console.log(this.ticketDetails)
    })
  }

  activateClass(ticketDetail){
    ticketDetail.active = !ticketDetail.active;
    if(!ticketDetail.active) {
      return ticketDetail - 1
    } else {
      console.log("The Ticket Cat Id", ticketDetail)

    }
  }

  activateClassAdd(ticketDetail,index){
    ticketDetail.active = false;

    const selectedTic = this.ticketDetails[index]
    if(selectedTic.counter) { 
     selectedTic.counter++;
     const newPrice = selectedTic.price * selectedTic.counter;
     selectedTic.counterPrice = newPrice
    } else {
      selectedTic.counter = 1 
    } 
  }

  activateClassMinus(ticketDetail,index){
    ticketDetail.active = false;    
    const selectedTic = this.ticketDetails[index]  
    if(selectedTic.counter && selectedTic.counter >= 1) {
     selectedTic.counter--;
     const newPrice = selectedTic.price * selectedTic.counter;
     selectedTic.counterPrice = newPrice
    } else {
     //  selectedTic.counter = 0
    }
 }
}


