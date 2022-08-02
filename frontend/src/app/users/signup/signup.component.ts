import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private service:ApiserviceService,private router:Router) { }
  errmsg:any;
  errmsgshow=false;
  signupForm = new FormGroup({
    name:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  })

  ngOnInit(): void {
  }

  signupSubmit(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value,'signupform###');
      this.errmsgshow = false;

      //callapi
      this.service.signup(this.signupForm.value).subscribe((res)=>{
        console.log(res,'res##')
        if(res.status==true){
          this.router.navigate(['login']);
        }else{
          this.errmsgshow = true;
          this.errmsg = res.msg;
        }
      })
    }else{
      this.errmsgshow = true;
      this.errmsg = 'Please enter proper details !!'
    }
  }
  // get email(){return this.signupForm.get('email')}

}
