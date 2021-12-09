import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { allowedMailPattern, loginFormError, loginFormMesseges } from "../helper/validations";
import { AuthServiceService } from "../shared/auth-service.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    loginForm: FormGroup;
    isLoginMode = false;
    formErrors = loginFormError;
    validationMessages = loginFormMesseges;
    error: any;
    constructor(private _fb: FormBuilder, private _auth: AuthServiceService,private _router:Router,private _route:ActivatedRoute) {

    }
    ngOnInit() {
        this.loginForm = this._fb.group({
            email: ['', [Validators.required, Validators.pattern(allowedMailPattern)]],
            password: ['', Validators.required],
        })
        this.loginForm.valueChanges.subscribe((data) => {
            this.validateAllFormFields(this.loginForm);
        })
    }

    checkFormValidity() {
        this.validateAllFormFields(this.loginForm);
    }
    validateAllFormFields(formGroup) {
        Object.keys(formGroup.controls).forEach((key: string) => {
            const abstractControl = formGroup.get(key);
            if (abstractControl instanceof FormGroup) {
                this.validateAllFormFields(abstractControl);
            } else {
                this.formErrors[key] = '';
                if (
                    abstractControl &&
                    !abstractControl.valid &&
                    (abstractControl.touched || abstractControl.dirty)
                ) {
                    const messages = this.validationMessages[key];
                    for (const errorKey in abstractControl.errors) {
                        if (errorKey) {
                            this.formErrors[key] += messages[errorKey] + ' ';
                        }
                    }
                }
            }
        });
    }
    switchToLoginMode() {
        this.isLoginMode = !this.isLoginMode;
    }
    onSubmit() {
        if (this.loginForm.valid) {
            if (this.isLoginMode) {
              
                this._auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(data => {
                  
                    console.log("Login data",data);
                
                   this._auth.setDataToStorage(data); 
                   this._router.navigate(['recipes']);
        
                }, error => {
                    console.log(error);
                })
            }
            else {
            this._auth.signUp(this.loginForm.value.email, this.loginForm.value.password).subscribe(data => {
                   
                    this.isLoginMode=!this.isLoginMode;

                }, error => {

                    console.log(error);
                })
            }
        }
        else {
            this.loginForm.markAllAsTouched();
            this.checkFormValidity();
        }

    }
    onClose()
    {
        this.error=null;
    }

}