export class QuickItem {
    id: string;
    itemnum: number;
    itemid: number;
    itemname: string;
    itemprice: number;
    deptid: number;
    cost: number;
    storeid: number;

    constructor(
        id?: string,
        itemnum?: number,
        itemid?: number,
        itemname?: string,
        itemprice?: number,
        deptid?: number,
        cost?: number,
        storeid?: number
    ){
        this.id = id ? id : null;
        this.itemnum = itemnum ? itemnum : null;
        this.itemid = itemid ? itemid : null;
        this.itemname = itemname ? itemname : null;
        this.itemprice = itemprice ? itemprice : null;
        this.deptid = deptid ? deptid : null;
        this.cost = cost ? cost : null;
        this.storeid = storeid ? storeid : null
    }
}
