import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import {FileUploader} from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileItem, ParsedResponseHeaders} from "ng2-file-upload"
import { Router } from '../../../../../node_modules/@angular/router';
import { NgxUiLoaderService, NgxUiLoaderConfig } from 'ngx-ui-loader'
import { Validators, FormGroup, FormBuilder } from '@angular/forms';;
import { NotificationsService } from 'angular2-notifications';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-on',
  templateUrl: './add-on.component.html',
  styleUrls: [
    './add-on.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ],
  providers:[InventoryService ],
})
export class AddOnComponent implements OnInit {
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
  VendorsDropdownList: any;
  SubfamilyDropdownList: any;
  FamilyDropdownList: any;
  BrandDropdownList: any;
  DepartmentDropdownList: any;
  SizeDropdownList: any;
  IsAddInventory:boolean=false;
  inventoryList: any[];
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
  InventoryForm: FormGroup;
  editModel: any;
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
  UpdateInventoryDetails(formData)
  {
    if ( this.InventoryForm.valid) {
        this.service.updateInventory(this.editModel).then
        ( res => {
          if (res != null) {
            this.addNotify({ title: 'Success', msg: 'Record updated successfully', type: 'success' });
            this.enableEditMode=false;
            this.getInventoryList();
       } else {
            this.addNotify({ title: 'Error', msg: res.error.detail, type: 'error' });
          }
        })
    } else {
      Object.keys(this.InventoryForm.controls).forEach(key => {
        this.InventoryForm.get(key).markAsTouched();
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
  }
  enableDisableImport() {
    this.IsImport = !this.IsImport;
  }
  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  filterListbyParamerters(type,value)
  {
    //this.ngxService.start();
     if(type=='brand')
     {  
       this.brand=value;
     }
     if(type=='itemname')
     {
       this.itemname=value;
     }
     if(type=='barcode')
     {
       this.barcode=value;
     }
     if(type=='subFamily')
     {
       this.subFamily=value;
     }
     if(type=='size')
     {
       this.SizeDropdownList.forEach(element => {
          if(element.id==value)
          {
            this.size=element.unit+' '+element.measurement;
          }
       });
     }
     if(type=='family')
     {
       this.family=value;
     }
     if(type=='dept')
     {
       this.deptName=value;
     }
     if(type=='vendor')
     {
       this.vendor=value;
     }
     this.service.filterListbyParamerters(this.itemname,this.barcode,this.brand,this.deptName,this.family,this.size,this.subFamily,this.vendor).then(response=>{
     // this.ngxService.stop();
      this.inventoryList=response;
   })
    
  }
  
  getVendorsDropdownList(): any {
    this.service.getVendorsDropdownList().then(response=>{
      if(response.length>0)
      {
          this.VendorsDropdownList= response;
      }
      else
      {

      }
    })
  }
  getSubfamilyDropdownList(): any {
    this.service.getSubfamilyDropdownList().then(response=>{
      if(response.length>0)
      {
          this.SubfamilyDropdownList= response;
      }
      else
      {

      }
    })
  }
  getFamilyDropdownList(): any {
    this.service.getFamilyDropdownList().then(response=>{
      if(response.length>0)
      {
          this.FamilyDropdownList= response;
      }
      else
      {

      }
    })
  }
  getBrandDropdownList(): any {
    this.service.getBrandDropdownList().then(response=>{
      if(response.length>0)
      {
          this.BrandDropdownList= response;
      }
      else
      {

      }
    })
  }
  getDepartmentDropdownList(): any {
    this.service.getDepartmentDropdownList().then(response=>{
      if(response.length>0)
      {
        
          this.DepartmentDropdownList= response;
      }
      else
      {

      }
    })
  }
  getSizeDropdownList(): any {
    this.service.getSizeDropdownList().then(response=>{
      if(response.length>0)
      {
          this.SizeDropdownList= response;
      }
      else
      {

      }
    })
  }
  sampleFileDownload()
  {
    window.location.href = this.sampleFileURL;
  }
  getInventoryList(): any {
    this.ngxService.start();
    this.service.getInventoryList().then(response => {
       this.ngxService.stop();
      if ( response.length > 0 ) {
        this.inventoryList = response;
        for (let i = 0; i < response.length; i++) {
          if(response[i].imgUrl){
            this.service.getDecryptedUrl(response[i].imgUrl).subscribe(
              res => {
                console.log(res);
              }, error => {
                this.inventoryList[i].imgUrl = error.error.text;
              }
            );
          }
        }
      } else {

      }
    })
  }

  constructor(private service: InventoryService, public route: Router, public fb: FormBuilder,
              public sanitizer: DomSanitizer,
              private ngxService: NgxUiLoaderService,private servicePNotify: NotificationsService) {
      this.config = this.ngxService.getDefaultConfig();
      this.config.fgsType="ball-spin-clockwise";
    this.config.fgsSize=100;
    this.InventoryForm = this.fb.group({
      //storeId: ['', [<any>Validators.required]],
      itemName: ['', [<any>Validators.required]],
      numPerCase: [''],
      itemId:[''],
      itemPrice: ['', [<any>Validators.required]],
      sizeList:[''],
      deptid: ['', [<any>Validators.required]],
      deptName: ['', [<any>Validators.required]],
      brand:[''],
      family:[''],
      tax_1:[false],
      foodStampable:[false],
      autoWeigh:[false],
      checkId2:[false],
      checkId:[false],
      askQuantity:[false],
      askPrice:[false],
      askDescription:[false],
      active_online:[false],
      reorder:[''],
      bulkPricing:[''],
      points:[''],
      itemNum:[''],
      section:[''],
      vendorPartNumber:[''],
      vendorName:[''],
      subFamily:[''],
      countItem:[false],
      disabled:[false],
      stock:[''],
      minPrice:[''],
      location:[''],
      cost:[''],
    })
  }

  ngOnInit() {
    this.getInventoryList();
    this.getSizeDropdownList();
    this.getDepartmentDropdownList();
    this.getBrandDropdownList();
    this.getFamilyDropdownList(); 
    this.getSubfamilyDropdownList();
    this.getVendorsDropdownList();
     this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
     this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

  newProduct(){
    this.route.navigate(['/forms/basic']);
  }
  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    if(status==200){
      this.getInventoryList();
      let data = JSON.parse(response); //success server response
      this.addNotify({ title: 'Success', msg: 'Records Imported successfully', type: 'success' });
      this.IsImport=!this.IsImport;
    }
    else
    {
      this.addNotify({ title: 'Error', msg: 'Something wrong with file!Please Check sample file ', type: 'error' });
    }
}

onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
  this.addNotify({ title: 'Error', msg: 'Something wrong with file!Please Check sample file Format', type: 'error' });
}
 

}
