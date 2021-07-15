import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  userInfo$!: Observable<any>;

  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.userInfo$ = this.authorizationService.getUserInfo();
  }

  date(dayOfBirth: any) {
    return new Date(dayOfBirth).toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
  }
}
