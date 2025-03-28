import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl:`./dashboard.component.html`,
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule
  ]
})
export class DashboardComponent implements OnInit {
  users: { userId: string; role: string }[] = [];
  displayedColumns = ['userId', 'role'];
  loading = false;
  newUser: { userId: string; password: string; role: string } = { userId: '', password: '', role: 'General User' };

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.loading = true;
    this.userService.getUsers(2000).subscribe({
      next: (users: { userId: string; role: string }[]) => {
        this.users = users;
        this.loading = false;
      },
      error: (error: any) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

  addUser() {
    if (this.userService.currentUser?.role === 'Admin') {
      this.userService.addUser(this.newUser).subscribe({
        next: (user: { userId: string; role: string }) => {
          this.users.push(user);
          this.newUser = { userId: '', password: '', role: 'General User' };
        },
        error: (error: any) => console.error(error)
      });
    }
  }
}