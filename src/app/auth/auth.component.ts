import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error : string =null;

  constructor(private authService : AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form:NgForm)
  {
    if(!form.valid)
    {
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    let obsAuth :  Observable<AuthResponseData>;

    if(this.isLoginMode){
      obsAuth = this.authService.login(email,password);
    }
    else{
      obsAuth = this.authService.signUp(email,password);
    }
    obsAuth.subscribe(
      resdata => {
        console.log(resdata);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => 
      {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
    
  }
  onHandleError()
  {
    this.error = null;
  }
}
