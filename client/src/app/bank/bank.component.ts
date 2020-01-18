import { Component, OnInit, Input, NgZone, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { BankService } from '../bank.service';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import {DomSanitizer} from '@angular/platform-browser'
declare var google: any;

 
@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  @Input() fieldvalue = '';
  bankName;
  checkoutForm;
  branchNumber
  isFormfull;
  bankDetails;




  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder,
    private ngZone: NgZone,public sanitizer:DomSanitizer, private bankService: BankService
  ) {
    this.bankName = '';
    this.isFormfull = false;
    //this.errorInform = false;
    this.checkoutForm = this.formBuilder.group({
      name: '',
      branch: ''
    });
  }

  ngOnInit() {
  }

  getBranchNums(e) {
    this.bankName = e.target.value;
    if (this.bankName)
      this.bankService.getBranchNums(this.bankName);
      if(!this.bankService.namesList)
      {
        this.bankService.errorInform = true;
        this.bankService.errMsg = "invalid bank name"
      }
      else
      {
        this.bankService.errorInform = false;

      }
  }
  chooseBranchNum(e) {
    this.branchNumber = e.target.value;
    if (this.bankName && this.branchNumber)
      this.isFormfull = true;
    else {
      this.bankService.errorInform = true;
      this.bankService.errMsg = "please fill in name first"

    }
  }

  getBankNames(event) {
    let char = event.target.value;
    if (char)
      this.bankService.getBankNames(char);

  }

  onSubmit() {
    this.isFormfull = false;
    if (this.bankName && this.branchNumber)
      this.bankService.getDetails(this.bankName, this.branchNumber)[0];
    
    // this.httpClient.get(`http://localhost:3000/details/${this.bankName}/${this.branchNumber}`)
    //   .subscribe((res) => {
    //     this.bankDetails = res[0];
    //     console.log(this.bankDetails)
    //   });

  }
}
