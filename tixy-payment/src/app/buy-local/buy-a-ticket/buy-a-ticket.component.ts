import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy-a-ticket',
  templateUrl: './buy-a-ticket.component.html',
  styleUrls: ['./buy-a-ticket.component.css']
})
export class BuyATicketComponent implements OnInit {

  ticket = true
  information  = false
  payment = false
  constructor() { }


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
  }

}
