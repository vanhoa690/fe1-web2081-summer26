import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      username: '',
      email: '',
      password: '',
    });
  }

  submitForm() {
    // if(this.registerForm.invalid)
    this.http
      .post('http://localhost:3000/register', this.registerForm.value)
      .subscribe({
        next: () => {
          alert('Dang ky thanh cong');
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.log(err);
          alert(err.error);
        },
      });
  }
}
