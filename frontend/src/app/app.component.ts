import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from './users/apiservice.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Transactions tracker';
  showmenu = false;
  timeoutId: any;
  userInactive: Subject<any> = new Subject();

  constructor(private service: ApiserviceService, private router: Router) {
    this.name = localStorage.getItem('username');
    if (this.token) {
      this.showmenu = true;
    } else {
      this.showmenu = false;
    }
    // console.log(this.showmenu);
    if(this.showmenu){
      this.checkTimeOut();
      this.userInactive.subscribe((message) => {
  
        alert(message);
        this.logout();
      }
      );
    }
  }
  token = this.service.getToken();
  name: any

  ngOnInit(): void {
    // console.log(this.token,'token');

    // this.name = localStorage.getItem('username');
    // if (this.token) {
    //   this.showmenu = true;
    // } else {
    //   this.showmenu = false;
    // }
  }

  logout() {
    console.log("logout");
    localStorage.clear();
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    })
  }

  //Check user inactivity and logout
  checkTimeOut() {
    this.timeoutId = setTimeout(
      () => this.userInactive.next("User has been inactive for 20s"), 20000
    );
    // this.logout();
  }

  @HostListener('window:keydown')
  @HostListener('window:mousedown')
  checkUserActivity() {
 
    clearTimeout(this.timeoutId);
 
    this.checkTimeOut();
  }
}
