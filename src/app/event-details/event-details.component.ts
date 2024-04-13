import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  selectedEvent: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) {
    this.selectedEvent = data
  }

  getSafeUrl(videourl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videourl.replace('watch?v=', 'embed/'));
  }

}
