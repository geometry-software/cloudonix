import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatTableModule } from "@angular/material/table"
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { catchError, Observable, of, shareReplay, tap } from 'rxjs';
import { Product, productsDisplayedColumns } from '../../models/product.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    AsyncPipe,
    NgIf,
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
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  dataSource: Observable<Product[]> = of([])
  displayedColumns = productsDisplayedColumns
  expandedElement: Product | undefined

  ngOnInit(): void {
    this.loadData()
  }

  deleteItem(id: string) {
    this.dataSource = this.productService.deleteProduct(id).pipe(
      catchError(error => {
        this.toastr.error('Delete error', error)
        return []
      }),
      tap(() => this.toastr.success('Successfully deleted'))
    )
  }

  loadData() {
    this.dataSource = this.productService.getProducts().pipe(
      tap(console.log),
      shareReplay(1)
    )
  }

}