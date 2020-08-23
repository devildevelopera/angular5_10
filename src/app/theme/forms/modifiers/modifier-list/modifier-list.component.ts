import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxUiLoaderConfig } from 'ngx-ui-loader';
import { ModifiersService } from '../modifiers.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-modifier-list',
  templateUrl: './modifier-list.component.html',
  styleUrls: ['./modifier-list.component.scss','../../../../../assets/icon/icofont/css/icofont.scss']
})
export class ModifierListComponent implements OnInit {

  @Input() modifiers: any [] = [];
  @Output() isEditMode = new EventEmitter<boolean>();
  @Output() isDeleteOne = new EventEmitter<boolean>();
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
  options: any = {
    position: ['bottom', 'right'],
  };

  constructor(private modifierService: ModifiersService, private servicePNotify: NotificationsService) { }

  ngOnInit() {
  }

  updateModifier(data) {
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
        this.isEditMode.emit(data);
      }
    })
  }

  deleteModifier(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wont be able to revert',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(
      res => {
        if (res.value) {
          this.modifierService.deleteModifier(id).then(
            response => {
              if (response.status === 200) {
                this.isDeleteOne.emit(id);
                this.addNotify({ title: 'Success', msg: 'Record deleted successfully', type: 'success' });
              }else {
                this.addNotify({ title: 'Success', msg: 'Record deleted successfully', type: 'success' });
              }
              }, err => {
                // this.addNotify({ title: 'Error', msg: err.error.detail, type: 'error' });
            }
          );
        }
      }
    )
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
