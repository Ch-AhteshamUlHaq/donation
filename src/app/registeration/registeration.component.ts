import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { User, Claimer } from '../interface/user';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterationComponent implements OnInit {

  submitted = false;

  public showPassword: boolean = false;

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  registerForm: FormGroup = this.builder.group({
  
    id: [null, [Validators.required, Validators.minLength(5)], Validators.maxLength(20)],
    name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
    password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    repassword: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    email: [
      null,
      [
        Validators.required,
        Validators.maxLength(256),
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ],
    ],
    gender: ['male', [Validators.required]],
    role: [''],
    isActive: [false],
    comment: [''],
  });

  proceedRegister(): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.service.registerUser(this.registerForm.value).subscribe((result) => {
        this.toastr.success('Please contact admin for enable access.', 'Registered Successfully');
        this.router.navigate(['login']);
      });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}
}
