import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  isShowDiv = false;  
  showturf = false;
  data: any[] = [];
  pagedItems: any[] = [];
  pager: any = {};
  pageSize: number = 10;
  searchForm: FormGroup;


  punavale =[
      {
        id:1,
        address:'punawale'
      },
      {
        id:2,
        address:'punawale'
      },
      {
        id:3,
        address:'punawale'
      },
      {
        id:4,
        address:'punawale'
      },
      {
        id:5,
        address:'punawale'
      }
      
    
  ]
    
  
  
  constructor(public fb:FormBuilder) {
    this.searchForm = this.fb.group({
      
      area: [''],
        turfname:['']
  
    });
   }

  ngOnInit(): void {

    this.setPage(1);
  }

  toggleDisplayDiv(){
    this.isShowDiv = !this.isShowDiv;  
    this.showturf = false;
  }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pager = this.getPager(this.punavale.length, page);
    this.pagedItems = this.punavale.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages = Array.from(Array(totalPages).keys()).map(i => i + 1);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  onSubmit()
  {
      // alert('form')
      this.showturf = true;
      this.isShowDiv = false;
  }

  onBooking(){
    
  }
}
