import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-story',
  imports: [ReactiveFormsModule],
  templateUrl: './add-story.html',
  styleUrl: './add-story.css',
})
export class AddStory {
  // khai bao bien form
  addForm: FormGroup;

  // khoi tao form
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.addForm = this.fb.group({
      title: '',
    });
  }

  submitForm() {
    console.log(this.addForm.value);
    this.http
      .post('http://localhost:3000/stories', this.addForm.value)
      .subscribe({
        next: () => {
          // thong bao
          // chuyen huong sang man list: router.navigateByUrl('/stories')
        },
        error: () => {},
      });
  }
}
