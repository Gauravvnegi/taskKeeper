import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: UserAuthService
  ) {}

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let username: string = this.emailVal.value;
      let password: string = this.passVal.value;

      console.log(username);
      console.log(password);

   
      this.auth.login(username, password).subscribe(
        (res) => {
          this.router.navigate(['dashboard']);
          localStorage.setItem('isLogged', 'true');
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
        },
        (err) => {
          alert("Wrong Details");
          this.router.navigate(['login']);
        }
        
      );

    }
    else{
      alert('Please fill correct details');
    }
  }

  get passVal() {
    return this.loginForm.get('password');
  }

  get emailVal() {
    return this.loginForm.get('email');
  }
}

   //      username: 'emilys',
      //   password: 'emilyspass',
    

