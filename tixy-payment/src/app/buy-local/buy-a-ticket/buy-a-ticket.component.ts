import { Component, OnInit, ViewChildren, QueryList, ElementRef, Output, EventEmitter } from '@angular/core';
import {Router, ActivatedRoute, Params, NavigationEnd} from '@angular/router';
import { PaymentService } from '../../Service/payment.service';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  EmailValidator
} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl  } from '@angular/platform-browser';
import _ from 'Lodash';
import { Key } from 'protractor';
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
  hide= true
  titleAlert: string = 'This field is required';
  totalAdd;
  totalMinus;
  total;
  add;
  window;
  alltotal;
  mySubscription: any;
  selectedTic;
  number = 1000
  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter();
  payment_platform = "paystack"
  userprofileform: FormGroup
  ticketcategory_id;
  obj;
  // PaystackPop;

  ngOnInit() {  
    this.activatedRoute.params.subscribe(params => {
      this.eventId = params['id'];
     console.log(this.eventId);
   });
   this.getOpenEventTicket()
}


  constructor(
    private activatedRoute: ActivatedRoute, 
    private paymentService: PaymentService,
    private _sanitizer: DomSanitizer,
    private router: Router,
    private fb: FormBuilder
    ) {
      this.userprofileform = this.fb.group({
        buyer: this.fb.group({
         first_name: ['', Validators.required],
         last_name: ['', Validators.required],
         email:['', Validators.required],
         amount: ['21000', Validators.required],
         number_of_tickets : ['3', Validators.required],
         fees: ['100', Validators.required]
         }),
         attendees: this.fb.array([
         ])
       })
      //  setTimeout( () => {
      //   this.attendeesControl()
      //  }, 7000)
   }
  
  
   attendeesControl() {
    const controlArray = this.userprofileform.get('attendees') as FormArray;
    Object.keys(this.ticketDetails).forEach((i) => {
     controlArray.push(
       this.fb.group({
        first_name: new FormControl({ value: '', disabled: false }),
        last_name: new FormControl({ value: '', disabled: false }),
        email: new FormControl({ value: '', disabled: false }),
        ticket_category_id: this.ticketDetails[i].ticket_category_id
      })
     )
   })
   console.log(controlArray.controls)
 }  

 get f() {
  return this.userprofileform.controls;
}
  

  // checkValue(e) {
  //   if (e.target.checked) {
  //     const firstname = this.userprofileform.controls["firstname"].value;
  //     const lastname = this.userprofileform.controls["lastname"].value;
  //     const email = this.userprofileform.controls["email"].value;
  //     this.userprofileform.controls["fname"].setValue(firstname);
  //     this.userprofileform.controls["lname"].setValue(lastname);
  //     this.userprofileform.controls["mail"].setValue(email);
  //     this.userprofileform.controls["fnameone"].setValue(firstname);
  //     this.userprofileform.controls["lnameone"].setValue(lastname);
  //     this.userprofileform.controls["mailone"].setValue(email);
  //   }
  //   else {
  //     this.userprofileform.controls["fname"].setValue('');
  //     this.userprofileform.controls["lname"].setValue('');
  //     this.userprofileform.controls["mail"].setValue('');
  //     this.userprofileform.controls["fnameone"].setValue('');
  //     this.userprofileform.controls["lnameone"].setValue('');
  //     this.userprofileform.controls["mailone"].setValue('');
  //   }

  // }
  // checkValueOne(e) {
  //   if (e.target.checked) {
  //     const firstname = this.userprofileform.controls["firstname"].value;
  //     const lastname = this.userprofileform.controls["lastname"].value;
  //     const email = this.userprofileform.controls["email"].value;
  //     this.userprofileform.controls["fname"].setValue(firstname);
  //     this.userprofileform.controls["lname"].setValue(lastname);
  //     this.userprofileform.controls["mail"].setValue(email);
      
  //   }
  //   else {
  //     this.userprofileform.controls["fnameone"].setValue('');
  //     this.userprofileform.controls["lnameone"].setValue('');
  //     this.userprofileform.controls["mailone"].setValue('');
  //   }

  // }
  // checkValueTwo(e) {
  //   if (e.target.checked) {
  //     const firstname = this.userprofileform.controls["firstname"].value;
  //     const lastname = this.userprofileform.controls["lastname"].value;
  //     const email = this.userprofileform.controls["email"].value;
  //     this.userprofileform.controls["fnameone"].setValue(firstname);
  //     this.userprofileform.controls["lnameone"].setValue(lastname);
  //     this.userprofileform.controls["mailone"].setValue(email);
      
  //   }
  //   else {
  //     this.userprofileform.controls["fnameone"].setValue('');
  //     this.userprofileform.controls["lnameone"].setValue('');
  //     this.userprofileform.controls["mailone"].setValue('');
  //   }

  // }


  onSubmit(){
    //Information Tab Form Function
    this.submitInformationForm()
// Paystack Modal Starts
setTimeout(() => {
 
  let shown = document.getElementById('paystackEmbedContainer') as HTMLElement;
  console.log(shown ? 'shown' : 'not shown');
    (<any>window).PaystackPop.setup({
    key: 'pk_test_0dcfa780bc08adca265572bcfa91019ffa855390',
    email: 'customer@email.com',
    amount: this.alltotal * 100,
    container: 'paystackEmbedContainer',
    callback: function(response){
      console.log(response.reference)
     alert('successfully subscribed. transaction ref is ' + response.reference);
     console.log(response.reference)
    
   },
   onClose: function(){
    alert('window closed');
},
 });
 

}, 2000);
console.log( (<any>window).PaystackPop)
// Paystack Modal Ends
  
    //Toggle For Modal Tab
      this.payment = true;
      this.ticket = false;
      this.information = false;
  }

  submitInformationForm(){
 //Expected Form Object
 const event_id = this.eventId;
 const buyer_obj = this.f.buyer.value
 const attendees = this.f.attendees.value
 console.log('eventd',event_id, 'buyer_obj', buyer_obj, 'attendees', attendees)
 this.paymentService.buyTicket(event_id, buyer_obj, attendees).subscribe( (data:any) => {
   console.log("data", data.orderRef)
   let orderRef = data.orderRef
    //Toggle For Modal Tab
    localStorage.setItem('order_id', orderRef)
   
 })

  }
  

  toggleTicket(){
    this.ticket = true
    this.information = false
    this.payment = false
  }

  
  toggleInformation(){
    (<any>window).PaystackPop.isInitialized = false
    this.information = true
    this.ticket = false
    this.payment = false
  }

 

  getOpenEventTicket(){
    const eventId = this.eventId
    this.paymentService.getOpenTicketCategory(eventId).subscribe( (res:any) => {
      this.ticketDetails = res;
      this.total = res.map(x => x.price)
      this.add = res.map(tag => tag.counterPrice).reduce((a, b) => a + b, 0);
      console.log("total", this.total, "addprice", this.add)
      console.log(this.ticketDetails)
      this.attendeesControl()

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
     this.selectedTic = this.ticketDetails[index]
    if(this.selectedTic.counter) { 
     this.selectedTic.counter++;
     const newPrice = this.selectedTic.price * this.selectedTic.counter;
     this.selectedTic.counterPrice = newPrice
     this.totalAdd = this.selectedTic.counterPrice * this.selectedTic.counter
     console.log(this.totalAdd)
    //  this.total = this.totalAdd + this.totalMinus
     console.log("counter the price", this.selectedTic.counterPrice)
    this.alltotal = Object.values(this.ticketDetails).map((x:any) => x.counterPrice).reduce((a, b) => a + b, 0)
    console.log("tic det",this.alltotal )
    } else {
      this.selectedTic.counter = 1 
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
     selectedTic.counterPrice = newPrice
    this.totalMinus = selectedTic.counterPrice
    console.log(this.totalMinus)
    this.alltotal = Object.values(this.ticketDetails).map((x:any) => x.counterPrice).reduce((a, b) => b - a, 0)
    console.log("tic det",this.alltotal )
    console.log("counter", selectedTic.counterPrice)
    } else {
     //  selectedTic.counter = 0
    }
    console.log("The Ticket Cat Id", ticketDetail)
 }


//  sendUrl() {
//   this.showIframe = true
//   let playerUrl = `https://paystack.com/assets/payment/production/inline.html?id=paystack7jWUC&amp;key=pk_live_7445b0e87d2616a05199316003a7ae8e3227a6a5&amp;email=customer%40email.com&amp;amount=10000&amp;currency=NGN&amp;container=paystackEmbedContainer&amp;metadata=%7B%22referrer%22%3A%22https%3A%2F%2Ftixy-2-0.webflow.io%2Fbuy-a-ticket-alt%22%7D&amp;mode=popup&amp;hasTLSFallback=true` // try it first, if it doesn't work use the sanitized URL
//   this.trustedDashboardUrl = this._sanitizer.bypassSecurityTrustResourceUrl(playerUrl);
//   this.iframeURL = this.trustedDashboardUrl;
//   console.log( this.iframeURL)
// }

}


