import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Story {
  title: string;
  author: string;
  views: number;
}

@Component({
  selector: 'app-stories',
  imports: [],
  templateUrl: './stories.html',
  styleUrl: './stories.css',
})
export class Stories {
  stories: Story[] = [];

  // httpClient ~ axios
  constructor(private http: HttpClient) {}
  // genric type <T>
  ngOnInit() {
    this.http.get<Story[]>(' http://localhost:3000/stories').subscribe({
      next: (data) => {
        console.log(data);
        this.stories = data;
      },
      error: () => {
        console.log('error');
      },
    });
  }
}
