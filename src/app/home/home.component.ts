import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  title: string = 'Shopping Website';
  content: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum';
  extracontent: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum';
  addi: string = 'assets/1.jpg';
  offerImage: string = 'assets/kids-Multiclick-web_5475334.webp';
  endImage: string ='assets/dress-fest-web--store-to-explore-2023-1-13-new-hp.webp';
  contImage: string ='assets/NzC375UGzQFU6cXmLH5VFG.jpg'
  fullnames: FormControl = new FormControl('', Validators.required);
  myemail: FormControl = new FormControl('', Validators.required);

  myphone: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d+$/),
    phoneValidator
  ]);

  isInvalid: boolean = false;
  isValid: boolean = false;

  itemImageUrl: string = 'assets/Women_Hero_Cat_Mob._SX414_QL85_FMpng_.png';
  fullName: string = '';


  constructor(private router: Router, config: NgbCarouselConfig, private toastr: ToastrService, private http: HttpClient) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
    
   }
   images = [
    {title: 'First Slide', short: 'First Slide Short', src: "assets/16-66-12256 (1).jpg"},
    {title: 'Second Slide', short: 'Second Slide Short', src: "assets/16-66-12258.jpg"},
    {title: 'Second Slide', short: 'Second Slide Short', src: "assets/16-66-12253.jpg"},
    
  ];

  ngOnInit(): void {
  }
  
  deleteHero() {
    this.router.navigate(['/about']);
  }
  setDirtyStatus() {
  this.isInvalid = this.fullnames.invalid && this.fullnames.touched;
    this.isValid = this.fullnames.valid;
  }
  
  onSubmit(formData: any) {
    const baseurl = environment.baseUrl;
    this.http.post(`${baseurl}/contact`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .subscribe(
      (data) => {
        console.log('API response:', data);
       
        this.toastr.success('Data submitted successfully!');
      },
      (error) => {
        console.error('API error:', error);
        const errorMessage = error.error.message || 'An error occurred during the API call';

        this.toastr.error(errorMessage);
      }
    );
  

   
  }
}
const phoneValidator: ValidatorFn = (control: AbstractControl) => {
  const pattern = /^\d+$/; // Only allow digits in the phone number
  if (pattern.test(control.value)) {
    return null; // Phone number is valid
  } else {
    return { phoneInvalid: true }; // Phone number is invalid
  }
};
