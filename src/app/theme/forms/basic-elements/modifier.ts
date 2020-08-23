export class Modifier {
    id: string;
    storeid: number;
    modifierName: string;
    modifierID: number;
    modifierNum: number;
    modifierPrice1: number;
    modifierPrice2: number;
    modifierPrice3: number;
    modifierPrice4: number;
    modifierADDDSC1: string;
    modifierADDDSC2: string;
    modifierADDDSC3: string;
    modifierADDDSC4: string;
    deptId: number;
    itemId: number;
    comment: string;

    constructor(
        id?: string,
        storeid?: number,
        modifierName?: string,
        modifierID?: number,
        modifierNum?: number,
        modifierPrice1?: number,
        modifierPrice2?: number,
        modifierPrice3?: number,
        modifierPrice4?: number,
        modifierADDDSC1?: string,
        modifierADDDSC2?: string,
        modifierADDDSC3?: string,
        modifierADDDSC4?: string,
        deptId?: number,
        itemId?: number,
        comment?: string,
        ){
        this.id = id ? id : null;
        this.storeid = storeid ? storeid : null;
        this.modifierName = modifierName ? modifierName : null;
        this.modifierID = modifierID ?  modifierID : null;
        this.modifierNum = modifierNum ? modifierNum : null;
        this.modifierPrice1 = modifierPrice1 ? modifierPrice1 : null;
        this.modifierPrice2 = modifierPrice2 ? modifierPrice2 : null;
        this.modifierPrice3 = modifierPrice3 ? modifierPrice3 : null;
        this.modifierPrice4 = modifierPrice4 ? modifierPrice4 : null;
        this.modifierADDDSC1 = modifierADDDSC1 ? modifierADDDSC1 : null;
        this.modifierADDDSC2 = modifierADDDSC2 ? modifierADDDSC2 : null;
        this.modifierADDDSC3 = modifierADDDSC3 ? modifierADDDSC3 : null;
        this.modifierADDDSC4 = modifierADDDSC4 ? modifierADDDSC4 : null;
        this.deptId = deptId ? deptId : null;
        this.itemId = itemId ? itemId : null;
        this.comment = comment ? comment : null;
    }
}
