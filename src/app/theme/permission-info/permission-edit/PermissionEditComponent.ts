import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { NgxUiLoaderService, NgxUiLoaderConfig } from '../../../../../node_modules/ngx-ui-loader';
import { PermissionInfoService } from '../permission-info.service';
import { Router } from '@angular/router';
import { PermissionInfo } from '../permission-info.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-basic-elements',
  templateUrl: './permission-edit.component.html',
  styleUrls: ['./permission-edit.component.scss'],
  providers: [PermissionInfoService],
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
export class PermissionEditComponent implements OnInit {
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
  IsAddInventory: boolean = false;
  StoreIDList: any;
  AccessLevelForm: FormGroup;
  count: any;
    permissionView: string;
  BacktoList() {
    this.route.navigate(['/access-control/list']);
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
        this.servicePNotify.success(options.title ? options.title : this.title, options.msg ? options.msg : this.msg);
        break;
      case 'error':
        this.servicePNotify.error(options.title ? options.title : this.title, options.msg ? options.msg : this.msg);
        break;
      case 'alert':
        this.servicePNotify.error(options.title ? options.title : this.title, options.msg ? options.msg : this.msg);
        break;
      case 'warn':
        this.servicePNotify.error(options.msg ? options.msg : this.msg);
        break;
      case 'info':
        this.servicePNotify.info(options.msg ? options.msg : this.msg);
        break;
      case 'create':
        this.servicePNotify.create(options.title ? options.title : this.title, options.msg ? options.msg : this.msg, options.type ? options.type : this.subType);
        break;
      case 'html':
        this.servicePNotify.html(options.title ? options.title : this.title, options.msg ? options.msg : this.msg);
        break;
      default:
        this.servicePNotify.alert(options.title ? options.title : this.title, options.msg ? options.msg : this.msg);
        break;
    }
  }
  constructor(public model:PermissionInfo,private service: PermissionInfoService, private servicePNotify: NotificationsService, public fb: FormBuilder, private ngxService: NgxUiLoaderService, public route: Router) {
    this.config = this.ngxService.getDefaultConfig();
    this.config.fgsType = "ball-spin-clockwise";
    this.config.fgsSize = 100;
    this.AccessLevelForm = this.fb.group({
        id:[''],
      accessLevel: ['', [<any>Validators.required]],
      cashAlerts: [false],
      cashPickup: [false],
      addCcTips: [false],
      applyGratuity: [false],
      approveCashcount: [false],
      closeShift: [false],
      comp: [false],
      currentCash: [false],
      custmorsAccount: [false],
      deptsAdd: [false],
      desConfig: [false],
      disabled: [false],
      drawerTransfer: [false],
      empTimeScheduler: [false],
      extraItem: [false],
      gcRedeem: [false],
      gcSell: [false],
      inventory: [false],
      inventoryAccess1: [false],
      inventoryAccess2: [false],
      inventoryPromotions: [false],
      invoiceDeleteitems: [false],
      invoiceDeletesent: [false],
      invoiceDiscount: [false],
      invoiceDiscountsLimit: [false],
      invoicePricechange: [false],
      invoiceVoid: [false],
      isAdmin: [false],
      isManager: [false],
      issueCreditSlip: [false],
      kitchenReprint: [false],
      negativePriceChange: [false],
      openCashDrawer: [false],
      overtimeThreshold: [false],
      performEndofday: [false],
      picture: [false],
      pinCode: [0],
      printHold: [false],
      pullbackInvoice: [false],
      redeemCreditSlip: [false],
      refundItem: [false],
      reports1: [false],
      reports2: [false],
      reprintReceipt: [false],
      requiredClockin: [false],
      sellSpecialItem: [false],
      setupAccess: [false],
      setupEmployees: [false],
      setupReceiptNotes: [false],
      splitChecks: [false],
      taxExempt: [false],
      timeWorkedThisPeriod: [false],
      transferServer: [false],
      transferTable: [false],
      transferTables: [false],
      vendorPayout: [false],
      vendors: [false]
    });
  }
  EnableAccessLevelDetails()
  {
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
            this.permissionView='1';
             // this.enableEditMode=true;
              //this.modal=response;
      }
      else{
        this.permissionView='0';
      }
      })
    //   this.permissionView='1';
  }
  ngOnInit() {
      let id= sessionStorage.getItem('PermissionKey');
      this.permissionView= sessionStorage.getItem('PermissionEdit');
      if(id!=undefined)
      {
          this.service.GetPermissionById(id).then(res=>{
              if(res.id!=undefined)
              {
                    this.model=res;
              }
              else{
                this.route.navigate(['/access-control/list']);
              }
          })
      }
  }
  SubmitAccessLevelDetails(formData): any {
    if (this.AccessLevelForm.valid) {
      this.ngxService.start();
        formData.id=this.model.id;
      this.service.updateAccessLevel(this.AccessLevelForm.value).then(res => {
        this.ngxService.stop();
        if (res.status == undefined && res.id != undefined) {
          this.addNotify({ title: 'Success', msg: 'Record updated successfully!', type: 'success' });
        }
        else {
          this.addNotify({ title: 'Error', msg: res.title, type: 'error', subType: 'warn' });
        }
      });
    }
    else {
      Object.keys(this.AccessLevelForm.controls).forEach(key => {
        this.AccessLevelForm.get(key).markAsTouched();
      });
      this.addNotify({ title: 'Warning', msg: 'Please Fill All Complusory Fileds', type: 'crate', subType: 'warn' });
      return;
    }
  }
}
