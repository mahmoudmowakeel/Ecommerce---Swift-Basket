import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { CartService } from '../../core/services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, CarouselModule, SearchPipe, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);


  productsList: IProduct[] = []
  categoriesList: ICategory[] = []
  isLoading: boolean = false
  getAllProductsSub!: Subscription
  getAllCategoriesSub!: Subscription
  text: string = ''

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  ngOnInit(): void {

    this.getAllCategoriesSub = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data

      },
      error: (err) => {
        console.log(err)
      }
    })
    this.getAllProductsSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productsList = res.data
      },
      error: (err) => {
        console.log(err)
      }
    })


  }

  ngOnDestroy(): void {
    this.getAllProductsSub.unsubscribe()
    this.getAllCategoriesSub.unsubscribe()
  }

}
