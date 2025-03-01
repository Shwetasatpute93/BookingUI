import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/services/apiservice.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  public getdata :any;
  turfid :any;
  turfname:any;
  constructor(private router: Router, private api: ApiserviceService) { }

  ngOnInit(): void {

    // this.turfid = localStorage.getItem('regid');
    // this.turfname = localStorage.getItem('turfname');
    
  }

}
