import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { of } from 'rxjs';

import { HttpOmdbapiService } from './../../services/http-omdbapi.service';
import { MovieList, Movie } from './../../interfaces/movies';


@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  isLoading = of(true);
  movies: Movie[] = [];
  moviesToDisplay: Movie[] = [];
  years: number[] = [];
  movieSearchTitle: string = 'Inception';

  searchForm = new FormGroup({
    title: new FormControl('', Validators.required),
    year: new FormControl(''),
  });

  constructor(
    private router: Router,
    private httpGithubService: HttpOmdbapiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies('inception');
  }

  getMovies(title: string) {
    this.isLoading = of(true);
    // Reset previous result
    this.movies = [];
    this.years = [];
    this.httpGithubService.getMovies(title).subscribe(
      (res: MovieList) => {
        this.isLoading = of(false);
        if (!res || res.Response !== 'True') {
          return;
        }
        res.Search.forEach((movie: Movie) => {
          let eachMovie: Movie | any = {};
          eachMovie.Title = movie.Title;
          eachMovie.Poster = movie.Poster;
          eachMovie.Type = movie.Type;
          eachMovie.Year = movie.Year;
          eachMovie.imdbID = movie.imdbID;
          this.movies.push(eachMovie);
        });
        this.years = [... new Set(this.movies.map(({ Year }) => +Year))];
        this.moviesToDisplay = [...this.movies];
      },
      (error: HttpErrorResponse) => {
        this.isLoading = of(false);
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Handle client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.showNotification(errorMessage);
      }
    );
  }

  searchMoviesByTitle() {
    this.getMovies(this.searchForm.controls['title'].value);
    this.movieSearchTitle = this.searchForm.controls['title'].value;
    this.searchForm.reset();
  }

  searchMoviesByYear(e: any) {
    this.moviesToDisplay = this.movies.filter(
      ({ Year }) => +Year === this.searchForm.controls['year'].value
    );
  }

  goToImDbUrl(imdbId: string) {
    window.open(`https://www.imdb.com/title/${imdbId}/`, '_blank');
  }

  onImgError(event: any) {
    event.target.src = '../../../assets/img/movie_default.png';
    event.target.alt = 'Movie Poster Not Found';
  }

  showNotification(message: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
