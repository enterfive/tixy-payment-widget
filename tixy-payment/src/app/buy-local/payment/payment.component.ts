import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    (<any>window).PaystackPop.setup({
      key: 'pk_live_7445b0e87d2616a05199316003a7ae8e3227a6a5',
      email: 'customer@email.com',
      amount: 10000,
      container: 'paystackEmbedContainer',
      callback: function(response){
       alert('successfully subscribed. transaction ref is ' + response.reference);
     },
   });
  }

}
