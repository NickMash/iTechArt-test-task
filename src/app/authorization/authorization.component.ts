import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthorizationService } from '../services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  public loginForm!: FormGroup;
  public maxLength = 30;
  public minLength = 3;
  public hideShow = true;


  constructor(
    private fb: FormBuilder,
    public authorizationService: AuthorizationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]],
      password: ['', [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]]
    });
  }

  logIn(): void {
    this.authorizationService.logIn(this.loginForm?.value).subscribe(response => {
        this.authorizationService.setToken(response.data.token);
        this.router.navigateByUrl('');
    });
  }
}
