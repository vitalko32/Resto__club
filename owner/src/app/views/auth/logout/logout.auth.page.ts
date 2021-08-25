import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "logout-auth-page",
    template: "",
})
export class LogoutAuthPage implements OnInit {
    constructor(
        private authService: AuthService,        
        private router: Router,
    ) {}

    public ngOnInit(): void {
        this.authService.logout();            
        this.router.navigateByUrl("/auth/login");
    }
}