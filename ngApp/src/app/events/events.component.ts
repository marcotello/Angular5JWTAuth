import { Component, OnInit } from '@angular/core';
import { EventService } from '../_services/event.service';
import { SocialEvent } from '../_models/SocialEvent';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: SocialEvent[];

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this._eventService.getEvents().subscribe(res => {
      this.events = res;
    }, error => {
      console.log(error);
    });
  }

}
