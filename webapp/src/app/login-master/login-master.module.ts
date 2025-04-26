import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { LoginMasterRoutingModule } from './login-master-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';


@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    LoginMasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,          // Material button module
    MatIconModule,            // Material icon module for showing icons
    MatInputModule,           // Material input module for input fields
    MatFormFieldModule,       // Material form field for consistent styling
    MatProgressSpinnerModule  // Material progress spinner for loading state
  ]
})
export class LoginMasterModule { }
