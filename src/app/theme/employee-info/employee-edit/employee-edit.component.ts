import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import { NgxUiLoaderService, NgxUiLoaderConfig } from '../../../../../node_modules/ngx-ui-loader';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { EmployeeInfoService } from '../employee-info.service';
import { EmployeeClass } from '../employee.interface';
@Component({
  selector: 'app-basic-elements',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
  providers:[EmployeeInfoService],
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
export class EmployeeEditComponent implements OnInit {
  options: any = {
    position: ['bottom', 'right'],
  };
  config: NgxUiLoaderConfig;
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
  VendorsDropdownList: any;
  SubfamilyDropdownList: any;
  FamilyDropdownList: any;
  BrandDropdownList: any;
  DepartmentDropdownList: any;
  SizeDropdownList: any;
  IsAddInventory:boolean=false;
  StoreIDList:any;
  AccessLevel: FormGroup;
  count: any;
  EmployeeForm: FormGroup;
  LanguageList:any;
  StoreList:any;
  AccesslevelList:any;
  Image:string="/assets/images/avatar-blank.jpg";
  BacktoList()
  {
    this.route.navigate(['/employee/list']);

  }
  addNotify(options) {
    this.servicePNotify.remove();
    this.options  = {
      position : [
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

  constructor(private service:EmployeeInfoService,private servicePNotify: NotificationsService,
    public fb: FormBuilder ,private ngxService: NgxUiLoaderService,public route:Router,private activatedRoute: ActivatedRoute,public model:EmployeeClass) { 
      this.config = this.ngxService.getDefaultConfig();
      this.config.fgsType="ball-spin-clockwise";
    this.config.fgsSize=100;
    this.EmployeeForm = this.fb.group({
      name: ['', [<any>Validators.required]],
      phoneNumber: [''],
      password: ['', [<any>Validators.required]],
      email: ['', [<any>Validators.required, Validators.email]],
      pinCode: ['', [<any>Validators.required]],
      bioMetic: [''],
      swipeId :[''],
      nfc:[''],
      storeId  : ['', [<any>Validators.required]],
      language : ['', [<any>Validators.required]],
      accessLevelId:[''],
      accessLevel:['']
    })
   }
  
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params  => {
      let id = params['id'];
      if(id==undefined)
      {
        id= sessionStorage.getItem('key');
      }
      if(id!=undefined)
      {
        this.service.GetEmployeeById(id).then(res=>{
          if(res.id!=undefined) 
          this.model= res;
          else
          this.route.navigate(['/employee/list']);

        })
      }
    });
    this.getAccessLevelList();
    this.getStoresList();
    this.getLanguageList();
  }
  getLanguageList() {
    this.service.getLanguageList().then(res=>{
      if(res.length>0)
      {
          this.LanguageList= res;
      }
     
    })    
  }
  getStoresList() {
    this.service.getStoresList().then(res=>{
      if(res.length>0)
      {
          this.StoreList= res;
      }
     
    })    
  }
  getAccessLevelList() {
    this.service.getPermissionList().then(res=>{
      if(res.length>0)
      {
          this.AccesslevelList= res;
      }
     
    })    
  }

 
  SubmitEmployeeDetails(formData):any{
    if (this.EmployeeForm.valid) {
      if(formData.accessLevelId!=null && formData.accessLevelId!=undefined && formData.accessLevelId!="")
      formData.accessLevel= this.AccesslevelList.find(x=>x.id==formData.accessLevelId).accessLevel;
      this.ngxService.start();
     this.service.UpdateEmployeeInfo(this.model).then(res=>{
      this.ngxService.stop();
      if(res.status==undefined && res.id!=undefined)
      {
        this.addNotify({title:'Success', msg: 'Record updated successfully!',  type:'success'});
      }
      else{
        this.addNotify({title:'Error', msg: res.title,  type:'error'});
      }
     })
      
    }
    else {

      Object.keys(this.EmployeeForm.controls).forEach(key => {
        this.EmployeeForm.get(key).markAsTouched();
      });
      this.addNotify({title:'Warning', msg: 'Fields mark with * are mandatory!',  type:'alert'});
      return;
    }
  }

}
