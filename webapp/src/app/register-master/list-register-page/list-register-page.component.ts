import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatMenuTrigger } from '@angular/material/menu';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UnsubscribeOnDestroyAdapter } from 'src/app/service-master/UnsubscribeOnDestroyAdapter';
import { RegisterMasterService } from '../register-master.service';
import { HttpServiceService } from 'src/app/service-master/http-service.service';
import { serverLocations } from 'src/app/service-master/serverLocations';
import { RegisterMaster } from '../register-master.model';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-list-register-page',
  templateUrl: './list-register-page.component.html',
  styleUrls: ['./list-register-page.component.scss']
})
export class ListRegisterPageComponent extends UnsubscribeOnDestroyAdapter implements OnInit{

  displayedColumns = [
     "code",
     "empid",
     "employeeName",
     "phoneno",
     "emailid",
     "actions"
 ];
 dataSource!: ExampleDataSource ;
 exampleDatabase!: RegisterMasterService;
 selection = new SelectionModel<RegisterMaster>(true, []);
 RegisterMaster: RegisterMaster | null = null;
 
 @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
 @ViewChild(MatSort, { static: true }) sort!: MatSort;
 @ViewChild("filter", { static: true }) filter!: ElementRef;
 @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
 contextMenuPosition = { x: "0px", y: "0px" };
 
 constructor(
   public httpClient: HttpClient,
   public dialog: MatDialog,
   public registerMasterService: RegisterMasterService,
   private serverUrl: serverLocations,
   private httpService: HttpServiceService,
   public router: Router,
   private snackBar: MatSnackBar
 ) {
   super();
 }
 
 ngOnInit(): void {
   this.loadData();
 }
 
 
 loadData() {
   this.exampleDatabase = new RegisterMasterService(this.httpClient, this.serverUrl, this.httpService);
   this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
   this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(() => {
     if (!this.dataSource) {
       return;
     }
     this.dataSource.filter = this.filter.nativeElement.value;
   });
 }
 
 editCall(row: RegisterMaster) {
   this.router.navigate(['/register-master/add-register-page/', row.code]);
 }
 
 viewCall(row: RegisterMaster) {
   this.router.navigate(['/crew/maintain/interview-setup/view-interview/', row.code]);
 }
 
 deleteItem(row: RegisterMaster) {
   let tempDirection: 'ltr' | 'rtl' = localStorage.getItem("isRtl") === "true" ? "rtl" : "ltr";
 
   const dialogRef = this.dialog.open(DeleteComponent, {
     height: "270px",
     width: "400px",
     data: row,
     direction: tempDirection,
   });
 
   this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
     if (data?.data === true) {
       this.registerMasterService.delete(row.code).subscribe({
         next: (res) => {
           if (res.success) {
             this.loadData();
 
             // ✅ Show success snack bar
             this.snackBar.open('Deleted successfully!', 'Close', {
               duration: 3000,
               panelClass: ['snackbar-success']
             });
           }
         },
         error: (error) => {
           console.error(error);
 
           // ❌ Show error snack bar
           this.snackBar.open('Failed to delete record.', 'Close', {
             duration: 3000,
             panelClass: ['snackbar-error']
           });
         }
       });
     }
   });
 }
 
 onContextMenu(event: MouseEvent, item: RegisterMaster) {
   event.preventDefault();
   this.contextMenuPosition.x = event.clientX + "px";
   this.contextMenuPosition.y = event.clientY + "px";
   this.contextMenu.menuData = { item: item };
   if (this.contextMenu.menu) {
     this.contextMenu.menu.focusFirstItem("mouse");
     this.contextMenu.openMenu();
   }
 }
 }
 
   export class ExampleDataSource extends DataSource<RegisterMaster> {
     filterChange = new BehaviorSubject("");
     get filter(): string {
       return this.filterChange.value;
     }
     set filter(filter: string) {
       this.filterChange.next(filter);
     }
     filteredData: RegisterMaster[] = [];
     renderedData: RegisterMaster[] = [];
     constructor(
       public exampleDatabase: RegisterMasterService,
       public paginator: MatPaginator,
       public _sort: MatSort
     ) {
       super();
       this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
     }
   
     connect(): Observable<RegisterMaster[]> {
       const displayDataChanges = [
         this.exampleDatabase.dataChange,
         this._sort.sortChange,
         this.filterChange,
         this.paginator.page,
       ];
   
   
 
 
       this.exampleDatabase.getList();
       return merge(...displayDataChanges).pipe(map(() => {
           this.filteredData = this.exampleDatabase.data.slice().filter((interviewSetup: RegisterMaster) => {
               const searchStr = (
                 interviewSetup.code +
                 interviewSetup.empid +
                 interviewSetup.employeeName +
                 interviewSetup.phoneno +
                 interviewSetup.emailid 
                
               ).toLowerCase();
               return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
             });
   
           const sortedData = this.sortData(this.filteredData.slice());
           const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
           this.renderedData = sortedData.splice(
             startIndex,
             this.paginator.pageSize
           );
           return this.renderedData;
         })
       );
     }
     disconnect() {}
   
     sortData(data: RegisterMaster[]): RegisterMaster[] {
       if (!this._sort.active || this._sort.direction === "") {
         return data;
       }
       return data.sort((a, b) => {
         let propertyA: number | string = "";
         let propertyB: number | string = "";
         switch (this._sort.active) {
           case "code":
             [propertyA, propertyB] = [a.code, b.code];
             break;
             case "empid":
              [propertyA, propertyB] = [a.empid, b.empid];
              break;
             case "employeeName":
               [propertyA, propertyB] = [a.employeeName, b.employeeName];
               break;
               case "phoneno":
                [propertyA, propertyB] = [a.phoneno, b.phoneno];
                break;
               case "emailid":
               [propertyA, propertyB] = [a.emailid, b.emailid];
               break;
          
         }
 
       
         const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
         const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
         return (
           (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
         );
       });
     }
   }
   
 
 
 
