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
import { ToastrManager } from 'ng6-toastr-notifications';
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
  allAlert: string = 'All fields Are required with a valid email address';
  emailAlert: string = 'Please, Enter A Valid E-mail Address';
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
  controlArray
  purchaseCallback;
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
    private fb: FormBuilder,
    private toaster: ToastrManager
    
    ) {
      this.userprofileform = this.fb.group({
        buyer: this.fb.group({
         first_name: ['', Validators.required],
         last_name: ['', Validators.required],
         email:['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
         amount:new FormControl({ value: this.alltotal, disabled: false }),
         number_of_tickets : ['3'],
         fees: ['100']
         }),
         attendees: this.fb.array([
           
         ])
       })    
   }
  
  
   attendeesControl() {
     this.controlArray = this.userprofileform.get('attendees') as FormArray;
    Object.keys(this.ticketDetails).forEach((i) => {
     this.controlArray.push(
       this.fb.group({
        first_name: new FormControl({ value: '', disabled: false }, Validators.required),
        last_name: new FormControl({ value: '', disabled: false }, Validators.required),
        email: new FormControl({ value: '', disabled: false },
          Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        ticket_category_id: this.ticketDetails[i].ticket_category_id
        
      })
     )
   })
   console.log(this.controlArray.controls)
 }  

 get f() {
  const ff =  this.userprofileform.controls;
  console.log(ff)
  return ff
}

validateArray(i){
  const controlArray = this.userprofileform.get('attendees') as FormArray;
  console.log(controlArray.controls[0].invalid && controlArray.controls[0].touched)
  return controlArray
}
  
  checkValueAllTickets(e) {
    // const controlArray = this.userprofileform.get('attendees') as FormArray;
    const controlArray = this.userprofileform.controls.attendees as FormArray;
    if (e.target.checked) {
      const firstname = this.userprofileform.get("buyer.first_name").value;
      const lastname =  this.userprofileform.get("buyer.last_name").value;
      const email =  this.userprofileform.get("buyer.email").value;
      console.log(controlArray,firstname, lastname, email )
    //  console.log(this.userprofileform.get(['attendees'][0]).value);

   let fn = controlArray.parent.controls[0].get('first_name')
    // controlArray.controls[0].get('last_name').setValue(lastname)
    // controlArray.controls[0].get('email').setValue(email)
    // controlArray.controls[1].get('first_name').setValue(firstname)
    // controlArray.controls[1].get('last_name').setValue(lastname)
    // controlArray.controls[1].get('email').setValue(email)
    console.log(
      fn
      // controlArray.controls.first_name.value
      // controlArray.controls.map(value => value.setValue(true))
      );


     // const att_firstname = controlArray.value["attendees.first_name"].setValue(firstname);
    //  controlArray.controls[].get["last_name"].setValue(lastname);
      // this.userprofileform.controls["email"].setValue(email);
    }
    else {
      // this.userprofileform.controls["fname"].setValue('');
      // this.userprofileform.controls["lname"].setValue('');
      // this.userprofileform.controls["mail"].setValue('');
      controlArray.controls[0].get('first_name').setValue('')
      controlArray.controls[0].get('last_name').setValue('')
      controlArray.controls[0].get('email').setValue('')
      controlArray.controls[1].get('first_name').setValue('')
      controlArray.controls[1].get('last_name').setValue('')
      controlArray.controls[1].get('email').setValue('')


    }

  }
  checkValueOfOneTicket(e, i: number) {
    const controlArray = this.userprofileform.controls.attendees as FormArray;
    if (e.target.checked) {
      const firstname = this.userprofileform.get("buyer.first_name").value;
      const lastname =  this.userprofileform.get("buyer.last_name").value;
      const email =  this.userprofileform.get("buyer.email").value;

      controlArray.controls[i].get('first_name').setValue(firstname)
      controlArray.controls[i].get('last_name').setValue(lastname)
      controlArray.controls[i].get('email').setValue(email)
   
      
    }
    else {
      controlArray.controls[i].get('first_name').setValue('')
      controlArray.controls[i].get('last_name').setValue('')
      controlArray.controls[i].get('email').setValue('')
    }

  }
  


  onSubmit(){
  //Information Tab Form Function
    this.submitInformationForm()
 // Paystack Modal Starts
setTimeout(() => {
  let shown = document.getElementById('paystackEmbedContainer') as HTMLElement;
  console.log(shown ? 'shown' : 'not shown');
    (<any>window).PaystackPop.setup({
    key: 'pk_test_3adb59c58af1c11a841fd7fe21a27508878babd1',
    email: 'customer@email.com',
    amount: this.getTotal * 100,
    container: 'paystackEmbedContainer',
    callback: ( (response) => {
      console.log(response.reference)
      localStorage.setItem('transaction_ref', response.reference)
    //  alert('successfully subscribed. transaction ref is ' + response.reference);
    this.ticketPurchase()
   }),
   onClose: function(){
     console.log("windows closed")
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


  ticketPurchase() {
        const orderId= localStorage.getItem('order_id');
        const transaction_ref = localStorage.getItem('transaction_ref')
        const paymentPlatform = "paystack"
    
        this.paymentService.ticketPurchaseCallback(orderId, transaction_ref, paymentPlatform).subscribe((data: any) => {
          console.log(data)
          if(data.error){
            this.toaster.errorToastr(data.text, null, { toastTimeout: 7000 });
          } else {  
            this.toaster.successToastr(data.text, null, { toastTimeout: 7000 });
            // setTimeout(() => {
            //   location.reload()
            // }, 10000);
          }

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

 get getTotal() {
  const totalAmounts = this.ticketDetails.map(tic => ((tic.price * (tic.counter || 0)))); 
  const totalSum = totalAmounts.reduce((prev , curr) => prev + curr)
  return totalSum;

  console.log('totalxz', totalSum)   
}

//  sendUrl() {
//   this.showIframe = true
//   let playerUrl = `https://paystack.com/assets/payment/production/inline.html?id=paystack7jWUC&amp;key=pk_live_7445b0e87d2616a05199316003a7ae8e3227a6a5&amp;email=customer%40email.com&amp;amount=10000&amp;currency=NGN&amp;container=paystackEmbedContainer&amp;metadata=%7B%22referrer%22%3A%22https%3A%2F%2Ftixy-2-0.webflow.io%2Fbuy-a-ticket-alt%22%7D&amp;mode=popup&amp;hasTLSFallback=true` // try it first, if it doesn't work use the sanitized URL
//   this.trustedDashboardUrl = this._sanitizer.bypassSecurityTrustResourceUrl(playerUrl);
//   this.iframeURL = this.trustedDashboardUrl;
//   console.log( this.iframeURL)
// }

}


