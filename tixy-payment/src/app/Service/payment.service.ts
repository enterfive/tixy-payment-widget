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
}
