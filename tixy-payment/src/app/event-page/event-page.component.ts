import { Component, OnInit, OnDestroy  } from '@angular/core';
import {Router, ActivatedRoute, Params, NavigationEnd} from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { PaymentService } from '../Service/payment.service';
import {filter} from "rxjs/operators";





@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  eventId;
  showEvent = true
  eventDetails;
  iframeURL: any;
  showIframe = false;
  routerSubscription: any;
  trustedDashboardUrl: SafeUrl;



  constructor(
    private activatedRoute: ActivatedRoute, 
    private paymentService: PaymentService, 
    private _router: Router, 
    private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.activatedRoute.params.subscribe(params => {
         this.eventId = params['id'];
        console.log(this.eventId);
      });
      this.getOpenEventDetails()
      
  }

  // ngOnDestroy() {
  //   if(this.routerSubscription) {
  //     this.routerSubscription.unsubscribe();
  //   }
  // }





  // public mouseUp(event: any) {
  //   // const event = this.eventId
  //   this.routerSubscription = this._router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //     ).subscribe((event) => {
  //       console.log(event)
  //       this.iframeUrl = "http://localhost:8000/buy-a-local-ticket/" + this.eventId;
  //       this.iframeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrl);
  //       this.showIframe = true;
  //     }
  //   )
  // }

  sendUrl() {
    this.showEvent = false;
    this.showIframe = true
    let playerUrl = `http://localhost:8000/buy-a-local-ticket/${this.eventId}` // try it first, if it doesn't work use the sanitized URL
    this.trustedDashboardUrl = this._sanitizer.bypassSecurityTrustResourceUrl(playerUrl);
    this.iframeURL = this.trustedDashboardUrl;
    console.log( this.iframeURL)
}

  getOpenEventDetails(){
    const eventId = this.eventId
    this.paymentService.getOpenEventDetails(eventId).subscribe( (res:any) => {
      this.eventDetails = res;
      console.log(this.eventDetails)
    })
  }

}
