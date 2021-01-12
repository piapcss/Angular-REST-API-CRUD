import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { Users } from 'src/app/model/users.model';
import { Connection } from '../../../services/connection.services';

@Component({
  selector: 'app-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Output() newUserEvent: EventEmitter<Users[]> = new EventEmitter<Users[]>();
  @Output() updateUserEvent: EventEmitter<Users[]> = new EventEmitter<Users[]>();
  @Output() buttonUpdated: EventEmitter<string> = new EventEmitter<string>();
  @Input() user: Users;
  @Input() buttonClass: string;


  listOfUsers: Users[];
  addUserForm: FormGroup;
  addMessageAlert: boolean = false;
  updateMessageAlert: boolean = false;

  constructor(
    private _userService: Connection,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addUserForm = this._formBuilder.group({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'contact': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)])
    });
  }

  onAdd() {

    let data: any = {
      name: this.addUserForm.get("name").value,
      email: this.addUserForm.get("email").value,
      contact: this.addUserForm.get("contact").value
    }

    this._userService.postUsers(data)
      .subscribe(data => { data = this.newUserEvent.emit(data) },
        error => { console.log(error) });

    this.addMessageAlert = true;

    setTimeout(() => {
      this.addMessageAlert = false;
    }, 1500);

    this.onClearForm();
  }

  onUpdate() {

    let editUserId = this.user.id;

    let data: any = {
      name: this.addUserForm.value.name,
      email: this.addUserForm.value.email,
      contact: this.addUserForm.value.contact
    }

    this._userService.putUsersById(editUserId, data)
      .subscribe(data => { data = this.updateUserEvent.emit(data) },
        error => { console.log(error) });

    this.buttonUpdated.emit(this.buttonClass = "");

    this.updateMessageAlert = true;

    setTimeout(() => {
      this.updateMessageAlert = false;
    }, 1500);

    this.onClearForm();
  }

  onCancel() {
    this.buttonUpdated.emit(this.buttonClass = "");
    this.onClearForm();
  }

  private onClearForm() {
    this.user = null;
    this.addUserForm.reset();
  }
}
