import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ApiserviceService } from 'src/services/apiservice.service';
import { WindowRef } from 'src/services/razorpay.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  providers: [WindowRef, DatePipe]
})
export class LocationComponent implements OnInit {

  selectedSlot: string = '';
  isShowDiv = false;  
  showturf = false;
  data: any[] = [];
  pagedItems: any[] = [];
  pager: any = {};
  pageSize: number = 10;
  // searchForm: FormGroup;
  date = new Date();
  public turfForm!: FormGroup;
  details: any;
  address:any;
  rate = 100;
  amount = 0;
  total = 0;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value:any;
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
    
  timeSlots: { [key: string]: string[] } = {
    Morning: ["06-07 am", "07-08 am", "08-09 am", "09-10 am" ],
    Afternoon: ["10-11 am", "11-12 pm", "12-01 pm", "01-02 pm"],
    Evening: ["02-03 pm", "03-04 pm", "04-05 pm", "05-06 pm"],
    Night: ["06-07 pm", "07-08 pm", "08-09 pm", "09-10 pm"]
  };

  timeSlotRates: { [key: string]: number } = {
    Morning: 900,
    Afternoon: 600,
    Evening: 700,
    Night: 1200
  };

  slots = ['Morning', 'Afternoon', 'Evening', 'Night'];

    constructor(private route: ActivatedRoute, private router: Router,public fb : FormBuilder,private api: ApiserviceService, private winRef: WindowRef, private datePipe: DatePipe) {

      
     }
  // constructor(public fb:FormBuilder) {
  //   this.searchForm = this.fb.group({
      
  //     area: [''],
  //     turfname:['']
  
  //   });
  //  }

  ngOnInit(): void {
  
    // console.log(this.total);
    // this.value = 'upi://pay?pa=shwetasatpute93-1@okhdfcbank&pn=SportsTeam&am='+this.total+'&cu=INR';
    // console.log(this.value);
    this.turfForm = this.fb.group({
      regid : ['', Validators.required],
      firstname: ['', Validators.required],
      mobileno: ['', Validators.required],
      slotType : ['', Validators.required],
      timeslots: ['', Validators.required],
      amount:['', Validators.required],
      rate: [ this.rate , Validators.required],
      total:['', Validators.required]
    
    });

    this.getDetails();

    this.setPage(1);   

  }

  toggleDisplayDiv(){
    this.isShowDiv = !this.isShowDiv;  
    this.showturf = false;
  }

   // Getter to dynamically filter slots based on selection
   get filteredSlots(): string[] {
    

    // return this.selectedSlot ? this.timeSlots[this.selectedSlot] : [];
    return this.selectedSlot ? this.timeSlots[this.selectedSlot as keyof typeof this.timeSlots] || [] : [];

    
  }

  // Handle radio button change
  onSlotTypeChange(event: any) {
    this.selectedSlot = event.target.value; // Update selected slot type
    // alert(this.selectedSlot);
    this.turfForm.controls['timeslot']?.setValue(''); // Reset dropdown selection
   
  }

  onTimeSlotChange(event: any) {
    const selectedTimeSlot = event.target.value;
    this.turfForm.controls['amount'].setValue(this.timeSlotRates[selectedTimeSlot] || 0);
    this.turfForm.controls['total'].setValue(this.timeSlotRates[selectedTimeSlot] + this.rate || 0);
  }
 

  getDetails(){

    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      // console.log('ID:', id);
      
        this.api.post('/RegisterAdminApi/getTurfDetails', {id:id}).subscribe((res:any) => {

          this.details = res.Data;
          // console.log(this.details)
          this.address = this.details[0].address+ " " + this.details[0].area + " " +this.details[0].city + " " + this.details[0].pincode;
         
        })
    });

    // console.log(this.datePipe.transform(this.date, 'dd-MM-yyyy'));
    
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

  // onBooking(){
   
  //   // let finalObj = {
  //   //     regid: this.turfForm.value.id,
  //   //     firstname: this.turfForm.value.firstname,
  //   //     mobileno : this.turfForm.value.mobileno,
  //   //     timeslots : this.turfForm.value.timeslots,
  //   //     total : this.turfForm.value.total
  //   // }
  //   const paymentData = {
  //     regid: this.turfForm.value.regid,
  //     firstname: this.turfForm.value.firstname,
  //     mobileno: this.turfForm.value.mobileno,
  //     slottype : this.selectedSlot,
  //     timeslots: this.turfForm.value.timeslots,
  //     amount : this.turfForm.value.amount,
  //     rate: this.rate,
  //     total: this.turfForm.value.total, 
  //     transactionId: '0000003', // Store transaction ID
     
  //     // status: 'success'
  //   };

  //   // console.log(paymentData);

  //   let seq = this.api.post('/SportApi/SaveCustInfo',paymentData);  
  //   seq.subscribe((res: any) => {
  //     // console.log(res?.status == 'error');
  //    if(res?.status == 'error'){
  //      alert('This timeslots already Booked..');
  //    }
  //    else{

  //     alert('Register Successfully');
  //     // window.location.href = `https://api.whatsapp.com/send?phone=+91-9552297115&text=*Customer%20Name*%20:%20${encodeURIComponent(obj.cust_name)}%0A*Mobileno*%20:%20${encodeURIComponent(obj.mobileno)}%0A*Services*%20:%20${encodeURIComponent(this.service)}%0A*Categories*%20:%20${encodeURIComponent(categories)}%0A*Address*%20:%20${encodeURIComponent(obj.address)}`;
  //     // this.router.navigate(['/landing']);


  //     let options:any = {
  //       "key": "rzp_live_D2PhkP9FSEmg2h",
  //       "amount": 100,
  //       "name": "Shwetas Project",
  //       "description": "dummy data",
  //       "image": "./assets/images/logo.png",
  //       // "orderid": "",
  //       "modal": {
  //         "escape": false
  //       }, 
  //       "prefill": {
  //         "name": paymentData.firstname,
  //         "contact": "",
  //         "email": "",
  //         // "method": 'card',
  //         // 'card[number]': "",
  //         // 'card[expiry]': "",
  //         // 'card[cvv]': ""
  //       },
  //       "notes": {
  //         "address": ""
  //       },
  //       "theme": {
  //         "color": "#bfb326"
  //       }
  //     };
  //     options.handler = ((response: any) => {
  //         options['payment_response_id'] = response.razorpay_payment_id;
  
  //         const transactionid = options['payment_response_id'];
  
  //         console.log('razorpay_payment_id' + options['payment_response_id'])
  //         // this.paymentService.payWithRazor({cart: finalObj, payment: options});
  
  //         // const paymentData = {
  //         //   regid: this.turfForm.value.id,
  //         //   firstname: this.turfForm.value.firstname,
  //         //   mobileno: this.turfForm.value.mobileno,
  //         //   slotype : this.turfForm.value,
  //         //   timeslots: this.turfForm.value.timeslots,
  //         //   amount : this.turfForm.value.amount,
  //         //   rate: this.rate,
  //         //   total: options.amount / 100, // Convert paise to rupees
  //         //   transactionId: transactionid, // Store transaction ID
           
  //         //   // status: 'success'
  //         // };
  
            
  //       //  this.savePaymentDetails(paymentData);
  //     });
  //     // options.modal.ondismiss = (() => {
  //     //     this.loginService.SetLoader = false;
  //     // });
  //     let rzp = new this.winRef.nativeWindow.Razorpay(options);
  //     rzp.open();
  //    }

  //    });
  // } 


// savePaymentDetails(paymentData:any){

//     // console.log(paymentData);
//     let seq = this.api.post('/SportApi/SaveCustInfo',paymentData);  
//     seq.subscribe((res: any) => {
//       console.log(res);
//       // this.regsadmin = res?.data;
//       // console.log(this.regsadmin);

//       alert('Register Successfully');
//       // window.location.href = `https://api.whatsapp.com/send?phone=+91-9552297115&text=*Customer%20Name*%20:%20${encodeURIComponent(obj.cust_name)}%0A*Mobileno*%20:%20${encodeURIComponent(obj.mobileno)}%0A*Services*%20:%20${encodeURIComponent(this.service)}%0A*Categories*%20:%20${encodeURIComponent(categories)}%0A*Address*%20:%20${encodeURIComponent(obj.address)}`;
//       // this.router.navigate(['/landing']);
//     });
//   } catch (error: any) {
//     console.error('Error during form submission:', error);
//     alert('An error occurred while submitting the form. Please try again.');
//   }

get firstname() {
  return this.turfForm.get('cust_name');
}

get mobileno() {
  return this.turfForm.get('mobileno');
}

onBooking() {

  // if (this.turfForm.invalid) {
  //   // console.log('Invalid Form:', this.registerform.controls);
  //   this.turfForm.markAllAsTouched();
  //   // alert('Form is not valid');
  //   return;
  // }

  const paymentData = {

    regid: this.turfForm.value.regid,
    firstname: this.turfForm.value.firstname,
    mobileno: this.turfForm.value.mobileno,
    slottype: this.selectedSlot,
    timeslots: this.turfForm.value.timeslots,
    amount: this.turfForm.value.amount,
    rate: this.rate,
    total: this.turfForm.value.total,
    transaction_id: '', // Placeholder for transaction ID
    status: 'pending', // Default status before payment
    booking_date : this.datePipe.transform(this.date, 'dd-MM-yyyy')
  };

  // Save initial pending status
  this.api.post('/SportApi/SaveCustInfo', paymentData).subscribe((res: any) => {
    if (res?.status === 'error') {
      alert('This timeslot is already booked.');
    } else {
      alert('Registered Successfully, Proceeding to Payment...');

      let options: any = {
        key: "rzp_live_D2PhkP9FSEmg2h",
        amount: 100, // Convert amount to paise
        name: "Shwetas Project",
        description: "Booking Payment",
        image: "./assets/images/logo.png",
        prefill: {
          name: paymentData.firstname,
          contact: paymentData.mobileno,
          email: ""
        },
        theme: {
          color: "#bfb326"
        },
        handler: (response: any) => {
          // console.log("Payment Successful:", response.razorpay_payment_id);

          // Update transaction ID and status
          const cust_payId =res?.last_id;
          // paymentData.transaction_id = response.razorpay_payment_id;
          // paymentData.status = "success";
          const updatedPaymentData = {
            ...paymentData,
            transaction_id: response.razorpay_payment_id,
            status: "success"
          };

          // Save updated payment details
          this.api.post('/SportApi/UpdatePaymentStatus', { cust_payId, ...updatedPaymentData }).subscribe(() => {
            alert("Payment Successful! Booking Confirmed.");
            // console.log(res);
            this.router.navigate(['/confirmation'], { queryParams: { transaction_id: res?.data?.transaction_id } }); // Redirect to confirmation page
          });
        },
        modal: {
          ondismiss: (response:any) => {
            // console.log("Payment cancelled by user.");

            // Update status as pending
            // paymentData.transaction_id = 'CancelPayment_000';
            // paymentData.status = "pending";
            const cust_payId =res?.last_id;
            // alert(cust_payId);
            const updatedPaymentData = {
              ...paymentData,
              transaction_id: 'CancelPayment_000',
              status: "pending"
            };
            // console.log(updatedPaymentData);
            this.api.post('/SportApi/UpdatePaymentStatus', {cust_payId, ...updatedPaymentData }).subscribe((res :any) => {
              alert("Payment Not Completed. Status: Pending.");
              // console.log(res);
              this.router.navigate(['/confirmation'], { queryParams: { transaction_id: res?.data?.transaction_id } });
            });
          }
        }
      };

      let rzp = new this.winRef.nativeWindow.Razorpay(options);
      rzp.open();
    }
  });
}



}

