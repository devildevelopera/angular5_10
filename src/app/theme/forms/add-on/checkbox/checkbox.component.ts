import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input ,Output,EventEmitter} from '@angular/core';
import { InventoryService } from '../../inventory.service';
import { NotificationsService } from 'angular2-notifications';
import Swal from 'sweetalert2';
import { NgxUiLoaderService, NgxUiLoaderConfig } from 'ngx-ui-loader'
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: [
    './checkbox.component.scss',
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ],
  providers: [InventoryService]
})
export class CheckboxComponent implements OnInit {
  url: any;
  options: any = {
    position: ['bottom', 'right'],
  };
  @Output() isEditMode = new EventEmitter<boolean>();
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
  @Input() inventories: any[];
  IsImport:boolean=true;
  SizeDropdownList: any;
  constructor(private service: InventoryService, public sanitizer: DomSanitizer,
    private servicePNotify: NotificationsService, private router: Router,
    private ngxService: NgxUiLoaderService) { 
      this.config = this.ngxService.getDefaultConfig();
      this.config.fgsType="ball-spin-clockwise";
    this.config.fgsSize=100;
  }

  getUrl(url): Observable<any>{
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return this.url;
  }

  updateValue(event, type, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + type] = false;
    if (type == 'row.itemName') {
      cell.itemName = event.target.value;
    }
    if (type == 'row.itemNum') {
      cell.itemNum = event.target.value;
    }
    if (type == 'row.itemPrice') {
      cell.itemPrice = event.target.value;
    }
    if (type == 'row.stock') {
      cell.stock = event.target.value;
    }


    this.service.updateInventory(cell).then(res => {
      if (res != null) {
        this.addNotify({ title: 'Success', msg: 'Record updated successfully', type: 'success' });
      }
      else {
        this.addNotify({ title: 'Error', msg: res.error.detail, type: 'error' });
      }
      // if(res.)
      // this.addNotify({title:'Success', msg: 'Record Added Successsfully ',type:'success'});
    });
  }
  deleteInventoryById(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wont be able to revert',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(res => {
      if (res.value) {
        this.service.deleteInventoryById(id).then(response => {
          if (response.status === 200) {
            this.fetchInventoryList();
            this.addNotify({ title: 'Success', msg: 'Record deleted successfully', type: 'success' });
          }
          else {
            this.addNotify({ title: 'Error', msg: response.error.detail, type: 'error' });
          }

        })
      }
    })

  }
  UpdateInventoryById(id) {
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
        this.router.navigate([`/forms/edit-item/${id}`]);
        // this.ngxService.start();
        // this.service.GetInventoryById(id).then(response => {
          // this.ngxService.stop();
          // if(response.id!=null)
          // this.isEditMode.emit(response);
        //   if (response.status == 200) {
        //     this.addNotify({ title: 'Success', msg: 'Record deleted successfully', type: 'success' });
        //   }
        //   else {
        //     this.addNotify({ title: 'Error', msg: response.error.detail, type: 'error' });
        //   }

        // })
      // })
    }
    })

  }
  ngOnInit() {
    this.getSizeDropdownList();
    //this.fetchInventoryList();
  }
  getSizeDropdownList(): any {
    this.service.getSizeDropdownList().then(response => {
      if (response.length > 0) {
        this.SizeDropdownList = response;
      }
      else {

      }
    })
  }

  fetchInventoryList(): any {
    this.ngxService.start();
    this.service.getInventoryList().then( res => {
      this.ngxService.stop();
      if (res.length > 0 ) {
        this.inventories = res;
        for (let i = 0; i < res.length; i++) {
          if(res[i].imgUrl){
            this.service.getDecryptedUrl(res[i].imgUrl).subscribe(
              res => {
                console.log(res);
              }, error => {
                this.inventories[i].imgUrl = error.error.text;
              }
            );
          }
        }
      }else {

      }
    })
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) { }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [this.rows[1], this.rows[3]];
  }

  remove() {
    this.selected = [];
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
