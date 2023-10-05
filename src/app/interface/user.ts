export interface User {
  id: string;
  name: string;
  password: string;
  repassword: string;
  email: string;
  gender: string;
  role: string;
  isActive: boolean;
  comment: string;
}

export interface Claimer {
  pImg: File;
  cName: string;
  cCaste: string;
  cReligion: string;
  cSect: string;
  candidateDateOfBirth: Date;
  cFamily: number;
  cBrothers: number;
  cBrojob: number;
  cSisters: number;
  cSisjob: number;
  cResadd: string;
  cFname: string;
  cFcon: string;
  cFcnic: string;
  cFjob: string;
  cFincome: number;
  oIncome: number;
  allIncome: number;
  stuGrade: string;
  sInstituteName: string;
  iAddress: string;
  iAuthorityName: string;
  iAuthorityEmail: string;
  iAuthorityCon: string;
  uploadAdmissionnF: File;
  feeSlip: File;
  iMonFee: number;
  feeVoucher: number;
  cash: boolean;
  online: boolean;
  certify: boolean;
  refOName: string;
  refOCnic: string;
  refOCont: string;
  refODos: Date;
  refTName: string;
  refTCnic: string;
  refTCont: string;
  refTDoa: Date;
}