import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgxUiLoaderConfig, NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from '../dashboard.service';
import { ExportIdModel } from './exportId1.model';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ],
 // styleUrls: ['./sales.component.scss'],
  providers:[NgxUiLoaderService,DashboardService]
})
export class SalesComponent implements OnInit {

  dataFetched: any[] = [];
  ExportId1:ExportIdModel;
  ExportId1Model:ExportIdModel[];
  exportID1Data:ExportIdModel[]=[];
  config: NgxUiLoaderConfig;
  distinctShop:number[];
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

  constructor(private salesService: DashboardService,private ngxService: NgxUiLoaderService) { 
    this.config = this.ngxService.getDefaultConfig();
       this.config.fgsType="ball-spin-clockwise";
     this.config.fgsSize=100;
  }
  ngOnInit() {
    this.ngxService.start();
    this.salesService.fetchData().then(res=>{
      if ( res.length > 0 ) {
        this.dataFetched = res;
        this.ngxService.stop();
        // for (let index = 0; index < res.length; index++) {
        //   var objectBody= res[index];
        //   for (var k = 0; k < objectBody.length; k++)
        //   {
        //     var item:ExportIdModel;
        //       if (objectBody[k] != null)
        //       {
        //           if (k == 0)
        //           {
        //             item.Rows = (objectBody[k]);
        //           }
        //           else if (k == 1)
        //           {
        //             item.Amount = objectBody[k];
        //           }
        //           else if (k == 2)
        //           {
        //             item.Sale = (objectBody[k]);
        //           }
        //           else if (k == 3)
        //           {
        //             item.Store = (objectBody[k]);
        //           }
        //           else if (k == 4)
        //           {
        //             item.Cash = (objectBody[k]);
        //           }
        //           else if (k == 5)
        //           {
        //             item.Tip = (objectBody[k]);
        //           }
        //           else if (k == 6)
        //           {
        //             item.Id =parseInt(objectBody[k]);
        //           }
        //           else if (k == 7)
        //           {
        //             item.HH_mm =objectBody[k];
        //           }
        //           else if (k == 8)
        //           {
        //             item.Date =new Date(objectBody[k]);
        //           }
        //           item.DateAndTime = new Date(item.Date.toLocaleDateString() + " " + item.HH_mm);
        //       }
        //       debugger
        //       this.ExportId1.ExportID1DataList.push(item);

        //   }
        // }
        // this.ExportId1.ExportID1DataList.forEach(element => {
        //   if(!this.distinctShop.includes(element.Id))
        //   {
        //     this.distinctShop.push(element.Id);
        //   }
        // });
        // if(this.distinctShop.length>0)
        // {
        //   this.distinctShop.forEach(element => {
        //      var a=this.ExportId1.ExportID1DataList.filter(x => x.Id == element);
        //   });
            
        // }
      }
    }
    );
  }

}
