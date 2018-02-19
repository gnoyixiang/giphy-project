import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { QueryStrings } from './queryStrings';;

@Injectable()
export class GiphyService {

  private readonly API_KEY = 'x7fDhEodCOfGPmMDjB4zJHeMGsOberQh';
  private readonly LIMIT = '25';
  private readonly LANG = 'en';

  searchEvent = new EventEmitter<QueryStrings>();

  pageEvent = new EventEmitter<QueryStrings>();

  constructor(private http: HttpClient) {}

  getSearchGiphy(search: string, rating: string, offset=0): Promise<any> {
    let qs = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('q', search)
      .set('rating', rating)
      .set('limit', this.LIMIT)
      .set('lang', this.LANG)
      .set('offset', offset.toString());
      console.log(">>> in here");
    //Returns an observable
    return (
      //search
      //https://api.giphy.com/v1/gifs/search?api_key=x7fDhEodCOfGPmMDjB4zJHeMGsOberQh&q=&limit=25&offset=0&rating=G&lang=en
      this.http.get('https://api.giphy.com/v1/gifs/search', {params: qs})
          //.take(1) //from observable take 1 from the stream
          .toPromise()
        .then((result) => {
          console.log(">>> " + Object.values(result["data"]));
          return (Object.values(result["data"]));
        })
    ); //convert the event to a promise
  }

  getTrendingGiphy(rating: string, offset=0): Promise<any> {
    let qs = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('rating', rating)
      .set('limit', this.LIMIT)
      .set('offset', offset.toString());

    //Returns an observable
    return (
      //trending
      //https://api.giphy.com/v1/gifs/trending?api_key=x7fDhEodCOfGPmMDjB4zJHeMGsOberQh&limit=25&rating=G
      this.http.get('https://api.giphy.com/v1/gifs/trending', {params: qs})
          //.take(1) //from observable take 1 from the stream
          .toPromise()
        .then((result) => {
          console.log(">>> " + result["data"]);
          console.log(">>> " + Object.values(result["data"]));
          return (Object.values(result["data"]));
        })
    ); //convert the event to a promise
  }
}
