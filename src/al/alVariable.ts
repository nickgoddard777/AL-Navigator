import { isUndefined } from "util";
import { StringFunctions } from '../additional/stringFunctions';
import { ALVarTypes } from "../additional/alVarTypes";

export class ALVariable {
    public name: string;
    public objectType: string = "";
    public objectName: string = "";
    public isLocal: boolean = true;
    public isTemporary: boolean = false;
    public varType: ALVarTypes | undefined;
    public varValue: string = "";
    
    constructor(name: string) {
        this.name = name;
    }

    public getVariableDeclarationString(): string {
        let declarationString = "";
        declarationString += this.name;
        declarationString += ": ";
        declarationString += this.objectType;
        if (this.varValue) {
            declarationString += this.varValue;
        }
        if (this.objectName) {
            declarationString += " ";
            declarationString += StringFunctions.containsSpecialChars(this.objectName)? "\"" + this.objectName + "\"" : this.objectName;
        }
        if (this.isTemporary) {
            declarationString += ' temporary';
        }
        declarationString += ';';
        return declarationString;
    }
    
}