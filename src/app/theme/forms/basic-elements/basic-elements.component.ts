import { Component, OnInit } from "@angular/core";
import { InventoryService } from "../inventory.service";
import { animate, style, transition, trigger } from "@angular/animations";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import {
  NgxUiLoaderService,
  NgxUiLoaderConfig
} from "../../../../../node_modules/ngx-ui-loader";
import { Observable } from "rxjs";
import { Modifier } from "./modifier";

//import 'jquery';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
//declare var $: any;
@Component({
  selector: "app-basic-elements",
  templateUrl: "./basic-elements.component.html",
  styleUrls: ["./basic-elements.component.scss", '../../../../assets/icon/icofont/css/icofont.scss'],
  providers: [InventoryService],
  animations: [
    trigger("fadeInOutTranslate", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("400ms ease-in-out", style({ opacity: 1 }))
      ]),
      transition(":leave", [
        style({ transform: "translate(0)" }),
        animate("400ms ease-in-out", style({ opacity: 0 }))
      ])
    ])
  ]
})
export class BasicElementsComponent implements OnInit {
  time = {hour: 13, minute: 30};
  meridian = false;
  model:any;
  formData: any = {};
  public tabIndex = new Array(true, false, false, false, false, false, false, false);
  options: any = {
    position: ["bottom", "right"]
  };
  config: NgxUiLoaderConfig;
  position1 = "top";
  position2 = "right";
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
  VendorsDropdownList: any;
  SubfamilyDropdownList: any;
  FamilyDropdownList: any;
  BrandDropdownList: any;
  DepartmentDropdownList: any;
  SizeDropdownList: any;
  IsAddInventory: boolean = false;
  StoreIDList: any;
  InventoryForm: FormGroup;
  count: any;
  modifiers: Modifier[] = [];
  modifiersGroup: any[] = [];
  categories: any[] = [];
  sections: any[] = [];
  modifierPut: Modifier[] = [];
  modifier: Modifier = new Modifier();
  itemPictureChange: boolean;
  itemPicture: File;
  photoName: string;
  modifiersSelected: Modifier [] = [];
  modifiersSelectedIds: Modifier [] = [];
  modifiersGroupSelected: any[] = [];
  modifiersGroupSelectedIds: any[] = [];
  modifiersDisplay: any [] = [];
  accepted: Boolean;
  departmentId: any;

  public tabIndexClick(index: number) {
    for (let i = 0; i <= this.tabIndex.length - 1; i++) {
      if (index == i) this.tabIndex[i] = true;
      else this.tabIndex[i] = false;
    }
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
        if(value === data){
          this.modifiersGroupSelected.splice(key , 1);
          this.modifiersGroupSelectedIds.splice(key , 1);
        }
      });
    }else {
      this.modifiersGroupSelected.push(data);
      this.modifiersGroupSelectedIds.push(data.id);
    }
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

  save() {
    this.ngxService.start();
    this.formData.modifiersIds = this.modifiersSelectedIds;
    this.formData.modifiersGroupsIds = this.modifiersGroupSelectedIds;
    this.formData.cost = 0.00;
    if (this.itemPictureChange) {
      this.service.uploadItemPicture(this.itemPicture).subscribe(
        (res: any) => {
          this.ngxService.stop();
            console.log('User profile picture was uploaded. ' + res.body);
            this.addNotify({
                title: "Success",
                msg: "Image uploaded Successsfully ",
                type: "success"
              });
        }, (error: HttpErrorResponse) => {
          if (error.status === 200) {
            this.formData.imgUrl = error.error.text;
             this.service.createItem(this.formData).subscribe(
              res => {
                this.ngxService.stop();
                    this.addNotify({
                      title: "Success",
                      msg: "Item Added Successsfully ",
                      type: "success"
                    });
                    this.router.navigate(['/forms/add-on']);
              }, error => {
                this.ngxService.stop();
                this.addNotify({
                  title: "Error",
                  msg: error.error.detail,
                  type: "error"
                });
              }
            );
          }else{
            this.ngxService.stop();
            this.addNotify({
                title: "Error",
                msg: 'image not saved!',
                type: "error"
              });
            }
        }
      );
    }
    else {
      this.service.createItem(this.formData).subscribe(
        res => {
          this.ngxService.stop();
              this.addNotify({
                title: "Success",
                msg: "Item Added Successsfully ",
                type: "success"
              });
              this.router.navigate(['/forms/add-on']);
        }, error => {
          this.ngxService.stop();
          this.addNotify({
            title: "Error",
            msg: error.error.detail,
            type: "error"
          });
        }
      );
    }
  }

  onItemPictureSelect(event: any): void {
    this.itemPicture = event.target.files[0] as File ;
    this.itemPictureChange = true;
    this.photoName = this.itemPicture.name;
  }

  getInventoryListCount(): any {
    this.service.getInventoryListCount(0, 5).then(response => {
      this.ngxService.stop();
      if (response.list) {
        this.count = response.totalCount;
      } else {
      }
    });
  }
  getStoreIDDropdownList(): any {
    this.service.getStoreIDDropdownList().then(response => {
      if (response) {
        this.StoreIDList = response;
      } else {
      }
    });
  }
  getVendorsDropdownList(): any {
    this.service.getVendorsDropdownList().then(response => {
      if (response.length > 0) {
        this.VendorsDropdownList = response;
      } else {
      }
    });
  }
  getSubfamilyDropdownList(): any {
    this.service.getSubfamilyDropdownList().then(response => {
      if (response.length > 0) {
        this.SubfamilyDropdownList = response;
      } else {
      }
    });
  }
  getFamilyDropdownList(): any {
    this.service.getFamilyDropdownList().then(response => {
      if (response.length > 0) {
        this.FamilyDropdownList = response;
      } else {
      }
    });
  }
  getBrandDropdownList(): any {
    this.service.getBrandDropdownList().then(response => {
      if (response.length > 0) {
        this.BrandDropdownList = response;
      } else {
      }
    });
  }
  getDepartmentDropdownList(): any {
    this.service.getDepartmentDropdownList().then(response => {
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
        "position1" in options ? options.position1 : this.position1,
        "position2" in options ? options.position2 : this.position2
      ],
      maxStack: "maxStack" in options ? options.maxStack : this.maxStack,
      timeOut: options.timeOut ? options.timeOut : this.timeOut,
      showProgressBar:
        "showProgressBar" in options
          ? options.showProgressBar
          : this.showProgressBar,
      pauseOnHover:
        "pauseOnHover" in options ? options.pauseOnHover : this.pauseOnHover,
      lastOnBottom:
        "lastOnBottom" in options ? options.lastOnBottom : this.lastOnBottom,
      clickToClose:
        "clickToClose" in options ? options.clickToClose : this.clickToClose,
      maxLength: options.maxLength ? options.maxLength : this.maxLength,
      preventDuplicates:
        "preventDuplicates" in options
          ? options.preventDuplicates
          : this.preventDuplicates,
      preventLastDuplicates:
        "preventLastDuplicates" in options
          ? options.preventLastDuplicates
          : this.preventLastDuplicates,
      theClass: options.theClass ? options.theClass : this.theClass,
      rtl: "rtl" in options ? options.rtl : this.rtl,
      animate: options.animate ? options.animate : this.animate,
      icons: options.icons ? options.icons : this.icons
    };

    switch (options.type) {
      case "success":
        this.servicePNotify.success(
          options.title ? options.title : this.title,
          options.msg ? options.msg : this.msg
        );
        break;
      case "error":
        this.servicePNotify.error(
          options.title ? options.title : this.title,
          options.msg ? options.msg : this.msg
        );
        break;
      case "alert":
        this.servicePNotify.error(
          options.title ? options.title : this.title,
          options.msg ? options.msg : this.msg
        );
        break;
      case "warn":
        this.servicePNotify.error(options.msg ? options.msg : this.msg);
        break;
      case "info":
        this.servicePNotify.info(options.msg ? options.msg : this.msg);
        break;
      case "create":
        this.servicePNotify.create(
          options.title ? options.title : this.title,
          options.msg ? options.msg : this.msg,
          options.type ? options.type : this.subType
        );
        break;
      case "html":
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
  getSizeDropdownList(): any {
    this.service.getSizeDropdownList().then(response => {
      if (response.length > 0) {
        this.SizeDropdownList = response;
      } else {
      }
    });
  }

  getSectionList(): any {
    this.service.getSections().subscribe(
      res => {
        if (res) {
          this.sections = res;
        }else {

        }
      }, error => {
        console.log(error);
      }
    );
  }

  getCategoryList(): any {
   this.service.getCategories().subscribe(
     res => {
       if (res) {
         this.categories = res;
       }else{

       }
     }, error => {
       console.log(error);
     }
   ); 
  }

  getModifiers() {
    this.service.getModifiers().subscribe(
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
    this.service.getModifiersGroup().subscribe(
      res => {
        if (res) {
          this.modifiersGroup = res;
        }
      }, error => {
        console.log(error);
      }
    );
  }

  constructor(
    private service: InventoryService,
    private servicePNotify: NotificationsService,
    public fb: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ) {
    this.config = this.ngxService.getDefaultConfig();
    this.config.fgsType = "ball-spin-clockwise";
    this.config.fgsSize = 100;
    this.InventoryForm = this.fb.group({
      storeid: ["", [<any>Validators.required]],
      itemname: ["", [<any>Validators.required]],
      modifiers: this.fb.array([]),
      numPerCase: [""],
      itemid: ["", [Validators.required]],
      itemprice: ["", [<any>Validators.required]],
      sizeList: [""],
      deptid: ["", [<any>Validators.required]],
      brand: [""],
      family: [""],
      tax_1: [false],
      foodStampable: [false],
      autoWeigh: [false],
      checkId2: [false],
      checkId: [false],
      askQuantity: [false],
      askPrice: [false],
      askDescription: [false],
      active_online: [false],
      reorder: [""],
      bulkPricing: [""],
      points: [""],
      itemnum: [""],
      section: [""],
      vendorPartNumber: [""],
      vendorName: [""],
      subFamily: [""],
      countItem: [false],
      disabled: [false],
      stock: [""],
      minPrice: [""],
      location: [""],
      cost: [""]
    });
  }

  ngOnInit() {
    this.ngxService.start();
    this.getInventoryListCount();
    this.getModifiers();
    this.getModifiersGroup();
    this.getSizeDropdownList();
    this.getDepartmentDropdownList();
    this.getBrandDropdownList();
    this.getFamilyDropdownList();
    this.getSubfamilyDropdownList();
    this.getVendorsDropdownList();
    this.getStoreIDDropdownList();
    this.modifierPut.push(this.modifier);
    this.patch();
    // $(document).ready(function() {
    //   var stepper = new Stepper($(".bs-stepper")[0], {
    //     linear: false,
    //     animation: true
    //   });
    // });
  }
  nextStep(num) {
    var target = document.getElementById("information-part-trigger").click();
    // var stepper = new Stepper(document.querySelector('#stepper1'), {linear: false,animation: true});
    // stepper.next();
  }

  patch() {
    const control = <FormArray>this.InventoryForm.get("modifiers");
    this.modifierPut.forEach(modifier => {
      control.push(
        this.patchValues(
          modifier.id,
          modifier.storeid,
          modifier.modifierName,
          modifier.modifierID,
          modifier.modifierNum,
          modifier.modifierPrice1,
          modifier.modifierPrice2,
          modifier.modifierPrice3,
          modifier.modifierPrice4,
          modifier.modifierADDDSC1,
          modifier.modifierADDDSC2,
          modifier.modifierADDDSC3,
          modifier.modifierADDDSC4,
          modifier.deptId,
          modifier.itemId,
          modifier.comment
        )
      );
    });
  }

  patchValues(
    id,
    storeid,
    modifierName,
    modifierID,
    modifierNum,
    modifierPrice1,
    modifierPrice2,
    modifierPrice3,
    modifierPrice4,
    modifierADDDSC1,
    modifierADDDSC2,
    modifierADDDSC3,
    modifierADDDSC4,
    deptId,
    itemId,
    comment
  ) {
    return this.fb.group({
      id: [id],
      storeid: [storeid],
      modifierName: [modifierName],
      modifierID: [modifierID],
      modifierNum: [modifierNum],
      modifierPrice1: [modifierPrice1],
      modifierPrice2: [modifierPrice2],
      modifierPrice3: [modifierPrice3],
      modifierPrice4: [modifierPrice4],
      modifierADDDSC1: [modifierADDDSC1],
      modifierADDDSC2: [modifierADDDSC2],
      modifierADDDSC3: [modifierADDDSC3],
      modifierADDDSC4: [modifierADDDSC4],
      deptId: [deptId],
      itemId: [itemId],
      comment: [comment]
    });
  }
  handleModifier(modifier) {
    const control = <FormArray>this.InventoryForm.get("modifiers");
    // control.push(modifier);
    this.modifiers.forEach((modifier, index) => {
      console.log("--------------", modifier);

      control.at(index).setValue(modifier);
    });
  }
  SubmitInventoryDetails(formData): any {
    if (this.InventoryForm.valid) {
      console.log(formData);

      this.ngxService.start();

      //  this.SizeDropdownList.forEach(element => {
      //    if(element.sizeId==formData.sizeList){
      //      formData.sizeList= element.unit+' '+element.measurement;
      //    }
      //  });
      // if(formData.storeId=="ALL"){
      //   this.StoreIDList.forEach(element => {
      //     formData.storeId=element.storeId;
      //     formData.itemId=this.count+1;
      //     this.service.SubmitInventoryDetails(formData).then(response => {
      //       this.ngxService.stop();
      //       if(response.storeId!=null)
      //       {
      //         this.addNotify({title:'Success', msg: 'Record Added Successsfully ',type:'success'});
      //         this.InventoryForm.reset();
      //         this.getInventoryListCount();
      //       }
      //       else if(response.status==401)
      //       {
      //         this.addNotify({title:'Error', msg:response.error.detail,  type:'error'});
      //       }
      //       else{
      //         this.addNotify({title:'Error', msg:response.error.detail,  type:'error'});
      //       }
      //       }).catch(response=>{
      //   //this.message=response.message;
      //   });

      //   });

      // }
      // else
      // {

      this.service
        .SubmitInventoryDetails(formData)
        .then(response => {
          this.ngxService.stop();
          if (response.storeid != null) {
            this.addNotify({
              title: "Success",
              msg: "Record Added Successsfully ",
              type: "success"
            });
            this.InventoryForm.reset();
            this.getInventoryListCount();
          } else if (response.status == 401) {
            this.addNotify({
              title: "Error",
              msg: response.error.detail,
              type: "error"
            });
          } else {
            this.addNotify({
              title: "Error",
              msg: response.error.detail,
              type: "error"
            });
          }
        })
        .catch(response => {
          //this.message=response.message;
        });
    }

    // }
    else {
      Object.keys(this.InventoryForm.controls).forEach(key => {
        this.InventoryForm.get(key).markAsTouched();
      });
      this.addNotify({
        title: "Warning",
        msg: "Please Fill All Complusory Fileds",
        type: "crate",
        subType: "warn"
      });
      return;
    }
  }
}
