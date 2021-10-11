import { Injectable } from "@angular/core";
import * as Cookies from 'js-cookie';
declare var google: any;

// google translate
@Injectable()
export class GTService {    
    public originalLang: string = null; // язык, с которого переводим   
    public currentLang: string = null; // язык, на который переводим    
    
    public prepare(): void {        
        let script = document.createElement("script");
	    script.src = `//translate.google.com/translate_a/element.js?cb=gtInit`;
	    document.getElementsByTagName("head")[0].appendChild(script);        
    }

    public init(): void {        
        this.currentLang = this.getCookieLang() || this.originalLang;        
        
	    if (this.currentLang !== this.originalLang) { // на язык оригинала перевод не нужен
		    new google.translate.TranslateElement({pageLanguage: this.originalLang});        
	    }	    
    }    

    private getCookieLang(): string {
        return Cookies.get("googtrans") !== undefined ? Cookies.get("googtrans").split("/")[2] : null;        
    }    

    public translate(lang): void {
        Cookies.set("googtrans", "/" + this.originalLang + "/" + lang);         
        window.location.reload();
    }     
}