import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-story',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-story.html',
  styleUrl: './edit-story.css',
})
export class EditStory {
  // FormGroup
  editForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      title: '',
      // author, cover...
    });
  }

  // method: submitForm
  submitForm() {
    console.log(this.editForm.value);
  }
}
