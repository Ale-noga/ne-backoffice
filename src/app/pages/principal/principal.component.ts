import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { UserService } from 'src/shared/guard/user.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  _router: any
  user: any;
  
  constructor(private router: Router, private userService: UserService) {
    this._router = this.router;
   }

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.get_user_by_id(localStorage["user_uid"])
  }

  signOut(){
    getAuth().signOut();
    localStorage.clear();
    this.router.navigate(['/authentication/login'])
  }

}
