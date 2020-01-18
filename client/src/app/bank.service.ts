import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  namesList;
  branchNumbers: any;
  bankDetails: any;
  srcMap;
  errorInform: boolean;
  errMsg: string;
  constructor(private httpClient: HttpClient) { }

  getBankNames(char) {
    this.httpClient.get(`http://localhost:3000/names/${char}`)
      .subscribe((res) => {
        console.log(new Set([].concat(...Object.values(res))));
        this.namesList = Array.from(new Set([].concat(...Object.values(res)))); // remove dup

      },
        (err) => {
      
          console.log(err)
        });
  }

  getBranchNums(bankName) {
    this.httpClient.get('http://localhost:3000/branch/' + bankName)
      .subscribe((res) => { this.branchNumbers = res; },
        (err) => { console.log(err) }
      );
  }
  getDetails(bankName, branchNumber) {
    return this.httpClient.get(`http://localhost:3000/details/${bankName}/${branchNumber}`)
      .subscribe((res) => {
        this.bankDetails = res[0];
        let address = this.bankDetails.City.toString() + " " + this.bankDetails.Branch_Address.toString()
        console.log(this.bankDetails.City.toString().replace(" ", "%20"))
        this.srcMap = `https://maps.google.com/maps?q=${address}&t=&output=embed`
        console.log(this.srcMap)

        this.errorInform = false;


      },
        (err) => {
          console.log(err)
          this.errorInform = true;
          this.errMsg = "invalid bank number"
        });
  }
}
