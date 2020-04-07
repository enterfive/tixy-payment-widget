import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  getOpenEventDetails(event_id: string){
    return this.http.post(`${environment.baseUrl}/open_event_details`,
    {
      event_id
    })
  }

  getOpenTicketCategory(event_id: string){
    return this.http.post(`${environment.baseUrl}/open_ticket_categories`,
    {
      event_id
    })
  }

  buyTicket(
    event_id: string, 
    buyer: {
      first_name :string,
      last_name: string,
      email: string,
      amount: string,
      number_of_tickets: string,
      fees: string
    },
    attendees: [
      {
        first_name: string,
        last_name: string,
        email: string,
        ticket_category_id: string
      }
    ]
    ){
      return this.http.post(`${environment.baseUrl}/buy_ticket`,
      {
        event_id,
        buyer,
        attendees
      })
  }

  ticketPurchaseCallback(
    order_id: string, 
    transaction_reference: string, 
    payment_platform: string
    ){
    return this.http.post(`${environment.baseUrl}/ticket_purchase_callback`,
    {
      order_id,
      transaction_reference,
      payment_platform
    })
  }

}
