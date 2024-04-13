import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../services/service';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})

export class TimelineComponent implements OnInit {
  @ViewChild('timeline') timeline!: ElementRef;

  events: any;
  selectedEvent: any;
  filteredEvents: any[] = [];
  searchKeyword: any;
  dialogRef: any;
  currentScale = 1.0;
  maxZoomLevel = 2.0;
  minZoomLevel = 0.5;

  constructor(private eventService: EventService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents()
      .subscribe(events => {
        this.events = events
        this.filteredEvents = this.events;
      });
  }

  showEventDetails(event: any): void {
    this.dialogRef = this.dialog.open(EventDetailsComponent, {
      data: event
    });
  }

  zoomIn() {
    if (this.currentScale < this.maxZoomLevel) {
      this.currentScale += 0.1;
      this.applyZoomTransform();
    }
  }

  zoomOut() {
    if (this.currentScale > this.minZoomLevel) {
      this.currentScale -= 0.1;
      this.applyZoomTransform();
    }
  }

  private applyZoomTransform() {
    this.timeline.nativeElement.style.transform = `scale(${this.currentScale})`;
  }

  searchEvents() {
    this.filteredEvents = this.events.filter((event: any) =>
      event.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }

}
