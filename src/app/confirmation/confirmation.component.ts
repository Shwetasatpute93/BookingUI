import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  transaction_id :any;
  isShowDiv = false; 
  isShowconfirm = false; 
  constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.queryParams.subscribe(params => {
    // console.log(params['transaction_id']); // Output: 12345
    this.transaction_id = params['transaction_id'];

     if(this.transaction_id == 'CancelPayment_000'){
      this.isShowDiv = true;
      this.isShowconfirm = false;
     }else{
      this.isShowDiv = false;
      this.isShowconfirm = true;
     }
  });
}

}
