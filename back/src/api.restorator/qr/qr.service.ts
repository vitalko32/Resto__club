import { Injectable } from "@nestjs/common";
import { APIService } from "src/common/api.service";
import * as QRCode from 'qrcode';

@Injectable()
export class QRService extends APIService {
    public async getImage(text: string, width: number): Promise<Buffer> {        
        try {
            return QRCode.toBuffer(text, {width, margin: 3, errorCorrectionLevel: "H"});
        } catch (err) {
            const errTxt: string = `Error in QRService.getImage: ${String(err)}`;
            console.log(errTxt);
            return null;
        }        
    }    
}