import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RegisterMaster } from './register-master.model';
import { UnsubscribeOnDestroyAdapter } from '../service-master/UnsubscribeOnDestroyAdapter';
import { serverLocations } from '../service-master/serverLocations';
import { HttpServiceService } from '../service-master/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class RegisterMasterService extends UnsubscribeOnDestroyAdapter {

  dialogData: any;
   isTblLoading = true;
   isSaving = false;
  isUpdating = false;
  errorMessage: string = '';
   Success: boolean | undefined;
   id: string | undefined;
   
   dataChange: BehaviorSubject<RegisterMaster[]> = new BehaviorSubject<RegisterMaster[]>([]);
  
 
 
   constructor(
     private httpClient: HttpClient,
     private serverUrl: serverLocations,
     private httpService: HttpServiceService,
   ) {
     super();
   }
 
  
  // API endpoints

 public listagent = `${this.serverUrl.apiServerAddress}api/v1/crew/user/getlist`;
 public saveagent = `${this.serverUrl.apiServerAddress}api/v1/crew/user/save`;
 public deleteagent = `${this.serverUrl.apiServerAddress}api/v1/crew/user/userdelete`;
 public updateagent = `${this.serverUrl.apiServerAddress}api/v1/crew/user/userupdate`;
 public  edit = `${this.serverUrl.apiServerAddress}api/v1/crew/user/useredit`;
 public getSequenceCode = `${this.serverUrl.apiServerAddress}api/v1/crew/user/getSequenceCode`;




get data(): RegisterMaster[] {
  return this.dataChange.value;
}

getDialogData() {
  return this.dialogData;
}

getList() {
  this.isTblLoading = true;
  this.httpService.get<any>(this.listagent).pipe(
    catchError(err => {
      console.error('List Load Error:', err);
      this.errorMessage = 'Failed to load  list.';
      return throwError(() => err);
    }),
    finalize(() => this.isTblLoading = false)
  ).subscribe(data => {
    this.dataChange.next(data.list);
  });
}


save(registerMaster: RegisterMaster, router: Router) {
  this.isSaving = true;
  return this.httpService.post<RegisterMaster>(this.saveagent, registerMaster).pipe(
    catchError(err => {
      console.error('Save Error:', err);
      this.errorMessage = 'Failed to save .';
      alert(this.errorMessage);
      return throwError(() => err);
    }),
    finalize(() => this.isSaving = false)
  );
}

update(registerMaster: RegisterMaster, router: Router) {
  this.isUpdating = true;
  return this.httpService.post<RegisterMaster>(this.updateagent, registerMaster).pipe(
    catchError(err => {
      console.error('Update Error:', err); // Log full error here
      this.errorMessage = 'Failed to update.';
      alert(this.errorMessage);
      return throwError(() => err);
    }),
    finalize(() => this.isUpdating = false)
  );
}


delete(id: string) {
  return this.httpClient.delete<any>(`${this.deleteagent}?id=${id}`);
}

}

 