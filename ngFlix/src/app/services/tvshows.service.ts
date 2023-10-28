import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { Tvshow, tvShowsDto } from '../types/tvshows'

@Injectable({
  providedIn: 'root',
})
export class TvShowsService {
  private apiUrl = 'https://api.themoviedb.org/3'
  private apiKey = '8552ada4b2ec049e3ef2ef4b6fade97b'

  constructor(private http: HttpClient) {}

  getTvShowsByType(type: string, count = 20) {
    return this.http
      .get<tvShowsDto>(`${this.apiUrl}/tv/${type}?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, count)))
  }
}
