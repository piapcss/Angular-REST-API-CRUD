import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Connection } from "../services/connection.services";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {

  userDetails: any;
  id: number;

  constructor(
    private _route: ActivatedRoute,
    private _userService: Connection) { }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this.onDisplayUsersById();
  }

  onDisplayUsersById() {
    this._userService.getUsersById(this.id)
      .subscribe(user => {
        this.userDetails = user;
      }, error => { console.log(error) })
  }
}
