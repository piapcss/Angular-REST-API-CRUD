import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Connection } from "../../services/connection.services";
import { Users } from '../../model/users.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  listOfUsers: Users[];
  selectedUser: Users;
  buttonClass: string;
  deleteMessageAlert: boolean = false;

  constructor(
    private _userService: Connection,
    private _router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {

    this._userService.getAllUsers()
      .subscribe(users => { this.listOfUsers = users; },
        error => { console.log(error) }
      )
  }

  onDelete(user_id: number) {
    this._userService.deleteUsersById(user_id)
      .subscribe(() => { this.getUsers() }, error => { console.log(error) }
      )

    this.deleteMessageAlert = true;

    setTimeout(() => {
      this.deleteMessageAlert = false;
    }, 2000);
  }

  onUpdate(user_id: number) {
    let user = this.listOfUsers.filter(user => user.id == user_id);
    this.selectedUser = user[0];
    this.buttonClass = 'hidden';
  }

  onView(user_id: number) {
    this._router.navigate(['/user-detail/', user_id]);
  }

  buttonUpdated() {
    this.selectedUser = null;
    this.buttonClass = "";
  }

  addUser(newUser: Users) {
    this.listOfUsers.push(newUser);
  }

  updateUser() {
    this._userService.getAllUsers()
      .subscribe(users => { this.listOfUsers = users; },
        error => { console.log(error) }
      )
  }

}
