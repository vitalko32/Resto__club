import { Injectable } from "@angular/core";
import * as Cookies from 'js-cookie';
import { BehaviorSubject } from "rxjs";
declare var google: any;

// google translate
@Injectable()
export class GTService {    
    public lang: string = null; // язык, с которого переводим   
    public ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
    
    public prepare(): void {        
        let script = document.createElement("script");
	    script.src = `//translate.google.com/translate_a/element.js?cb=gtInit`;
	    document.getElementsByTagName("head")[0].appendChild(script);        
    }

    public init() {        
        let lang = this.getCookieLang() || this.lang;        
        
	    if (lang === this.lang) {
		    this.setCookie(null);
	    }

	    new google.translate.TranslateElement({pageLanguage: this.lang});
        this.ready.next(true);	    
        
        this.setEventHandler("click", "[data-google-lang]", (e) => {
		    this.setCookie("/" + this.lang + "/" + e.getAttribute("data-google-lang"));
		    window.location.reload();
	    });
    }    

    public getCookieLang(): string {
        return Cookies.get("googtrans") !== undefined && Cookies.get("googtrans") !== "null" ? Cookies.get("googtrans").split("/")[2] : null;        
    }    

    private setCookie(val): void {
        Cookies.set("googtrans", val);        
    }

    private setEventHandler(event, selector, handler): void {        
        document.addEventListener(event, function (e) {
            let el = e.target.closest(selector);
            if (el) handler(el);            
        });
    }    
}