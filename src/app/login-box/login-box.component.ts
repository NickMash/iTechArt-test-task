import { Component } from '@angular/core';
import {AuthorizationService} from '../services/authorization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent {

  constructor(public authorizationService: AuthorizationService, private router: Router) {}

  logOut(): void {
    this.authorizationService.logOut().subscribe(() => {
      this.router.navigateByUrl('login');
    });
  }
}
