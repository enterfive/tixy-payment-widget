import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { PaymentService } from '../../Service/payment.service';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';
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
  allTicketNumbers;
  mySubscription: any;
  selectedTic;
  number = 1000
  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter();
  payment_platform = "paystack"
  userprofileform: FormGroup
  ticketcategory_id;
  obj;
  controlArray;
  purchaseCallback;
  allItemList: any[] = [];

 
  ngOnInit() {  
    this.activatedRoute.params.subscribe(params => {
      this.eventId = params['id'];
     console.log(this.eventId);
   });
   this.getOpenEventTicket();   
}

getI(i){
  console.log(i)
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
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
         fees: ['100']
         }),
         attendees: this.fb.array([  
         ])
       })    
   }
  
  
   attendeesControl(i?: number) {
    this.controlArray = this.userprofileform.get('attendees') as FormArray;
    console.log(this.allItemList)
    // Object.keys(this.allItemList).forEach((i) => {
     this.controlArray.push(
       this.fb.group({
        first_name: new FormControl({ value: '', disabled: false }, Validators.required),
        last_name: new FormControl({ value: '', disabled: false }, Validators.required),
        email: new FormControl({ value: '', disabled: false },
          Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        ticket_category_id: this.allItemList[i].ticket_category_id
        
      })
     )
     console.log(this.controlArray.controls)
  //  })
  
 }  

 get f() {
  const ff =  this.userprofileform.controls;
  // console.log(ff)
  return ff
}

// validateArray(i){
//   const controlArray = this.userprofileform.get('attendees') as FormArray;
//   console.log(controlArray.controls[i].invalid && controlArray.controls[1].touched)
//   return controlArray
// }
  
  checkValueAllTickets(e) {
    var controlArray = this.userprofileform.controls.attendees as FormArray;
    if (e.target.checked) {
      const firstname = this.userprofileform.get("buyer.first_name").value;
      const lastname =  this.userprofileform.get("buyer.last_name").value;
      const email =  this.userprofileform.get("buyer.email").value;
      console.log(firstname, lastname, email )
      var itemList = this.allItemList.length
      console.log(itemList)
      Array.from({length: itemList},(_,x) => console.log(x))
      // controlArray.controls[0].get('first_name').setValue(firstname)
      // controlArray.controls[0].get('last_name').setValue(lastname)
      // controlArray.controls[0].get('email').setValue(email)      
      Array.from({length: itemList},(_,x) => controlArray.controls[x].get('first_name').setValue(firstname))
      Array.from({length: itemList},(_,x) => controlArray.controls[x].get('last_name').setValue(lastname))
      Array.from({length: itemList},(_,x) => controlArray.controls[x].get('email').setValue(email))
      }
  else {
    var itemList = this.allItemList.length
    Array.from({length: itemList},(_,x) => controlArray.controls[x].get('first_name').setValue(''))
    Array.from({length: itemList},(_,x) => controlArray.controls[x].get('last_name').setValue(''))
    Array.from({length: itemList},(_,x) => controlArray.controls[x].get('email').setValue(''))
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
  
//  Initializes Paystack Modal
  toggleInformation(){
    (<any>window).PaystackPop.isInitialized = false
      this.information = true
      this.ticket = false
      this.payment = false
    }

  onSubmit(){
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
//Information Tab Form Function
this.submitInformationForm()
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
    const amount = this.getTotal;
    const numberOfTicket  = this.allTicketNumbers;
    const buyer_obj = this.f.buyer.value
    const attendees = this.f.attendees.value
    console.log('eventd',event_id, 'buyer_obj', buyer_obj, 'attendees', attendees)    
    this.paymentService.buyTicket(event_id,amount,numberOfTicket,buyer_obj, attendees).subscribe( (data:any) => {
    console.log("data", data.orderRef, "buyer_obj", buyer_obj, "data", data )
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


  getOpenEventTicket(){
    const eventId = this.eventId
    this.paymentService.getOpenTicketCategory(eventId).subscribe( (res:any) => {
      this.ticketDetails = res;
      this.total = res.map(x => x.price)
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
          }
        })
      }

  activateClassAdd(ticketDetail?,index?){
    this.allItemList = this.allItemList.concat(ticketDetail);
    console.log(this.allItemList)
    ticketDetail.active = false;
    ticketDetail.active = !ticketDetail.active;
    this.selectedTic = this.ticketDetails[index]
    this.attendeesControl(index)
    if(this.selectedTic.counter) { 
     this.selectedTic.counter++;
     const newPrice = this.selectedTic.price * this.selectedTic.counter;
     this.selectedTic.counterPrice = newPrice
     this.totalAdd = this.selectedTic.counterPrice * this.selectedTic.counter
     
    } else {
      this.selectedTic.counter = 1 
    } 
    
  }
  

  activateClassMinus(ticketDetail?,index?){
    const fTicketIndex = this.allItemList.findIndex(item => item.ticket_category_id==ticketDetail.ticket_category_id);
    this.attendeesControl(index)
    if(fTicketIndex >=0) {
      this.allItemList.splice(fTicketIndex, 1);
    }
    console.log(this.allItemList)
    ticketDetail.active = false;   
    ticketDetail.active = !ticketDetail.active;
    const selectedTic = this.ticketDetails[index]  
    if(selectedTic.counter && selectedTic.counter >= 1) {
     selectedTic.counter--;
     const newPrice = selectedTic.price * selectedTic.counter;
     selectedTic.counterPrice = newPrice
    this.totalMinus = selectedTic.counterPrice
    } else {
     //  selectedTic.counter = 0
    }
 }


 get getTotal() {
  //For Total Fees
  const ticketNumbers = this.ticketDetails.map(tic => (tic.counter || 0)); 
  const sumOfTicketNumbers = ticketNumbers.reduce((prev , curr) => prev + curr)
  this.allTicketNumbers = sumOfTicketNumbers
  let selectedTickArray = [];
  selectedTickArray.push(this.selectedTic)
   //For Total Amount
  const totalAmounts = this.ticketDetails.map(tic => ((tic.price * (tic.counter || 0)))); 
  const totalSum = totalAmounts.reduce((prev , curr) => prev + curr)
  const all =  this.ticketDetails;
  // console.log(all)
  this.alltotal = totalSum
  // this.attendeesControl()
  return totalSum;
}
}


