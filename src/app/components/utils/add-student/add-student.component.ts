import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html'
})
export class AddStudentComponent {

  public readonly addUserAction = [COMMA, ENTER, SPACE];
  public addedUsers: string[] = [];

  @Output()
  public users: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Input()
  public allUsers: string[] = [];

  @ViewChild("userInput")
  public userInput: ElementRef<HTMLInputElement>;

  public filterUsers(value: string): string[] {
    return this.allUsers.filter(user => user.toLowerCase().includes(value.toLowerCase()));
  }

  public addUser(event: MatAutocompleteSelectedEvent | MatChipInputEvent) {
    const value = event instanceof MatAutocompleteSelectedEvent ? event.option.viewValue : event.value;

    this.addedUsers.push(value);
    this.allUsers.splice(this.allUsers.indexOf(value), 1);
    this.userInput.nativeElement.value = '';
    this.sendUsers();
  }

  public removeUser(event: string) {
    this.addedUsers.splice(this.addedUsers.indexOf(event), 1);
    this.allUsers.push(event);
    this.sendUsers();
  }

  private sendUsers() {
    this.users.emit(this.addedUsers);
  }

}
