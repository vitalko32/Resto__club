import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Injectable()
export class AppService {
    public url: string[] = [];        
    public title: string = "";    
    // error notifications
    public errorActive: boolean = false;
    public errorMessage: string = "";
    public errorTimer: number = null;  
    
    constructor(private titleService: Title) {}    
    
    public showError(error: any): void {
        if (this.errorTimer) {
            clearTimeout(this.errorTimer);
        }    
        
        this.errorMessage = typeof(error) !== "string" ? JSON.stringify(error) : error;        
        this.errorActive = true;
        this.errorTimer = window.setTimeout (() => {
            this.errorActive = false;
            this.errorTimer = null;
        }, 3000);

        console.log(error);
    }

    public setTitle (title: string) {
        this.title = title;
        this.titleService.setTitle(this.decodeHTMLEntities(title));
    }    

    public pause(ms: number): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), ms);
        });
    }

    public decodeHTMLEntities(text: string): string {
        let entities = [['amp', '&'], ['apos', '\''], ['#x27', '\''], ['#x2F', '/'], ['#39', '\''], ['#47', '/'], ['lt', '<'], ['gt', '>'], ['nbsp', ' '], ['quot', '"']];
    
        for (let i: number = 0, max: number = entities.length; i < max; ++i) {
            text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);
        }            
    
        return text;
    }     
}