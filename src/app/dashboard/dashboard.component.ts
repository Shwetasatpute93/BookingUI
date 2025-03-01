import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/services/apiservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public searchForm!: FormGroup;
  getalldata : any;
  getdata :any;
  searchText: any;
  constructor(private route: Router,public fb : FormBuilder, private api: ApiserviceService) {

        this.searchForm = this.fb.group({
      
      area: [''],
      // turfname:['']
  
    });
  }

  ngOnInit() {

    this.getturfname();
  }

  getturfname(){

      this.api.get('/RegisterAdminApi/Turfdetails').subscribe((res:any)=>{

        this.getalldata = res.Data;

        // console.log(this.getalldata);
      })

    }
    

    onSubmit(){

      let obj = {
        area : this.searchForm.value.area
      }

      this.api.post('/RegisterAdminApi/Turfnames', obj).subscribe((res:any)=>{

        this.getdata = res.Data;

        // console.log(this.getdata);
      })
    }async book(id:any){
      // alert(id);
      this.route.navigate(['/location'], { queryParams: { id: id } });
      
  
      
    }

}
