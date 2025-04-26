import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRegisterPageComponent } from './add-register-page/add-register-page.component';
import { ListRegisterPageComponent } from './list-register-page/list-register-page.component';

const routes: Routes = [
  {
    path: "add-register-page/:id",
    component: AddRegisterPageComponent,
  },
  {
    path: "list-register-page",
    component: ListRegisterPageComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterMasterRoutingModule { }
