import { Component, OnInit } from '@angular/core';
import { EventService } from '../_services/event.service';
import { SocialEvent } from '../_models/SocialEvent';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents: SocialEvent[];

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this._eventService.getSpecialEvents().subscribe(res => {
      this.specialEvents = res;
    }, error => {
      console.log(error);
    });
  }

}
