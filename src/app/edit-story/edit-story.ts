import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-story',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-story.html',
  styleUrl: './edit-story.css',
})
export class EditStory {
  // FormGroup
  editForm: FormGroup;
  id: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {
    this.editForm = this.fb.group({
      title: '',
      // author, cover...
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id', this.id);
    this.http.get(`http://localhost:3000/stories/${this.id}`).subscribe({
      next: (data) => {
        console.log(data);
        // fill form
        this.editForm.patchValue(data);
      },
      error: () => {},
    });
  }

  // method: submitForm
  submitForm() {
    console.log(this.editForm.value);
  }
}
