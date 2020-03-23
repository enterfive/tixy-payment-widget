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
import { IfStmt } from '@angular/compiler';

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
  mySubscription: any;
  
  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter();
  // PaystackPop;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private paymentService: PaymentService,
    private _sanitizer: DomSanitizer,
    private router: Router

    ) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
        }
      });
  
      console.log(this.mySubscription)
   }
   userprofileform = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('',  Validators.required),
    email: new FormControl('',  Validators.required),
    fname: new FormControl('',  Validators.required),
    lname: new FormControl('',  Validators.required),
    mail: new FormControl('',  Validators.required),
    fnameone: new FormControl('',  Validators.required),
    lnameone: new FormControl('',  Validators.required),
    mailone: new FormControl('',  Validators.required)
         
  })



  checkValue(e) {
    if (e.target.checked) {
      const firstname = this.userprofileform.controls["firstname"].value;
      const lastname = this.userprofileform.controls["lastname"].value;
      const email = this.userprofileform.controls["email"].value;
      this.userprofileform.controls["fname"].setValue(firstname);
      this.userprofileform.controls["lname"].setValue(lastname);
      this.userprofileform.controls["mail"].setValue(email);
      this.userprofileform.controls["fnameone"].setValue(firstname);
      this.userprofileform.controls["lnameone"].setValue(lastname);
      this.userprofileform.controls["mailone"].setValue(email);
    }
    else {
      this.userprofileform.controls["fname"].setValue('');
      this.userprofileform.controls["lname"].setValue('');
      this.userprofileform.controls["mail"].setValue('');
      this.userprofileform.controls["fnameone"].setValue('');
      this.userprofileform.controls["lnameone"].setValue('');
      this.userprofileform.controls["mailone"].setValue('');
    }

  }
  checkValueOne(e) {
    if (e.target.checked) {
      const firstname = this.userprofileform.controls["firstname"].value;
      const lastname = this.userprofileform.controls["lastname"].value;
      const email = this.userprofileform.controls["email"].value;
      this.userprofileform.controls["fname"].setValue(firstname);
      this.userprofileform.controls["lname"].setValue(lastname);
      this.userprofileform.controls["mail"].setValue(email);
      
    }
    else {
      this.userprofileform.controls["fnameone"].setValue('');
      this.userprofileform.controls["lnameone"].setValue('');
      this.userprofileform.controls["mailone"].setValue('');
    }

  }
  checkValueTwo(e) {
    if (e.target.checked) {
      const firstname = this.userprofileform.controls["firstname"].value;
      const lastname = this.userprofileform.controls["lastname"].value;
      const email = this.userprofileform.controls["email"].value;
      this.userprofileform.controls["fnameone"].setValue(firstname);
      this.userprofileform.controls["lnameone"].setValue(lastname);
      this.userprofileform.controls["mailone"].setValue(email);
      
    }
    else {
      this.userprofileform.controls["fnameone"].setValue('');
      this.userprofileform.controls["lnameone"].setValue('');
      this.userprofileform.controls["mailone"].setValue('');
    }

  }

  ngAfterViewInit(){
   
  }

  onSubmit(){
    console.log(this.userprofileform.value)  
      this.payment = true;
      this.ticket = false;
      this.information = false;

   setTimeout(() => {
        let shown = document.getElementById('paystackEmbedContainer') as HTMLElement;
        console.log(shown ? 'shown' : 'not shown');
        this.window =   (<any>window).PaystackPop.setup({
          key: 'pk_live_7445b0e87d2616a05199316003a7ae8e3227a6a5',
          email: 'customer@email.com',
          amount: 10000 * 200,
          container: 'paystackEmbedContainer',
          callback: function(response){
           alert('successfully subscribed. transaction ref is ' + response.reference);
           console.log(response.reference)
         },
         onClose: function(){
          alert('window closed');
      },
       });
    }, 2000);

      
  }
  

  ngOnDestroy(){
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
    this.window().unsubscribe()
  }

  toggleTicket(){
    this.ticket = true
    this.information = false
    this.payment = false
  }

  
  toggleInformation(){

    // (<any>window).PaystackPop.setup({
     
    //   key: 'pk_live_7445b0e87d2616a05199316003a7ae8e3227a6a5',
    //       email: 'customer@email.com',
    //       amount: 10000 * 200,
    //       container: 'paystackEmbedContain',
    //       callback: function(response){
    //        alert('successfully subscribed. transaction ref is ' + response.reference);
    //        console.log(response.reference)
    //      },
    //      onClose: function(){
    //       alert('window closed');
    //   },
      
      
    // });
    this.information = true
    this.ticket = false
    this.payment = false


    // let id = this.eventId
    // let url = `http://localhost:4200/buy-a-local-ticket/${id}`
    // this.router.navigateByUrl(url);
    
   
  }

  loadPaystackModal(){
    console.log('*** loading paystack modal...');
  }


  // ngAfterInit(){
    
  // }
  // togglePayment(){
  //   this.payment = true;
  //   this.ticket = false;
  //   this.information = false
  // }


// loadPayStackModal() {
//   let shown = document.getElementById('paystackEmbedContainer')
//   console.log(shown ? 'shown' : 'not shown');
//     (<any>window).PaystackPop.setup({
//       key: 'pk_live_7445b0e87d2616a05199316003a7ae8e3227a6a5',
//       email: 'customer@email.com',
//       amount: 10000,
//       container: 'paystackEmbedContainer',
//       callback: function(response){
//        alert('successfully subscribed. transaction ref is ' + response.reference);
//      },
     
//    });
//    }

  ngOnInit() {

    
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
      this.total = res.map(x => x.price)
      this.add = res.map(tag => tag.price).reduce((a, b) => a + b, 0);
      console.log("total", this.total, "addprice", this.add)
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
     selectedTic.counterPrice = newPrice
    this.totalMinus = selectedTic.counterPrice
    console.log(this.totalMinus)

    console.log("counter", selectedTic.counterPrice)
    } else {
     //  selectedTic.counter = 0
    }
    console.log("The Ticket Cat Id", ticketDetail)
 }


 sendUrl() {
  this.showIframe = true
  let playerUrl = `https://paystack.com/assets/payment/production/inline.html?id=paystack7jWUC&amp;key=pk_live_7445b0e87d2616a05199316003a7ae8e3227a6a5&amp;email=customer%40email.com&amp;amount=10000&amp;currency=NGN&amp;container=paystackEmbedContainer&amp;metadata=%7B%22referrer%22%3A%22https%3A%2F%2Ftixy-2-0.webflow.io%2Fbuy-a-ticket-alt%22%7D&amp;mode=popup&amp;hasTLSFallback=true` // try it first, if it doesn't work use the sanitized URL
  this.trustedDashboardUrl = this._sanitizer.bypassSecurityTrustResourceUrl(playerUrl);
  this.iframeURL = this.trustedDashboardUrl;
  console.log( this.iframeURL)
}

}


