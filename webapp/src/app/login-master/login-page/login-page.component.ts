import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject,Observable } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from "src/app/service-master/UnsubscribeOnDestroyAdapter";
import { LoginMasterService } from "../login-master.service";
import { HttpServiceService } from "src/app/service-master/http-service.service";
import { LoginMaster } from "../login-master.model";
declare var grecaptcha: any;


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  authForm!: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  userName: string = '';
  private LoginMaster!: LoginMaster;
  login: boolean = false;
  username: string | undefined;
  showOtpInput: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginMasterService: LoginMasterService,
    private httpService: HttpServiceService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      empid: ["", Validators.required],
      password: ["", Validators.required],
      recaptchaResponse: [""],
      emailId: [""],
      otp: [{ value: '', disabled: true }, Validators.required]
    });
  }

  get f() {
    return this.authForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";

    if (this.authForm.invalid) {
      this.loading = false;
      this.error = "Invalid employeeid or password";
      return;
    }

    this.LoginMaster = new LoginMaster(
      this.f['empid'].value,
      this.f['password'].value
    );

    this.loginMasterService.login(this.LoginMaster).subscribe(
      (data) => {
        this.loading = false;

        if (data?.success) {
          this.router.navigate(["/register-master/list-register-page"]);
        } else {
          this.submitted = false;
          this.error = "Invalid Employee Id/Password";
          console.log(data.message);
        }
      },
      (error) => {
        this.submitted = false;
        this.loading = false;
        this.error = "Server Down!!!";
        console.log(error);
      }
    );
  }



  // onSubmit() {
  //   this.submitted = true;
  //   this.loading = true;
  //   this.error = "";
  
  //   if (this.authForm.invalid) {
  //     this.loading = false;
  //     this.error = "Invalid employeeid or password";
  //     return;
  //   }
  
  //   if (!this.showOtpInput) {
  //     // First Step: Verify empid + password
  //     this.LoginMaster = new LoginMaster(
  //       this.f['empid'].value,
  //       this.f['password'].value
  //     );
  
  //     this.loginMasterService.login(this.LoginMaster).subscribe(
  //       (data) => {
  //         this.loading = false;
  
  //         if (data?.success) {
  //           // Now, hide password input and show OTP input
  //           this.showOtpInput = true;
  //           this.authForm.get('password')?.disable(); // disable password
  //           this.authForm.get('otp')?.enable(); // enable otp
  //         } else {
  //           this.submitted = false;
  //           this.error = "Invalid Employee Id/Password";
  //           console.log(data.message);
  //         }
  //       },
  //       (error) => {
  //         this.submitted = false;
  //         this.loading = false;
  //         this.error = "Server Down!!!";
  //         console.log(error);
  //       }
  //     );
  //   } else {
  //     // Second Step: Verify OTP
  //     const empid = this.f['empid'].value;
  //     const otp = this.f['otp'].value;
  
  //     this.loginMasterService.verifyOtp(this.LoginMaster).subscribe(
  //       (data) => {
  //         this.loading = false;
  
  //         if (data?.success) {
  //           // OTP verified successfully
  //           this.router.navigate(["/register-master/list-register-page"]);
  //         } else {
  //           this.submitted = false;
  //           this.error = "Invalid OTP";
  //           console.log(data.message);
  //         }
  //       },
  //       (error) => {
  //         this.submitted = false;
  //         this.loading = false;
  //         this.error = "Server Down!!!";
  //         console.log(error);
  //       }
  //     );
  //   }
  // }
  



}