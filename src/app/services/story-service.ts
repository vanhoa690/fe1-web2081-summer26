import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface StoryData {
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  apiUrl = 'http://localhost:3000/stories';

  constructor(private http: HttpClient) {}

  getStories() {
    return this.http.get(this.apiUrl);
  }

  addStory(data: StoryData) {
    return this.http.post(this.apiUrl, data);
  }
}
