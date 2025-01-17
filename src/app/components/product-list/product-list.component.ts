import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableModule } from "@angular/material/table"
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable, of } from 'rxjs';
import { Product, productsDisplayedColumns } from '../../models/product.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getProducts } from '../../store/product.selectors';
import { ProductActions } from '../../store/product.actions';

@Component({
  selector: 'app-product-list',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  dataSource: Observable<Product[]> = of([])
  displayedColumns = productsDisplayedColumns
  expandedElement: Product | undefined

  ngOnInit(): void {
    this.dataSource = this.store.select(getProducts)
  }

  deleteItem(id: number) {
    this.store.dispatch(ProductActions.deleteProduct({ id }))
  }

}