import { Component, Input, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { ChatClass } from 'src/app/structures/chat-d-struc';
import { Router } from '@angular/router';


// just an interface for type safety.
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

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  // Radius
  @Input() radiusOfChats = 50000;
  radiusLat = 0;
  radiusLong = 0;
 
  @Input() closeChats: ChatClass[] = [];

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
        this.radiusLat = this.latitude;
        this.radiusLong = this.longitude;
        this.zoom = 6;
       
        for(let i=1;i<50;i++){
          this.markers.push(
            {
              lat: this.latitude+Math.random(),
              lng: this.longitude+Math.random(),
              label: `${i}`,
              draggable: false,
              content: `Content no ${i}`,
              isShown:false,
              icon:'./assets/marker-red.png'
            }
          );
        }

      });
    }
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  radiusDragEnd($event: any) {
    console.log($event);
    this.radiusLat = $event.coords.lat;
    this.radiusLong = $event.coords.lng;
    this.showHideMarkers();
  }

  event(type,$event) {
    console.log(type,$event);
    this.radiusOfChats = $event;
    this.showHideMarkers();
  }

  showHideMarkers(){
    Object.values(this.markers).forEach(value => {
      value.isShown = this.getDistanceBetween(value.lat,value.lng,this.radiusLat,this.radiusLong);
    });
  }

  getDistanceBetween(lat1,long1,lat2,long2){
    var from = new google.maps.LatLng(lat1,long1);
    var to = new google.maps.LatLng(lat2,long2);

    if(google.maps.geometry.spherical.computeDistanceBetween(from,to) <= this.radiusOfChats){    
      console.log('Radius',this.radiusOfChats);
      console.log('Distance Between',google.maps.geometry.spherical.computeDistanceBetween(
        from,to
      ));
      return true;
    }else{
      return false;
    }
  }
  goToPage(pageName: string, additional: any){
    this.router.navigate([`${pageName}`, additional])
  }
  
}