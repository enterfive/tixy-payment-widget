import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/Service/payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buy-tickets',
  templateUrl: './buy-tickets.component.html',
  styleUrls: ['./buy-tickets.component.css']
})
export class BuyTicketsComponent implements OnInit {

  ticketId
  ticket = true
  information  = false
  payment = false
  eventId;
  ticketDetails;
  log: number = 1;
  totalMinus;
  totalAdd;
  add;
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


  ngOnInit(){
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
    this.add = res.map(tag => tag.price).reduce((a, b) => a + b, 0);
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
  ticketDetail.active = !ticketDetail.active;
  const selectedTic = this.ticketDetails[index]
  if(selectedTic.counter) { 
   selectedTic.counter++;
   const newPrice = selectedTic.price * selectedTic.counter;
   selectedTic.counterPrice = newPrice / 400
   this.totalAdd = selectedTic.counterPrice * selectedTic.counter
   console.log(this.totalAdd)
  //  this.total = this.totalAdd + this.totalMinus
   console.log("counter", selectedTic.counterPrice)
  } else {
    selectedTic.counter = 1 
  } 
  console.log("The Ticket Cat Id", ticketDetail)
}

activateClassMinus(ticketDetail,index){
  ticketDetail.active = false;   
  ticketDetail.active = !ticketDetail.active;
  const selectedTic = this.ticketDetails[index]  
  if(selectedTic.counter && selectedTic.counter >= 1) {
   selectedTic.counter--;
   const newPrice = selectedTic.price * selectedTic.counter;
   selectedTic.counterPrice = newPrice / 400
  this.totalMinus = selectedTic.counterPrice
  console.log(this.totalMinus)

  console.log("counter", selectedTic.counterPrice)
  } else {
   //  selectedTic.counter = 0
  }
  console.log("The Ticket Cat Id", ticketDetail)
}

}