import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { UserPage } from '../user/user';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) {}

  ionViewWillLoad(){
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }
//Tries to log user in with email & password
  //Otherwise, catches error
  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      console.log(res);
      this.navCtrl.push(UserPage);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }
//Tries to log user in with Facebook account
  //Otherwise, catches error
  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then((res) => {
      this.navCtrl.push(UserPage);
    }, (err) => {
      this.errorMessage = err.message;
    });
  }
//Tries to log user in with google account
  //Otherwise, catches error
  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then((res) => {
      this.navCtrl.push(UserPage);
    }, (err) => {
      this.errorMessage = err.message;
    });
  }

  goRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

}
