import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class EventService {
  baseUrl = environment.apiUrl;
  eventsURL = this.baseUrl + '/events';
  speacialEventsURL = this.baseUrl + '/special';

  constructor(private http: HttpClient) { }

  getEvents() {
      return this.http.get<any>(this.eventsURL);
  }

  getSpecialEvents() {
    return this.http.get<any>(this.speacialEventsURL);
  }

}
