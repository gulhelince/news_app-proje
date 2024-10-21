import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NewsService } from 'src/app/services/news.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit, OnInit {


  title = 'news_app';
  public sources: any = [];
  public articles: any = [];
  public randomArticles: any = []; // Rastgele seçilen üç makale için dizi

  public selectedNewsChannel: string = "Top 10 Trending News";
  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private cdr: ChangeDetectorRef, private newsApi: NewsService) {}

  ngOnInit(): void {
    this.newsApi.intitArticles()
      .subscribe((res: any) => {
        this.articles = res.articles;
        this.pickRandomArticles(); // Rastgele makaleleri seç
      });
    this.newsApi.initSources()
      .subscribe((res: any) => {
        this.sources = res.sources;
      });
  }

  ngAfterViewInit(): void {
    this.sideNav.opened = true;

    this.observer.observe(['(max-width:787px)']).subscribe((res) => {
      if (res.matches) {
        this.sideNav.mode = 'over';
        this.sideNav.close();
      } else {
        this.sideNav.mode = 'side';
        this.sideNav.open();
      }
    });
    this.cdr.detectChanges();
  }

  searchSources(source: any) {
    this.newsApi.getArticlesByid(source.id)
      .subscribe((res: any) => {
        this.articles = res.articles;
        this.selectedNewsChannel = source.name;
        this.pickRandomArticles(); // Kaynağı değiştirdiğinizde rastgele makaleleri güncelle
      });
  }

  // Rastgele üç makale seçme işlevi
  pickRandomArticles() {
    const shuffled = this.articles.sort(() => 0.5 - Math.random());
    this.randomArticles = shuffled.slice(0, 3);
  }

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,   
    spaceBetween: 10, 
    navigation: true,   
    pagination: { clickable: true },  
    loop: true, 
    autoplay: { delay: 3000 } 
  };


}
