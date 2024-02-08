import { Component, Input } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { MenuService } from '../app.menu.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html',
})
export class AppConfigComponent {
    display: boolean = false;

    currentPass: string = '';
    newPass: string = '';
    cnewPass: string = '';
    public user: any = sessionStorage.getItem('user_identifier');

    @Input() minimal: boolean = false;

    constructor(
        public layoutService: LayoutService,
        public menuService: MenuService,
        private router: Router,
        private toast: NgToastService
    ) {}

    isSidebarOpen: boolean = false;

    onConfigButtonClick() {
        this.isSidebarOpen = true;
    }

    logout() {
        this.toast.info({
            detail: 'LOGGED OUT !',
            summary: 'See you again next time.',
            duration: 1500,
        });
        setTimeout(() => this.router.navigate(['']), 2000);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('login');
        localStorage.removeItem('token');
        this.isSidebarOpen = false;
    }
}
