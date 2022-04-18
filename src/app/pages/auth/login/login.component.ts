import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, getAuth  } from 'firebase/auth';
import { firebase_auth_errors } from 'src/environments/firebase.autherrors';
import { UserService } from 'src/shared/guard/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) { 
    (window as any).scrollTo(0,0)
    const rgxEmail: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(rgxEmail)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  goToRegister(){
    this.router.navigate(['/authentication/register']);
  }

  async login(data: any): Promise<any> {
    let auth: any; 
    try {
      auth = await signInWithEmailAndPassword(getAuth(), data?.email, data?.password)
      this.router.navigate(['/principal/budgets']);
      localStorage["user_uid"] = getAuth().currentUser?.uid;
    } catch(error: any) {
      console.log(error)
      await Swal.fire({
        text: `${firebase_auth_errors[error?.code]}`,
        icon: 'error',
        toast: true,
        position: 'top-end',
        timer: 3500,
        timerProgressBar: true,
        showConfirmButton: false,
      })
    }
  }

}
