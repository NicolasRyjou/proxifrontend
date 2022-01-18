import { Component, Input, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { ChatClass } from 'src/app/structures/chat-d-struc';
import { Router } from '@angular/router';
import { IconOptions } from '@angular/material/icon';

interface marker {
	lat: number;
	lng: number;
	label?: string;
  draggable: boolean;
  content?:string;
  isShown:boolean;
  icon:string;
}

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  public customMyLocationMarker = '../../../assets/icons/userLocationIcon.png';
  icon = {
    url: this.customMyLocationMarker,
    scaledSize: {
      width: 40,
      height: 40
    }
}
  

  @Input() closeChats: ChatClass[] = [];
  @Input() isClickableMarker: boolean = true;

  markers: marker[] = []
 
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private router: Router
  ) {

  }
 
  ngOnInit() {
    //load Map
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
    });
  }
  onMapReady(map?: google.maps.Map ){
    if(map)
      map.setOptions({
        streetViewControl: false
      });
  }
 
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  goToPage(pageName: string, additional: any){
    this.router.navigate([`${pageName}`, additional])
  }
  
}