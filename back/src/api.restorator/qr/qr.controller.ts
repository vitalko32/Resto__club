import { Controller, Get, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { QRService } from "./qr.service";

@Controller('api/restorator/qr')
export class QRController {
    constructor (private qrService: QRService) {}    

    @Get("get-image") //?text=[...]&width=[...]&mode=[get|download]
    public async qr(@Query() query, @Res() res: Response): Promise<void> {                
        let buf: Buffer = await this.qrService.getImage(query.text, parseInt(query.width));        
        res.set("Content-type", "image/png");
        query.mode === "download" ? res.set("Content-Disposition", "attachment; filename=qr.png") : null;
        res.end(buf);
    }    
}



