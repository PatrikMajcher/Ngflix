import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { IMAGES_SIZES } from 'src/app/constants/images-sizes'
import { MoviesService } from 'src/app/services/movies.service'
import { actor } from 'src/app/types/credits'
import { Movie } from 'src/app/types/movie'
import { picture } from 'src/app/types/picture'
import { Video } from 'src/app/types/video'

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss'],
})
export class ShowDetailComponent implements OnInit {
  showId = ''

  show$: Observable<Movie> | null = null
  showVideos$: Observable<Video[]> | null = null
  showImages$: Observable<picture[]> | null = null
  showCast$: Observable<actor[]> | null = null

  imagesSizes = IMAGES_SIZES

  constructor(
    private router: ActivatedRoute,
    private movieService: MoviesService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.showId = params['id']
      this.show$ = this.movieService.getMovieById(this.showId)
      this.showVideos$ = this.movieService.getMovieVideos(this.showId)
      this.showImages$ = this.movieService.getMovieImages(this.showId)
      this.showCast$ = this.movieService.getMovieCast(this.showId)
    })
  }
}
