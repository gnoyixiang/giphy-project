import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import { GiphyService } from '../giphy.service';
import { QueryStrings } from '../queryStrings';
import { Giphy } from '../giphy';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  // @Input()
  // baseRate = 'SGD';

  defaultRating = 'G';
  gifs = new Array<Giphy>();

  private sub: Subscription;

  constructor(private http: HttpClient, private giphySvc: GiphyService) { }

  ngOnInit() {
    this.subscribeSearchEvent();
    this.getTrendingGiphy();
  }

  subscribeSearchEvent(){
    this.sub = this.giphySvc.searchEvent.subscribe(
      (data) => {
        this.gifs = new Array<Giphy>();
        console.log('>>> giphy service search event: ', data);
        let giphy = <QueryStrings>data;
        for(let rating of data.ratings){
        this.giphySvc.getSearchGiphy(giphy.search, rating)
          .then((result) => {
              for(let data of result){
                this.gifs.push({
                  url: data["bitly_url"],
                  imageUrl: data["images"]["downsized"]["url"],
                  title: data["title"],
                });
              }
          });
        }
      },
      (error) => {
        console.log('>>> giphy service search event error: ', error);
      }
    );
  }

  getTrendingGiphy(){
    this.giphySvc.getTrendingGiphy(this.defaultRating)
      .then((result) => {
        for(let data of result){
          this.gifs.push({
            url: data["bitly_url"],
            imageUrl: data["images"]["downsized"]["url"],
            title: data["title"],
          });
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
