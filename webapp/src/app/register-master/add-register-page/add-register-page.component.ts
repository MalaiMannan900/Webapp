import { Component, OnInit } from '@angular/core';
import { RegisterMaster } from '../register-master.model';
import { HttpServiceService } from 'src/app/service-master/http-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { serverLocations } from 'src/app/service-master/serverLocations';
import { RegisterMasterService } from '../register-master.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-add-register-page',
  templateUrl: './add-register-page.component.html',
  styleUrls: ['./add-register-page.component.scss']
})
export class AddRegisterPageComponent implements OnInit{

  docForm: FormGroup;
  RegisterMaster!: RegisterMaster;
  edit:boolean=false;
  requestId: any;
  decryptRequestId: any;
  phdrop: any = [];
  hide = true;

  constructor(private fb: FormBuilder,
    public router:Router,
    public registerMasterService: RegisterMasterService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
     private serverUrl:serverLocations,private snackBar: MatSnackBar
  ){


      this.docForm = this.fb.group({
        
        code: [""],
        employeeName: ['', Validators.required],
        empid: ['', Validators.required],
        password: ['', Validators.required],
        phoneno: ['', [Validators.pattern(/^[0-9]+$/)]], // Assuming contact is numeric
        emailid: ['', Validators.email],
          })
       
    } 

 
    ngOnInit(): void {
      this.route.params.subscribe(params => {if(params['id']!=undefined && params['id']!=0){ 
        this.requestId = params['id'];
         this.edit=true;
         this.fetchDetails(this.requestId) ;
  
        }
       }); 
  
       this.httpService.get<any>(this.registerMasterService.getSequenceCode).subscribe((res: any) => {

        if(!this.edit){
        this.docForm.patchValue({
          'empid':res.empid
        })
      }
      })
       this.phdrop = [{ id: "SEAFARER", text: "SEAFARER APPROVED FOR PROMOTION" }, { id: 'EMPLOYED', text: "TO BE RE EMPLOYED" }, { id: 'NOT EMPLOYED', text: "NOT TO BE RE EMPLOYED" }];

    }


  cancel(){
    this.router.navigate(['/register-master/list-register-page']);
  }

  reset() {
    if(this.edit ==true){
      this.fetchDetails(this.decryptRequestId);
    }else{
      this.docForm = this.fb.group({
  
            
        code: [""],
        employeeName: ['', Validators.required],
        empid: ['', Validators.required],
        password: ['', Validators.required],
        phoneno: ['', [Validators.pattern(/^[0-9]+$/)]], // Assuming contact is numeric
        emailid: ['', Validators.email],
       
      })
  }
  
  }

 

  fetchDetails(id: any): void {
    this.httpService.get<any>(this.registerMasterService.edit+"?id="+id).subscribe({next: (data: any) => {
      this.docForm.patchValue({
        'code': data.list[0].code,
        'employeeName': data.list[0].employeeName,
        'empid': data.list[0].empid,
        'password': data.list[0].password,
        'phoneno': data.list[0].phoneno,
        'emailid': data.list[0].emailid,
      });

    }
  });

  }

  saveForm() {
    const RegisterMaster: RegisterMaster = this.docForm.value;
  
    this.registerMasterService.save(RegisterMaster, this.router).subscribe({
      next: (response) => {
        console.log('saved successfully:', response);
  
        this.snackBar.open('saved successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success'],
          horizontalPosition: 'end',  // Position on the right (horizontal)
          verticalPosition: 'top'     // Position at the top (vertical)
        });
        this.router.navigate(['/register-master/list-register-page']);
      },
      error: (err) => {
        console.error('Error saving:', err);
  
        this.snackBar.open('Failed to save.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
          horizontalPosition: 'end',  // Position on the right (horizontal)
          verticalPosition: 'top'     // Position at the top (vertical)
        });
      }
    });
  }
  
  updateForm() {
    const RegisterMaster: RegisterMaster = this.docForm.value;
  
    this.registerMasterService.update(RegisterMaster, this.router).subscribe({
      next: (response) => {
        console.log('updated successfully:', response);
  
        this.snackBar.open('updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success'],
          horizontalPosition: 'end',  // Position on the right (horizontal)
          verticalPosition: 'top'     // Position at the top (vertical)
        });
        this.router.navigate(['/register-master/list-register-page']);
      },
      error: (err) => {
        console.error('Error updating:', err);
  
        this.snackBar.open('Failed to update.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
          horizontalPosition: 'end',  // Position on the right (horizontal)
          verticalPosition: 'top'     // Position at the top (vertical)
        });
      }
    });
  }
  

  keyPressNumber(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.keyCode || event.which);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  

}
