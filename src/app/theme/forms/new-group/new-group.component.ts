import { Component, OnInit } from "@angular/core";
import { NgxUiLoaderConfig, NgxUiLoaderService } from "ngx-ui-loader";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import { InventoryService } from "../inventory.service";
import { Modifier } from "../basic-elements/modifier";
import { ModifierGroupService } from "./modifier-group.service";

@Component({
  selector: "app-new-group",
  templateUrl: "./new-group.component.html",
  styleUrls: ["./new-group.component.scss"]
})
export class NewGroupComponent implements OnInit {
  modifiers: any[] = [];
  stores: any[] = [];
  modifierPut: Modifier[] = [];
  modifier: Modifier = new Modifier();
  config: NgxUiLoaderConfig;
  options: any = {
    position: ["bottom", "right"]
  };
  formData: any = {};
  errors: any[] = [];
  selected: any[];
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

  constructor(
    private ngxService: NgxUiLoaderService,
    private fb: FormBuilder,
    private servicePNotify: NotificationsService,
    private service: InventoryService,
    private groupService: ModifierGroupService
  ) {
    this.config = this.ngxService.getDefaultConfig();
    this.config.fgsType = "ball-spin-clockwise";
  }

  ngOnInit() {
    this.ngxService.start();
    this.getModifiers();
    this.getStoreIDDropdownList();
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
  getStoreIDDropdownList(): any {
    this.service.getStoreIDDropdownList().then(response => {
      if (response) {
        this.stores = response;
        console.log(response);
      } else {
      }
    });
  }

  getModifiers() {
    this.service.getModifiers().subscribe(
      res => {
        if (res) {
          this.modifiers = res;
          this.ngxService.stop();
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  selectedModifier(modifier) {
    console.log(modifier);
  }

  handle() {
    console.log(this);
    this.formData.modifiers = this.selected;
  }
  save() {
    this.ngxService.start();
    this.groupService.createGroup(this.formData).subscribe(
      res => {
        this.ngxService.stop();
        this.addNotify({
          title: 'Success',
          msg: 'Records Added Successsfully',
          type: 'success'
        });
        this.formData = {};
      },
      err => {
        this.ngxService.stop();
        this.addNotify({title: 'Error', msg:err.error.detail,  type: 'error'});
      }
    );
  }
}
