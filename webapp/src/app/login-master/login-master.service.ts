import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router'; // Import Router
import { UnsubscribeOnDestroyAdapter } from '../service-master/UnsubscribeOnDestroyAdapter';
import { LoginMaster } from './login-master.model';
import { HttpServiceService } from '../service-master/http-service.service';
import { serverLocations } from '../service-master/serverLocations';
import { catchError, finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginMasterService extends UnsubscribeOnDestroyAdapter {

  dialogData: any;
  isTblLoading = true;
  Success: boolean | undefined;
  id: string | undefined;
  dataChange: BehaviorSubject<LoginMaster[]> = new BehaviorSubject<LoginMaster[]>([]);
  getDetails: any;

  constructor(
    private httpClient: HttpClient,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
  ) {
    super();
  }

  public loginUrl= `${this.serverUrl.apiServerAddress}api/v1/crew/user/signin`;
  public verifyloginUrl= `${this.serverUrl.apiServerAddress}api/v1/crew/user/verify-otp`;

   login(LoginMaster: LoginMaster) {
      const loginPayload = {
        empid: LoginMaster.empid,
        password: LoginMaster.password
      };
    
      return this.httpService.post<any>(this.loginUrl, loginPayload).pipe(
        catchError((err) => {
          console.error('Login Error:', err);
          return throwError(() => err);
        })
      );
    }

    verifyOtp(LoginMaster: LoginMaster) {
      const loginPayload = {
        empid: LoginMaster.empid,
        otp: LoginMaster.otp,
      };
    
      return this.httpService.post<any>(this.verifyloginUrl, loginPayload).pipe(
        catchError((err) => {
          console.error('Login Error:', err);
          return throwError(() => err);
        })
      );
    }
    


}

