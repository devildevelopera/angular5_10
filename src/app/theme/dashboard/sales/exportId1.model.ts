import { DecimalPipe } from "@angular/common";

export class ExportIdModel {
    Rows: string;
    Amount: DecimalPipe;
    Sale: DecimalPipe;
    Store: string;
    Cash: DecimalPipe;
    Tip: DecimalPipe;
    Id: number;
    Date: Date;
    HH_mm: string;
    DateAndTime: Date;
    ExportID1DataList: ExportIdModel[];
}
