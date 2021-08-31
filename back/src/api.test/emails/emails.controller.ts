import { Controller, Post } from "@nestjs/common";
import { EmailsService } from "./emails.service";

@Controller('api/test/emails')
export class EmailsController {
    constructor (private emailsService: EmailsService) {}        
    
    @Post("test")
    public test(): string {
        return this.emailsService.test();
    }    
}
