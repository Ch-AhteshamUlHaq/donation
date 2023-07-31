import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-raiseclaim',
  templateUrl: './raiseclaim.component.html',
  styleUrls: ['./raiseclaim.component.scss']
})
export class RaiseclaimComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  profilePicture: any;
  admissionFileName: string | null = null;
  feeSlipFileName: string | null = null;

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    sessionStorage.clear();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
    this.setupClaimForm();
  }

  claimForm: FormGroup = new FormGroup({}); // Define the type explicitly

  setupClaimForm(): void {
    this.claimForm = this.builder.group({
      pImg: [null, [Validators.required]],
      cName: [null, [Validators.required]],
      cCaste: [null, [Validators.required]],
      cReligion: [null, [Validators.required]],
      cSect: [null, [Validators.required]],
      candidateDateOfBirth: [null, [Validators.required]],
      cFamily: [null, [Validators.required]],
      cBrothers: [null, [Validators.required]],
      cBrojob: [null, [Validators.required]],
      cSisters: [null, [Validators.required]],
      cSisjob: [null, [Validators.required]],
      cResadd: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(35)]],
      cFname: [null, [Validators.required]],
      cFcon: [null, [Validators.required]],
      cFcnic: [null, [Validators.required]],
      cFjob: [null, [Validators.required]],
      cFincome: [null, [Validators.required]],
      oIncome: [null, [Validators.required]],
      allIncome: [null, [Validators.required]],
      stuGrade: [null, [Validators.required]],
      sInstituteName: [null, [Validators.required]],
      iAddress: [null, [Validators.required]],
      iAuthorityName: [null, [Validators.required]],
      iAuthorityEmail: [null, [Validators.required, Validators.email]],
      iAuthorityCon: [null, [Validators.required]],
      uploadAdmissionnF: [null, [Validators.required]],
      feeSlip: [null, [Validators.required]],
      iMonFee: [null, [Validators.required]],
      feeVoucher: [null, [Validators.required]],
      cash: [false, [Validators.required]],
      online: [false, [Validators.required]],
      certify: [false, Validators.requiredTrue],
      refOName: [null, [Validators.required]],
      refOCnic: [null, [Validators.required]],
      refOCont: [null, [Validators.required]],
      refODos: [null, [Validators.required]],
      refTName: [null, [Validators.required]],
      refTCnic: [null, [Validators.required]],
      refTCont: [null, [Validators.required]],
      refTDoa: [null, [Validators.required]],
    });
  }

  onProfilePictureChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files) {
      const file = fileInput.files.item(0);
      if (file) {
        this.getBase64(file).then(base64 => {
          this.profilePicture = base64;
        });
      }
    }
  }

  getBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  demandFund() {
    if (this.claimForm.valid) {
      this.service.postClaim(this.claimForm.value)
        .subscribe(res => {
          // console.log(res);
          this.toastr.success('Ticket added successfully');
        }, err => {
          this.toastr.error('Error while raising ticket');
        });
    }
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files?.[0];
    if (file) {
      if (controlName === 'uploadAdmissionnF') {
        this.admissionFileName = file.name;
      } else if (controlName === 'feeSlip') {
        this.feeSlipFileName = file.name;
      }
      this.claimForm.get(controlName)?.setValue(file);
    }
  }

  onSubmit() {
    if (this.claimForm.valid) {
      const formData = new FormData();

      // Append the profile picture if it exists
      const profilePictureFile = this.claimForm.get('pImg')?.value;
      if (profilePictureFile) {
        formData.append('pImg', profilePictureFile);
      }

      // Append the admissionForm if it exists
      const admissionFormFile = this.claimForm.get('uploadAdmissionnF')?.value;
      if (admissionFormFile) {
        formData.append('admissionForm', admissionFormFile);
      }

      // Append the voucher if it exists
      const voucherFile = this.claimForm.get('feeSlip')?.value;
      if (voucherFile) {
        formData.append('voucher', voucherFile);
      }

      // Append other form data
      formData.append('cName', this.claimForm.get('cName')?.value);
      formData.append('cCaste', this.claimForm.get('cCaste')?.value);
      // ... Append other form controls

      // Now you can use the formData object to send the file data and other form data to the server using an HTTP request.
      // For example:
      // this.service.postFormData(formData).subscribe(...);
    }
  }
}