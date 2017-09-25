import { Component, TemplateRef } from '@angular/core';
// Import the DataService
import { DataService } from './data.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ambrogio Academy';
  
  // Define a users property to hold our user data
  users: Array<any>;
  
    // Create an instance of the DataService through dependency injection
    public modalRef: BsModalRef;
    constructor(private _dataService: DataService, private modalService: BsModalService) {
  
      // Access the Data Service's getUsers() method we defined
      this._dataService.getUsers()
          .subscribe(res => this.users = res);
    }
    public openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }
}

/* export class LoginModal {
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
 
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
} */