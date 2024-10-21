import { Component,OnInit, ViewChild,ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NewsService } from 'src/app/services/news.service';
import { SwiperOptions } from 'swiper';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit   {

  title = 'news_app';
  public sources: any = [];
  public articles: any = [];
  public randomArticles: any = []; // Rastgele seçilen üç makale için dizi

  public selectedNewsChannel: string = "Top 3 Trending News";
  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private newsApi: NewsService
  ) {}

  ngOnInit(): void {
    // Başlangıçta makaleleri ve kaynakları çek
    this.newsApi.intitArticles().subscribe((res: any) => {
      this.articles = res.articles;
      this.pickRandomArticles(); // Rastgele makaleleri seç
    });
    
    this.newsApi.initSources().subscribe((res: any) => {
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
    this.newsApi.getArticlesByid(source.id).subscribe((res: any) => {
      this.articles = res.articles;
      this.selectedNewsChannel = source.name;
      this.pickRandomArticles(); // Kaynağı değiştirdiğinizde rastgele makaleleri güncelle
    });
  }

  // Rastgele üç makale seçme işlevi
  pickRandomArticles() {
    if (this.articles.length) {
      const shuffled = this.articles.sort(() => 0.5 - Math.random());
      this.randomArticles = shuffled.slice(0, 3);
    } else {
      this.randomArticles = []; // Eğer makale yoksa boş dizi
    }
  }

  swiperConfig: SwiperOptions = {
    slidesPerView: 1, // Aynı anda kaç slide gösterileceği
    spaceBetween: 10, // Slide'lar arasındaki boşluk
    navigation: true, // Önceki/sonraki düğmeleri gösterme
    pagination: { clickable: true }, // Sayfa numaralandırma
    loop: true, // Sonsuz döngü modunu etkinleştir
    autoplay: { delay: 3000 } // Otomatik kaydırma (ms cinsinden)
  };

}
