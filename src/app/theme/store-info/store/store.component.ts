import { Component, OnInit, DebugElement } from '@angular/core';

import {FileUploader} from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileItem, ParsedResponseHeaders} from "ng2-file-upload"
import { Router } from '../../../../../node_modules/@angular/router';
import { NgxUiLoaderService, NgxUiLoaderConfig } from 'ngx-ui-loader'
import { Validators, FormGroup, FormBuilder } from '@angular/forms';;
import { NotificationsService } from 'angular2-notifications';
import {animate, style, transition, trigger} from '@angular/animations';
import Swal from 'sweetalert2';
import { StoreInfoService } from '../store-info.service';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss',
  '../../../../assets/icon/icofont/css/icofont.scss'],
  providers:[StoreInfoService],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class StoreComponent implements OnInit {
  config: NgxUiLoaderConfig;
  skip:number=0;
  limit:number=10;
   uploader: FileUploader = new FileUploader({
     url: environment.baseUrl+'/api/uploadFile',
     isHTML5: true,
     authToken :'Bearer '+JSON.parse(sessionStorage.getItem('AuthorizeToken')).id_token
   });
   options: any = {
     position: ['bottom', 'right'],
   };
   position1 = 'top';
   position2 = 'right';
   timeOut = 1000;
   showProgressBar = true;
   pauseOnHover = true;
   lastOnBottom = true;
   clickToClose = true;
   maxLength = 0;
   maxStack = 8;
   preventDuplicates = false;
   preventLastDuplicates = false;
   theClass: string;
   rtl = false;
   animate = 'fromRight';
   icons: string;
   subType = 'success';
 
   title: string;
   msg: string;
   rows = [];
   editing = {};
   selected = [];
   IsAddInventory:boolean=false;
   StoreList: any[];
   deptValue: any;
   brand: any;
   deptName: any;
   family: any;
   size: any;
   subFamily: any;
   vendor: any;
   itemname: any;
   barcode: any;
   IsImport:boolean=false;
   hasBaseDropZoneOver = false;
   hasAnotherDropZoneOver = false;
   inventoryListanother: any[]=[];
   AuthorizeToken: string;
   sampleFileURL: string="../assets/data/invevntorysamplefile.csv";
   enableEditMode: boolean=false;
   StoreForm: FormGroup;
   editModel: any;
  modal: any=[];
  firstName: any;
  lastName: any;
  phone1: any;
   fileOverBase(e: any): void {
     this.hasBaseDropZoneOver = e;
   }

   addNotify(options) {
     this.servicePNotify.remove();
     this.options = {
       position: [
         ('position1' in options) ? options.position1 : this.position1,
         ('position2' in options) ? options.position2 : this.position2
       ],
       maxStack: ('maxStack' in options) ? options.maxStack : this.maxStack,
       timeOut: options.timeOut ? options.timeOut : this.timeOut,
       showProgressBar: ('showProgressBar' in options) ? options.showProgressBar : this.showProgressBar,
       pauseOnHover: ('pauseOnHover' in options) ? options.pauseOnHover : this.pauseOnHover,
       lastOnBottom: ('lastOnBottom' in options) ? options.lastOnBottom : this.lastOnBottom,
       clickToClose: ('clickToClose' in options) ? options.clickToClose : this.clickToClose,
       maxLength: options.maxLength ? options.maxLength : this.maxLength,
       preventDuplicates: ('preventDuplicates' in options) ? options.preventDuplicates : this.preventDuplicates,
       preventLastDuplicates: ('preventLastDuplicates' in options) ? options.preventLastDuplicates : this.preventLastDuplicates,
       theClass: options.theClass ? options.theClass : this.theClass,
       rtl: ('rtl' in options) ? options.rtl : this.rtl,
       animate: options.animate ? options.animate : this.animate,
       icons: options.icons ? options.icons : this.icons
     };
 
     switch (options.type) {
       case 'success':
         this.servicePNotify.success(
           options.title ? options.title : this.title,
           options.msg ? options.msg : this.msg
         );
         break;
       case 'error':
         this.servicePNotify.error(
           options.title ? options.title : this.title,
           options.msg ? options.msg : this.msg
         );
         break;
       case 'alert':
         this.servicePNotify.error(
           options.title ? options.title : this.title,
           options.msg ? options.msg : this.msg
         );
         break;
       case 'warn':
         this.servicePNotify.error(
           options.msg ? options.msg : this.msg
         );
         break;
       case 'info':
         this.servicePNotify.info(
           options.msg ? options.msg : this.msg
         );
         break;
       case 'create':
         this.servicePNotify.create(
           options.title ? options.title : this.title,
           options.msg ? options.msg : this.msg,
           options.type ? options.type : this.subType
         );
         break;
       case 'html':
         this.servicePNotify.html(
           options.title ? options.title : this.title,
           options.msg ? options.msg : this.msg
         );
         break;
       default:
         this.servicePNotify.alert(
           options.title ? options.title : this.title,
           options.msg ? options.msg : this.msg
         );
         break;
     }
   }
   SaveStoreInfo(formData)
   {
     if(this.StoreForm.valid)
     {
      this.ngxService.start();
      if(this.modal.id!=undefined)
      {
        formData=this.modal;
      }
         this.service.SaveStoreInfo(formData).then
         (res=>{
          this.ngxService.stop();
          this.enableEditMode=true;
           if (res.error != null) {
             this.addNotify({ title: 'Error', msg: res.error.detail, type: 'error' });
             this.enableEditMode=true;
             this.getStoreList();
        }
           else {

             if(formData.id==undefined)
             {
              this.addNotify({ title: 'Success', msg: 'Record Added Successfully', type: 'success' });
              this.enableEditMode=false;
              this.getStoreList();
             }
             
             else
             {
              this.enableEditMode=false;
              this.getStoreList();
              this.addNotify({ title: 'Success', msg: 'Record Updated Successfully', type: 'success' });
             }
             
           }
         })
     }
     else
     {
       Object.keys(this.StoreForm.controls).forEach(key => {
         this.StoreForm.get(key).markAsTouched();
       });
       this.addNotify({title:'Warning', msg: 'Please Fill All Complusory Fileds',  type:'crate', subType: 'warn'});
       return;
     }
   }
   isEditModeOpen(event)
   {
    this.enableEditMode=true;
     this.editModel=event;
   }
   backToInventory()
   {
     this.enableEditMode=false;
     this.getStoreList();
   }
   enableDisableImport() {
     this.IsImport = !this.IsImport;
     if (!this.IsImport)
       this.getStoreList();
   }
   fileOverAnother(e: any): void {
     this.hasAnotherDropZoneOver = e;
   }
   updateValue(event, type, cell, rowIndex) {
     debugger
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + type] = false;
    if (type == 'row.firstName') {
      cell.firstName = event.target.value;
    }
    if (type == 'row.lastName') {
      cell.lastName = event.target.value;
    }
    if (type == 'row.phone1') {
      cell.phone1 = event.target.value;
    }
    this.service.SaveStoreInfo(cell).then(res => {
      debugger
      if (res != null) {
        this.addNotify({ title: 'Success', msg: 'Record updated successfully', type: 'success' });
      }
      else {
        this.addNotify({ title: 'Error', msg: res.error.detail, type: 'error' });
      }
      // if(res.)
      // this.addNotify({title:'Success', msg: 'Record Added Successsfully ',type:'success'});
    });
  }
   filterListbyParamerters(type,value)
   {
     debugger
     //this.ngxService.start();
      if(type=='firstName')
      {  
        this.firstName=value;
      }
      if(type=='lastName')
      {
        this.lastName=value;
      }
      if(type=='phone1')
      {
        this.phone1=value;
      }
      this.service.filterListbyParamerters(this.firstName,this.lastName,this.phone1).then(response=>{
        debugger
      // this.ngxService.stop();
       this.StoreList=response;
    })
     
   }
   UpdateStoreById(id){
    Swal.fire({
      title: 'update?',
      text: 'Are you sure you want to update it?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update it!'
    }).then(res => {
      if (res.value) {
        this.ngxService.start();
        this.service.GetStoreById(id).then(response => {
          this.ngxService.stop();
            this.enableEditMode=true;
            this.modal=response;
      })
    }
    })
   }
   

   getStoreList(): any {
    this.ngxService.start(); 
     this.service.getStoreList().then(response=>{
        this.ngxService.stop();
       if(response.length>0)
       {
         this.StoreList= response;
       }
       else
       {
 
       }
     })
   }
 
   constructor(private service:StoreInfoService,public route:Router,public fb:FormBuilder,
     private ngxService: NgxUiLoaderService,private servicePNotify: NotificationsService,) { 
       this.config = this.ngxService.getDefaultConfig();
       this.config.fgsType="ball-spin-clockwise";
     this.config.fgsSize=100;
     this.StoreForm = this.fb.group({
       storeId: ['', [<any>Validators.required]],
       storeEmail: ['', [<any>Validators.required]],
       companyId : [''],
       companyName :['',[<any>Validators.required]],
       companyPhone: [''],
       companyAddress :[''],
       companyState: [''],
       companyCity:[''],
       companyZip:[''],
       logoLocation:[''],
       numStations :[''],
       taxId :[''],
       taxRate :[''],
       open :[false]
     })
     // this.AuthorizeToken= sessionStorage.getItem('AuthorizeToken');
     // if(this.AuthorizeToken==null)
     // {
     //   this.route.navigate(['/auth/login/simple']);
     // }
     // else
     // {
       
     // }
     // start foreground loading with 'default' id
 
     
   }
   deleteStoreById(id){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wont be able to revert',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(res => {
      if (res.value) {
        this.ngxService.start();
        this.service.deleteStoreById(id).then(res=>{
          this.ngxService.stop();
          if (res.status == 200) {
                this.getStoreList();
                this.addNotify({ title: 'Success', msg: 'Record deleted successfully', type: 'success' });
              }
              else {
                this.addNotify({ title: 'Error', msg: res.error.detail, type: 'error' });
              }
        })
       
      }
    })
    
   }
   onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) { }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [this.rows[1], this.rows[3]];
  }

  remove() {
    this.selected = [];
  }
   ngOnInit() {
    
     this.getStoreList();
     // this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
     //     this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
   }
   onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
     let data = JSON.parse(response); //success server response
 }
 
 onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
     let error = JSON.parse(response); //error server response
 }
  
 enableDisableEditMode(){
   this.enableEditMode=!this.enableEditMode;
   this.modal=[];
 }
 }
 