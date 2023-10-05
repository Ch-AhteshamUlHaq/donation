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

  claimForm: FormGroup = new FormGroup({});

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
      cResadd: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(139)]],
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

  demandFund() {
    if (this.claimForm.valid) {
      this.service.postClaim(this.prepareFormData()).subscribe({
        next: (val: any) => {
          this.toastr.success('Form data submitted successfully');
          this.claimForm.reset();
          this.profilePicture = null;
          this.admissionFileName = null;
          this.feeSlipFileName = null;
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    } else {
      this.toastr.error('Please fill in all required fields');
    }
  }

  prepareFormData(): FormData {
  const claimData = new FormData();
  
    const profilePictureFile = this.claimForm.get('pImg')?.value;
    if (profilePictureFile) {
      claimData.append('pImg', profilePictureFile);
    }
  
    const admissionFormFile = this.claimForm.get('uploadAdmissionnF')?.value;
    if (admissionFormFile) {
      claimData.append('admissionForm', admissionFormFile);
    }
  
    const voucherFile = this.claimForm.get('feeSlip')?.value;
    if (voucherFile) {
      claimData.append('voucher', voucherFile);
    }
    claimData.append('cName', this.claimForm.get('cName')?.value);
    claimData.append('cCaste', this.claimForm.get('cCaste')?.value);
    claimData.append('cReligion', this.claimForm.get('cReligion')?.value);
    claimData.append('candidateDateOfBirth', this.claimForm.get('candidateDateOfBirth')?.value);
    claimData.append('cSect', this.claimForm.get('cSect')?.value);
    claimData.append('cFamily', this.claimForm.get('cFamily')?.value);
    claimData.append('cBrothers', this.claimForm.get('cBrothers')?.value);
    claimData.append('cBrojob', this.claimForm.get('cBrojob')?.value);
    claimData.append('cSisters', this.claimForm.get('cSisters')?.value);
    claimData.append('cSisjob', this.claimForm.get('cSisjob')?.value);
    claimData.append('cResadd', this.claimForm.get('cResadd')?.value);
    claimData.append('cFname', this.claimForm.get('cFname')?.value);
    claimData.append('cFcon', this.claimForm.get('cFcon')?.value);
    claimData.append('cFcnic', this.claimForm.get('cFcnic')?.value);
    claimData.append('cFjob', this.claimForm.get('cFjob')?.value);
    claimData.append('cFincome', this.claimForm.get('cFincome')?.value);
    claimData.append('oIncome', this.claimForm.get('oIncome')?.value);
    claimData.append('allIncome', this.claimForm.get('allIncome')?.value);
    claimData.append('stuGrade', this.claimForm.get('stuGrade')?.value);
    claimData.append('sInstituteName', this.claimForm.get('sInstituteName')?.value);
    claimData.append('iAddress', this.claimForm.get('iAddress')?.value);
    claimData.append('iAuthorityName', this.claimForm.get('iAuthorityName')?.value);
    claimData.append('iAuthorityEmail', this.claimForm.get('iAuthorityEmail')?.value);
    claimData.append('iAuthorityCon', this.claimForm.get('iAuthorityCon')?.value);
    claimData.append('iMonFee', this.claimForm.get('iMonFee')?.value);
    claimData.append('feeVoucher', this.claimForm.get('feeVoucher')?.value);
    claimData.append('cash', this.claimForm.get('cash')?.value);
    claimData.append('online', this.claimForm.get('online')?.value);
    claimData.append('certify', this.claimForm.get('certify')?.value);
    claimData.append('refOName', this.claimForm.get('refOName')?.value);
    claimData.append('refOCnic', this.claimForm.get('refOCnic')?.value);
    claimData.append('refOCont', this.claimForm.get('refOCont')?.value);
    claimData.append('refODos', this.claimForm.get('refODos')?.value);
    claimData.append('refTName', this.claimForm.get('refTName')?.value);
    claimData.append('refTCnic', this.claimForm.get('refTCnic')?.value);
    claimData.append('refTCont', this.claimForm.get('refTCont')?.value);
    claimData.append('refTDoa', this.claimForm.get('refTDoa')?.value);

    return claimData;
  }
}
