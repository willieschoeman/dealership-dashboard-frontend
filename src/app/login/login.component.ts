import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private userForm: FormGroup
  private errorMgs: string
  private isLoading: boolean
  private isSubmitted: boolean

  constructor(private router: Router, 
      formBuilder: FormBuilder,
      private loginService: LoginService) {

        this.isLoading = true
        this.isSubmitted = false;

    this.userForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.isLoading = true
    this.errorMgs = ''
    setTimeout( () => { this.isLoading = false }, 1000 )
  }

  get formControls() {
    return this.userForm.controls
  }

  login() {

    this.isSubmitted = true;

    if (this.userForm.invalid) {
      return
    }

    this.isLoading = true
    this.errorMgs = ''

    const payload = { 
      'username': this.userForm.get("username").value, 
      'password': this.userForm.get("password").value
    }

    this.loginService.authenticate(payload)
      .subscribe(res => {

        if (res.success) {
          sessionStorage.setItem("USERNAME", this.userForm.get("username").value)
          sessionStorage.setItem("DEALERID", res.dealerId)
          this.loginService.updateAuth(true)
          this.router.navigate(['stock'])
          this.isLoading = false
          this.isSubmitted = false;
        } else {
          this.router.navigate(['login'])
          this.isLoading = false
          this.isSubmitted = false;
          this.errorMgs = 'Unable to authenticate!'
        }
      },
      error => {
         this.isLoading = false
         this.isSubmitted = false;
         this.errorMgs = 'Unable to authenticate!'
      });

      this.userForm.reset()

  }

}

