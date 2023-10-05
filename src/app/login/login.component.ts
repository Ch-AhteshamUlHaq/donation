import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { User, Claimer } from '../interface/user';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public showPassword: boolean = false;

  signInForm: FormGroup | undefined;

  constructor(private builder: FormBuilder, private service: AuthService, private toastr: ToastrService, private router: Router) {
    sessionStorage.clear()
  }

  result: any;
  loginForm = this.builder.group({
    id: this.builder.control('', Validators.required),
    pass: this.builder.control('', Validators.required),
  });

  proceedLogin() {
    if (this.loginForm.valid) {
      const id = this.loginForm.value.id!;
      this.service.getUserByCode(id).subscribe((item: any) => {
        this.result = item;
        if (this.result.password === this.loginForm.value.pass) {
          if (this.result.isActive) {
            this.toastr.success('User is active');
            sessionStorage.setItem('id', this.result.id);
            sessionStorage.setItem('role', this.result.role);
            this.router.navigate(['dashboard']);
          } else {
            this.toastr.warning('User is not active.','Please contact admin');
          }
        } else {
          this.toastr.warning('Invalid Credentials');
        }
      });
    } else {
      this.toastr.warning('Please Enter Valid Data');
    }
  }


  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {

  }

}
