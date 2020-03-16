import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { PaymentService } from '../../Service/payment.service';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl  } from '@angular/platform-browser';

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
  iframeURL: any;
  showIframe = false;
  routerSubscription: any;
  trustedDashboardUrl: SafeUrl;
  hidden;
  // PaystackPop;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private paymentService: PaymentService,
    private _sanitizer: DomSanitizer
    ) {

   }

 
   userprofileform = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
          attendees: new FormGroup({
            fname: new FormControl(''),
            lname: new FormControl(''),
            mail: new FormControl('')
          })
  })




  onSubmit(){
    console.log(this.userprofileform.value)
    
    this.payment = true;
    this.ticket = false;
    this.information = false;
    setTimeout(function(){ 
    (<any>window).PaystackPop.setup({
       key: 'pk_live_7445b0e87d2616a05199316003a7ae8e3227a6a5',
       email: 'customer@email.com',
       amount: 10000,
       container: 'paystackEmbedContainer',
       callback: function(response){
        alert('successfully subscribed. transaction ref is ' + response.reference);
      },
    });
  },3000);    
  }

 



  ngAfterInit(){
    
  }



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

  // togglePayment(){
  //   this.payment = true;
  //   this.ticket = false;
  //   this.information = false
  // }


  ngOnInit(): void {

console.log('paystackpop', (<any>window).PaystackPop);

    this.sendUrl()
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
    ticketDetail.active = !ticketDetail.active;
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
    ticketDetail.active = !ticketDetail.active;
    const selectedTic = this.ticketDetails[index]  
    if(selectedTic.counter && selectedTic.counter >= 1) {
     selectedTic.counter--;
     const newPrice = selectedTic.price * selectedTic.counter;
     selectedTic.counterPrice = newPrice
    } else {
     //  selectedTic.counter = 0
    }
 }


 sendUrl() {
  this.showIframe = true
  let playerUrl = `https://paystack.com/assets/payment/production/inline.html?id=paystack7jWUC&amp;key=pk_live_7445b0e87d2616a05199316003a7ae8e3227a6a5&amp;email=customer%40email.com&amp;amount=10000&amp;currency=NGN&amp;container=paystackEmbedContainer&amp;metadata=%7B%22referrer%22%3A%22https%3A%2F%2Ftixy-2-0.webflow.io%2Fbuy-a-ticket-alt%22%7D&amp;mode=popup&amp;hasTLSFallback=true` // try it first, if it doesn't work use the sanitized URL
  this.trustedDashboardUrl = this._sanitizer.bypassSecurityTrustResourceUrl(playerUrl);
  this.iframeURL = this.trustedDashboardUrl;
  console.log( this.iframeURL)
}
}


