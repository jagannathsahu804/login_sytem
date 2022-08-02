import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(private service:ApiserviceService, private router:Router) { }
  errmsg:any
  errmsgshow=false;
  data:any;
  ngOnInit(): void {
    this.service.transactions().subscribe((res)=>{
      console.log(res,"res###");

      if(res.status == false){
        this.errmsgshow = true;
        this.errmsg = 'Access denied!';
      }else{
        this.data = res.data;
        console.log(this.data,'tutorialdata##');
      }
    })
  }

}
