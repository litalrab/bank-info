import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { BankService } from '../bank.service';

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
  errorInform;
  errMsg: string;
  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private bankService: BankService
  ) {
    this.bankName = '';
    this.isFormfull = false;
    this.errorInform = false;
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

  }
  chooseBranchNum(e) {
    this.branchNumber = e.target.value;
    if (this.bankName && this.branchNumber)
      this.isFormfull = true;
    else {
      this.errorInform = true;
      this.errMsg = "please fill in name first"

    }
  }

  getBankNames(event) {
    let char = event.target.value;
    if (char)
      this.bankService.getBankNames(char);
    if (!this.bankService.namesList) {
      this.errorInform = true;
      this.errMsg = "invalid bank name"
    }
    else {
      this.errorInform = false;
    }
  }

  onSubmit() {
    this.isFormfull = false;
    if (this.bankName && this.branchNumber)
      this.bankService.getDetails(this.bankName, this.branchNumber)[0];
      if (!this.bankService.bankDetails) {
        this.errorInform = true;
        this.errMsg = "invalid bank number"
      }
      else {
        this.errorInform = false;
      }
      // this.httpClient.get(`http://localhost:3000/details/${this.bankName}/${this.branchNumber}`)
    //   .subscribe((res) => {
    //     this.bankDetails = res[0];
    //     console.log(this.bankDetails)
    //   });

  }
}
