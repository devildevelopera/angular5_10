import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { NgxUiLoaderConfig, NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationsService } from 'angular2-notifications';
import { Modifier } from '../basic-elements/modifier';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss', '../../../../assets/icon/icofont/css/icofont.scss']
})
export class EditItemComponent implements OnInit {
  id: any;
  formData: any = {};
  modifiers: Modifier[] = [];
  modifiersGroup: any[] = [];
  modifiersSelected: Modifier [] = [];
  modifiersSelectedIds: any [] = [];
  modifiersGroupSelected: any[] = [];
  modifiersGroupSelectedIds: any[] = [];
  public tabIndex = new Array(true, false, false);
  options: any = {
    position: ['bottom', 'right']
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
  animate = "fromRight";
  icons: string;
  subType = "success";

  title: string;
  msg: string;
  accepted: Boolean;
  itemPictureChange: boolean;
  itemPicture: File;
  photoName: string;
  VendorsDropdownList: any;
  SubfamilyDropdownList: any;
  FamilyDropdownList: any;
  BrandDropdownList: any;
  DepartmentDropdownList: any;
  SizeDropdownList: any;
  StoreIDList: any;
  categories: [];
  sections: [];
  constructor(private route: ActivatedRoute, private itemService: InventoryService,
              private servicePNotify: NotificationsService,
              private ngxService: NgxUiLoaderService,
              private router: Router) { 
    this.config = this.ngxService.getDefaultConfig();
    this.config.fgsType = 'ball-spin-clockwise';
    this.config.fgsSize = 100;
              }

  ngOnInit() {
    this.getModifiers();
    this.getModifiersGroup();
    this.ngxService.start();
    // this.id = this.route.snapshot.paramMap.get('id');
    this.itemService.GetInventoryById(this.route.snapshot.paramMap.get('id')).then(
      res => {
        this.ngxService.stop();
        this.formData = res;
        if (res.modifiersIds) {
          res.modifiersIds.forEach( id => {
            this.modifiersSelected.push(this.modifiers.find(modifier => modifier.id === id));
            this.modifiersSelectedIds.push(this.modifiers.find(modifier => modifier.id === id).id);
            });
        }
        if (res.modifiersGroupsIds) {
          res.modifiersGroupsIds.forEach( id => {
            this.modifiersGroupSelected.push(this.modifiersGroup.find( group => id === group.id));
            this.modifiersGroupSelectedIds.push(this.modifiersGroup.find( group => id === group.id).id);
          });
        }
      }
    ).catch(err => {
      console.log(err);
    });
    this.getSizeDropdownList();
    this.getDepartmentDropdownList();
    this.getBrandDropdownList();
    this.getFamilyDropdownList();
    this.getSubfamilyDropdownList();
    this.getVendorsDropdownList();
    this.getStoreIDDropdownList();
  }

  selectDepartment(value){
    if (value) {
      this.formData.departmentId = value;
    }else {
      this.formData.departmentId = null;
    }
  }

  selectBrand(value){
    if (value) {
      this.formData.brandId = value;
    }else {
      this.formData.brandId = null;
    }
  }

  public tabIndexClick(index: number) {
    for (let i = 0; i <= this.tabIndex.length - 1; i++) {
      if (index == i) this.tabIndex[i] = true;
      else this.tabIndex[i] = false;
    }
  }

  save() {
    this.ngxService.start();
    this.formData.modifiersIds = this.modifiersSelectedIds;
    this.formData.modifiersGroupsIds = this.modifiersGroupSelectedIds;
    if (this.itemPictureChange) {
      this.itemService.uploadItemPicture(this.itemPicture).subscribe(
        (res: any) => {
          this.ngxService.stop();
            console.log('User profile picture was uploaded. ' + res.body);
            this.addNotify({
                title: 'Success',
                msg: 'Image uploaded Successsfully ',
                type: 'success'
              });
        }, (error: HttpErrorResponse) => {
          if (error.status === 200) {
            this.formData.imgUrl = error.error.text;
             this.itemService.updateInventory(this.formData).then(
              res => {
                this.ngxService.stop();
                    this.addNotify({
                      title: 'Success',
                      msg: 'Item Updated Successsfully ',
                      type: 'success'
                    });
                    this.router.navigate(['/forms/add-on']);
              }, error => {
                this.ngxService.stop();
                this.addNotify({
                  title: 'Error',
                  msg: error.error.detail,
                  type: 'error'
                });
              }
            );
          }else{
            this.ngxService.stop();
            this.addNotify({
                title: 'Error',
                msg: 'image not saved!',
                type: 'error'
              });
            }
        }
      );
    }else {
      this.itemService.updateInventory(this.formData).then(
        res => {
          this.ngxService.stop();
          this.addNotify({
            title: 'Success',
            msg: 'Item Update Successsfully',
            type: 'success'
          });
          this.router.navigate(['/forms/add-on']);
        }
      ).catch(
        err => {
          this.ngxService.stop();
          this.addNotify({
            title: 'Error',
            msg: err.error.detail,
            type: 'error'
          });
        }
      );
    }
  }

  getModifiers() {
    this.itemService.getModifiers().subscribe(
      res => {
        if (res) {
          this.modifiers = res;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getModifiersGroup() {
    this.itemService.getModifiersGroup().subscribe(
      res => {
        if (res) {
          this.modifiersGroup = res;
        }
      }, error => {
        console.log(error);
      }
    );
  }

  selectModifiers(data){
    if (this.accepted === false){
      this.modifiersSelected.map((value: any, key: any) => {
        if(value === data){
          this.modifiersSelected.splice(key , 1);
          this.modifiersSelectedIds.splice(key , 1);
        }
      });
    }else {
      this.modifiersSelected.push(data);
      this.modifiersSelectedIds.push(data.id);
    }
  }

  selectModifiersGroup(data) {
    if (this.accepted === false){
      this.modifiersGroupSelected.map((value: any, key: any) => {
        if (value === data) {
          this.modifiersGroupSelected.splice(key , 1);
          this.modifiersGroupSelectedIds.splice(key , 1);
        }
      });
    }else {
      this.modifiersGroupSelected.push(data);
      this.modifiersGroupSelectedIds.push(data.id);
    }
  }

  onItemPictureSelect(event: any): void {
    this.itemPicture = event.target.files[0] as File ;
    this.itemPictureChange = true;
    this.photoName = this.itemPicture.name;
  }

  getSizeDropdownList(): any {
    this.itemService.getSizeDropdownList().then(response => {
      if (response.length > 0) {
        this.SizeDropdownList = response;
      } else {
      }
    });
  }

  getStoreIDDropdownList(): any {
    this.itemService.getStoreIDDropdownList().then(response => {
      if (response) {
        this.StoreIDList = response;
      } else {
      }
    });
  }
  getVendorsDropdownList(): any {
    this.itemService.getVendorsDropdownList().then(response => {
      if (response.length > 0) {
        this.VendorsDropdownList = response;
      } else {
      }
    });
  }
  getSubfamilyDropdownList(): any {
    this.itemService.getSubfamilyDropdownList().then(response => {
      if (response.length > 0) {
        this.SubfamilyDropdownList = response;
      } else {
      }
    });
  }
  getFamilyDropdownList(): any {
    this.itemService.getFamilyDropdownList().then(response => {
      if (response.length > 0) {
        this.FamilyDropdownList = response;
      } else {
      }
    });
  }
  getBrandDropdownList(): any {
    this.itemService.getBrandDropdownList().then(response => {
      if (response.length > 0) {
        this.BrandDropdownList = response;
      } else {
      }
    });
  }
  getDepartmentDropdownList(): any {
    this.itemService.getDepartmentDropdownList().then(response => {
      if (response.length > 0) {
        this.DepartmentDropdownList = response;
      } else {
      }
    });
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
