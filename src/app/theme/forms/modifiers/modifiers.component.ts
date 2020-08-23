import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderConfig, NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationsService } from 'angular2-notifications';
import { ModifiersService } from './modifiers.service';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-modifiers',
  templateUrl: './modifiers.component.html',
  styleUrls: ['./modifiers.component.scss','../../../../assets/icon/icofont/css/icofont.scss']
})
export class ModifiersComponent implements OnInit {
  modifiers: any [];
  formData: any = {};
  departments: any [] = [];
  stores: any [] = [];
  url: any;
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
  rows = [];
  editing = {};
  selected = [];
  IsImport:boolean = true;
  isAddModifier: boolean = false;
  isEditModifier: boolean = false;

  constructor(private ngxService: NgxUiLoaderService,
              private modifierService: ModifiersService,
              private service: InventoryService,
              private router: Router,
              private servicePNotify: NotificationsService) {
              this.config = this.ngxService.getDefaultConfig();
              this.config.fgsType = 'ball-spin-clockwise';
              this.config.fgsSize = 100;
    }

  ngOnInit() {
    this.ngxService.start();
    this.getModifiers();
  }

  newModifier(){
    this.formData = {};
    this.ngxService.start();
    this.isAddModifier = true;
    this.getDepartments();
    this.getStores();
  }

  getBackAdd(){
    this.isAddModifier = !this.isAddModifier;
  }
  isEditModeOpen(data){
    this.ngxService.start();
    this.isEditModifier = true;
    this.getDepartments();
    this.getStores();
    this.formData = data;
    console.log(this.formData);
  }
  deleteOne(id){
    this.modifiers = this.modifiers.filter(modifier => modifier.id !== id);
  }
  getBackEdit(){
    this.isEditModifier = !this.isEditModifier;
  }
  update(){
    this.ngxService.start();
    this.modifierService.updateModifier(this.formData).subscribe(
      res => {
        if (res) {
          this.ngxService.stop();
            this.addNotify({ title: 'Success', msg: 'Record Updated successfully', type: 'success' });
         this.modifiers.map(modifier => {
            modifier.id === res.id ? res : modifier
          });
          this.isEditModifier = !this.isEditModifier;
        }
      }, err => {
        this.ngxService.stop();
        if (err.error.message) {
          this.addNotify({ title: 'Error', msg: err.error.message, type: 'error' });
        }
        if (err.error.detail) {
          this.addNotify({ title: 'Error', msg: err.error.detail, type: 'error' });
        }
      }
    );
  }

  getModifiers() {
    this.modifierService.getModifiers().subscribe(
      res => {
        this.ngxService.stop();
        this.modifiers = res;
      }, err => {
        console.log(err);
      }
    );
  }

  getDepartments() {
    this.service.getDepartmentDropdownList().then(
      res => {
        this.ngxService.stop();
        this.departments = res;
      }, err => {
        console.log(err);
      }
    );
  }

  getStores(){
    this.service.getStoreIDDropdownList().then(
      res => {
        this.ngxService.stop();
        this.stores = res;
        console.log(this.stores);
      }, err => {
        console.log(err);
      }
    );
  }

  fiterByName(name){
    this.modifierService.findByName(name).subscribe(
      res => {
        this.modifiers = res;
      }, err => {
        console.log(err);
      }
    );
  }

  save() {
    console.log(this.formData);
    this.ngxService.start();
    this.modifierService.addModifier(this.formData).subscribe(
      res => {
        if(res){
          this.ngxService.stop();
          this.addNotify({ title: 'Success', msg: 'Record Created successfully', type: 'success' });
          this.modifiers.push(res);
          this.isAddModifier = !this.isAddModifier;
        }
      }, err => {
        this.ngxService.stop();
        if (err.error.message) {
          this.addNotify({ title: 'Error', msg: err.error.message, type: 'error' });
        }
        if (err.error.detail) {
          this.addNotify({ title: 'Error', msg: err.error.detail, type: 'error' });
        }
        console.log(err);
      }
    );
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

}
