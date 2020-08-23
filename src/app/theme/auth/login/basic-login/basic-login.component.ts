import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginVModal } from './basic-login.modal';
import { LoginService } from '../login.service';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss'],
  providers:[LoginService]
})
export class BasicLoginComponent implements OnInit {
  loginFormValidate:FormGroup;
  message: string=undefined;
  constructor(public fb: FormBuilder,
    public _service:LoginService,
    public route:Router,
  public modal:LoginVModal) { 
    this.loginFormValidate = this.fb.group({
      UserName: ['', [<any>Validators.required, <any>Validators.maxLength(100)]],
      Password: ['', [<any>Validators.required, <any>Validators.maxLength(15)]],
      Remember: [false],
    })
  }

  ngOnInit() {
    sessionStorage.clear();
  }
  //function to Authorize Login 
  SubmitUserLoginCredentials(formData)
  {
    this.message=undefined;
    if (this.loginFormValidate.valid) {
      this.modal.username= formData.UserName;
      this.modal.password= formData.Password;
      this.modal.rememberMe= formData.Remember;
     // this.route.navigate(['/dashboard/default']);
      this._service.SubmitUserLoginCredentials(this.modal).then(response => {
        if(response.id_token!=null)
        {
          sessionStorage.setItem('AuthorizeToken',JSON.stringify(response));
          this.route.navigate(['/dashboard/default']);
        }
        else if(response.status==401)
        {
          this.message=response.statusText;
        }
        else{
          this.message=response.statusText;
        }

      }).catch(response=>{
        this.message=response.message;
      });
    }
    else {
      Object.keys(this.loginFormValidate.controls).forEach(key => {
        this.loginFormValidate.get(key).markAsTouched();
      });
      return;
    }
  }

}
