import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: `./login.component.html`,
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatFormFieldModule, FormsModule]
})
export class LoginComponent {
  userId = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.login(this.userId, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          this.userService.currentUser = response.user;
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => console.error(error) // Line 40: Logs the HttpErrorResponse
    });
  }
}