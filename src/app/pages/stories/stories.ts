import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Story {
  id: number;
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
    this.http.get<Story[]>('http://localhost:3000/stories').subscribe({
      next: (data) => {
        console.log(data);
        this.stories = data;
      },
      error: () => {
        console.log('error');
      },
    });
  }

  // method delete
  deleteStory(id: number) {
    console.log(id);
    // confirm truoc khi xoa
    if (!confirm('Xoa ko')) return;

    this.http.delete(`http://localhost:3000/stories/${id}`).subscribe({
      next: () => {
        // remove item co id can xoa: filter trong js
        this.stories = this.stories.filter((story) => story.id !== id);
      },
      error: () => {
        console.log('error');
      },
    });
  }
}
