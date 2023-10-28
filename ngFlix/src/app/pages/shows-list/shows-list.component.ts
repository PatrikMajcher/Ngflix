import { Component, OnInit } from '@angular/core'
import { PaginatorState } from 'primeng/paginator'
import { Observable } from 'rxjs'
import { MoviesService } from 'src/app/services/movies.service'
import { Movie, MoviesDto } from 'src/app/types/movie'

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.scss'],
})
export class ShowsListComponent implements OnInit {
  showsList$: Observable<MoviesDto> | null = null
  searchValue = ''

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getPagedShows(1)
  }
  getPagedShows(page: number, searchKeyword?: string) {
    this.showsList$ = this.moviesService.searchMovies(page, searchKeyword)
  }

  searchChanged() {
    this.getPagedShows(1, this.searchValue)
  }

  pageChanged(event: PaginatorState) {
    const pageNumber = event.page ? +event.page + 1 : 1

    this.getPagedShows(pageNumber, this.searchValue)
  }
}
