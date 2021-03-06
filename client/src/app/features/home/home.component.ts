import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DatabaseService} from "../../core/database/database.service";
import { Router } from "@angular/router";
import {query} from "@angular/animations";
import {MatPaginatorIntl} from "@angular/material";
import {DocumentSnapshot} from "@angular/fire/firestore";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filter: FormGroup;
  articles: Array<article>;
  showedarticles: Array<article> = [];
  lastarticle: DocumentSnapshot<any>;

  tags = [{tag: 'Lit'}, {tag: 'Sellout'}, {tag: 'AlbinSkaGå'}, {
    tag: 'Dead'
  }];

  constructor(private FB: FormBuilder, private DB: DatabaseService<article>) {
    // Just for testing, put in seperate service in future
    DB.list('articles', query => query.limit(25)).subscribe(value => {
      this.articles = value;
      this.showedarticles = value;
    });
    this.filter = FB.group({
      'search': ['']
    });
    this.tags.forEach(tag => tag['color'] = this.getRandomColor())
  }

  ngOnInit() {
    // Search draft
    this.filter.valueChanges
      .subscribe(value => {
        this.showedarticles = [];
        this.articles.forEach((article => {
          if (article['name'].toLowerCase().includes(value['search'].toLowerCase())) {
            this.showedarticles.push(article);
          }
        }));
      });
  }

  getRandomColor(): string {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  pagechange(event: paginatorevent) {
    this.DB.list('articles', query => query.limit(event.pageSize)).subscribe(value => {
      this.articles = value;
      this.showedarticles = value;
    });
  }
}

// Just for testing, put in diffrent file
export interface article {
  name: string
}

export interface paginatorevent {
  previousPageIndex: number;
  pageIndex: number;
  pageSize: number;
  length: number;
}
