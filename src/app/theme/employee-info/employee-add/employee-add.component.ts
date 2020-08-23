import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { NgxUiLoaderService, NgxUiLoaderConfig } from '../../../../../node_modules/ngx-ui-loader';
import { Router } from '@angular/router';
import { EmployeeInfoService } from '../employee-info.service';
@Component({
  selector: 'app-basic-elements',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
  providers: [EmployeeInfoService],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class EmployeeAddComponent implements OnInit {
  options: any = {
    position: ['bottom', 'right'],
  };
  config: NgxUiLoaderConfig;
  position1 = 'top';
  position2 = 'right';
  timeOut = 5000;
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
  registerAccount: any;
  title: string;
  msg: string;
  VendorsDropdownList: any;
  SubfamilyDropdownList: any;
  FamilyDropdownList: any;
  BrandDropdownList: any;
  DepartmentDropdownList: any;
  SizeDropdownList: any;
  IsAddInventory: boolean = false;
  StoreIDList: any;
  EmployeeForm: FormGroup;
  count: any;
  LanguageList: any;
  StoreList: any;
  AccesslevelList: any;
  Image: string = "/assets/images/avatar-blank.jpg";
  BacktoList() {
    this.route.navigate(['/employee/list']);

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

  constructor(private service: EmployeeInfoService, private servicePNotify: NotificationsService,
    public fb: FormBuilder, private ngxService: NgxUiLoaderService, public route: Router) {
    this.config = this.ngxService.getDefaultConfig();
    this.config.fgsType = "ball-spin-clockwise";
    this.config.fgsSize = 100;
    this.EmployeeForm = this.fb.group({
      name: ['', [<any>Validators.required]],
      login: ['', [<any>Validators.required, Validators.pattern('^[_.@A-Za-z0-9-]*$')]],
      phoneNumber: [''],
      password: ['', [<any>Validators.required]],
      email: ['', [<any>Validators.required, Validators.email]],
      pinCode: ['', [<any>Validators.required]],
      bioMetic: [''],
      swipeId: [''],
      nfc: [''],
      storeId: ['', [<any>Validators.required]],
      language: ['', [<any>Validators.required]],
      accessLevelId: [''],
      accessLevel: ['']
    })
  }

  ngOnInit() {
    this.registerAccount = {};
    this.getAccessLevelList();
    this.getStoresList();
    this.getLanguageList();
  }
  getLanguageList() {
    this.service.getLanguageList().then(res => {
      if (res.length > 0) {
        this.LanguageList = res;
      }

    })
  }
  getStoresList() {
    this.service.getStoresList().then(res => {
      if (res.length > 0) {
        this.StoreList = res;
      }

    })
  }
  getAccessLevelList() {
    this.service.getPermissionList().then(res => {
      if (res.length > 0) {
        this.AccesslevelList = res;
      }

    })
  }


  SubmitEmployeeDetails(formData): any {
    if (this.EmployeeForm.valid) {
      this.registerAccount.login = formData.login;
      this.registerAccount.email = formData.email;
      this.registerAccount.password = formData.password;
      this.ngxService.start();
      this.service.register(this.registerAccount).subscribe(
        res => {
          if (formData.accessLevelId != null && formData.accessLevelId != undefined && formData.accessLevelId != "")
             formData.accessLevel = this.AccesslevelList.find(x => x.id == formData.accessLevelId).accessLevel;
          this.service.SaveEmployeeInfo(formData).then(res => {
            this.ngxService.stop();
            if (res.id !== undefined) {
              this.EmployeeForm.reset();
              this.addNotify({ title: 'Success', msg: 'Record added successfully!', type: 'success' });
              this.route.navigate(['/employee/list']);
            } else {
              this.addNotify({ title: 'Error', msg: res.title, type: 'error' });
            }
          })
        }, err => {
          this.ngxService.stop();
          this.addNotify({ title: 'Error', msg: err.error.title.replace('Login name', 'Username'), type: 'error' });
        }
      );
    } else {

      Object.keys(this.EmployeeForm.controls).forEach(key => {
        this.EmployeeForm.get(key).markAsTouched();
      });
      this.addNotify({ title: 'Warning', msg: 'Fields mark with * are mandatory!', type: 'alert' });
      return;
    }
  }

}
