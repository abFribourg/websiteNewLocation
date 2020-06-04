import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  // --- maps ---
  // google maps zoom level
  zoom = 15;

  // initial center position for the map
  lat = (46.805924 + 46.800330) / 2;
  lng = (7.156395 + 7.153068) / 2;

  markers: Marker[] = [
    {
      lat: 46.805924,
      lng: 7.156395,
      label: 'Rue Saint-Michel 9',
      draggable: false
    },
    {
      lat: 46.800330,
      lng: 7.153068,
      label: 'Rue Hans-Fries 2',
      draggable: false
    }
  ];

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  ngOnInit(): void {
  }

}



// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
