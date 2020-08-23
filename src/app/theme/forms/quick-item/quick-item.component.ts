import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderConfig, NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuickItem } from './quick-item';
import { QuickItemService } from './quick-item.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-quick-item',
  templateUrl: './quick-item.component.html',
  styleUrls: ['./quick-item.component.scss']
})
export class QuickItemComponent implements OnInit {

  quickItemForm: FormGroup;
  config: NgxUiLoaderConfig;
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
  lines: any [] = [];
  queckItem: QuickItem = new QuickItem();
  queckItems: QuickItem [] = [];
  formData: any = new FormData();
  stores: any [] = [];
  departments: any [] = [];
  storeId: any;

  constructor(private ngxService: NgxUiLoaderService, private fb: FormBuilder, 
              private servicePNotify: NotificationsService,
              private quickItemService: QuickItemService) {
    this.config = this.ngxService.getDefaultConfig();
      this.config.fgsType="ball-spin-clockwise";
   }

  ngOnInit() {
    this.ngxService.start();
    // this.lines.push(this.queckItem);
    this.queckItems.push(this.queckItem);
    this.initForm();
  }

  initForm(){
    this.quickItemForm = this.fb.group({
      'items': this.fb.array([])
    })
    this.patch();
    this.getAllStores();
  }

  patch(){
    const control = <FormArray>this.quickItemForm.get('items');
    this.queckItems.forEach(item => {
      control.push(this.patchValues(item.itemnum , item.itemid, item.itemname, item.deptid,item.cost,item.itemprice, this.storeId))
    })
  }

  patchValues(itemNum, itemid , itemName, deptId,cost,itemPrice , storeId) {
    return this.fb.group({
      itemnum: [itemNum, [Validators.required]],
      itemid: [itemid, [Validators.required]],
      itemname: [itemName , [Validators.required]],
      deptid: [deptId , [Validators.required]],
      cost: [cost , [Validators.required]],
      itemprice: [itemPrice , [Validators.required]],
      storeid: [storeId]
    })    
  }

  delete( num ){
    const control = <FormArray>this.quickItemForm.get('items');
    control.removeAt(num)
    const index = this.queckItems.indexOf(num);
    if (index !== -1) {
  }
  console.log(num);
  
    // this.queckItems = this.queckItems.filter(index => index !== index);
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

  getAllStores(){
    this.quickItemService.getAllStores().subscribe(
      res => {
        this.stores = res;
        this.ngxService.stop();
      }, err => {
        console.log(err);
      }
    );
  }

  getDepartmentsByStoreId(id){
    this.quickItemService.getDepartmentsByStoreId(id).subscribe(
      res => {
        this.departments = res;
      },err => {
        console.log(err);
      }
    );
  }

  handleStoreId(id){
    this.storeId = id.target.value;
    const control = <FormArray>this.quickItemForm.get('items');
    
    this.queckItems.forEach((item, index) => {
      control.at(index).get('storeid').setValue(id.target.value);
      // item.storeId = id.target.value
      // this.patchValues(item.itemNum , item.itemName, item.deptId,item.cost,item.itemPrice, id.target.value)
      // console.log(item);
      // item.storeId = id.target.value;
      // this.quickItemForm.controls.items[index].storeId = id.target.value;
      // this.quickItemForm.value.items[index].storeId = id.target.value;
      // console.log(item);
      this.getDepartmentsByStoreId(id.target.value);
    })
    
    
  }

  isInvalidForm(i , fieldName): boolean {
    const control = <FormArray>this.quickItemForm.get('items');
    return control.controls[i].get(fieldName).invalid &&
           (control.controls[i].get(fieldName).dirty || control.controls[i].get(fieldName).touched);
  }

  isRequired(i , fieldName): boolean {
    const control = <FormArray>this.quickItemForm.get('items');
    return control.controls[i].get(fieldName).errors.required ;
  }

  addLine(){
    // console.log(this.quickItemForm.value);
    // this.formData.append('first', this.quickItemForm.value);
    this.lines.push(new QuickItem());
    this.queckItems.push(this.quickItemForm.value);
  }

  save(){
    this.ngxService.start();
    this.quickItemService.createMultiple(this.quickItemForm.get('items').value).subscribe(
      res => {
        this.ngxService.stop();
        this.quickItemForm = this.fb.group({
          'items': this.fb.array([])
        })
        this.patch();
        this.addNotify({title:'Success', msg: 'Records Added Successsfully ',type:'success'});
      },err => {
        this.ngxService.stop();
        console.log(err);
        this.addNotify({title:'Error', msg:err.error.detail,  type:'error'});
      }
    );
    
  }
}
