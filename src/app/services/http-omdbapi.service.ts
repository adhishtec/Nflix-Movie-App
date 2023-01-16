import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MovieList } from '../interfaces/movies';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpOmdbapiService {
  constructor(private http: HttpClient) {}

  omdbapiBaseUrl = `http://www.omdbapi.com/?i=${environment.id}&apikey=${environment.apiKey}`;

  getMovies(query = 'inception', year?: string): Observable<MovieList> {
    return this.http.get<MovieList>(
      `${this.omdbapiBaseUrl}&s=${query}&type=movie${year ? `&y=${year}` : ''}`
    );
  }
}
