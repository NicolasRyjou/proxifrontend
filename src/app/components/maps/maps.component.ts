import { Component, OnInit, ViewChild, Input } from '@angular/core'
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { ChatClass } from 'src/app/structures/chat-d-struc';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
})
export class MapsComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  @Input() markers: ChatClass[] = [];
  @Input() radiusOfChats = 0;
  center;
  lat = 51.678418;
  lng = 7.809007;

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
    
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }

  openInfo(marker: MapMarker, content) {
    this.info.open(marker)
  }
}