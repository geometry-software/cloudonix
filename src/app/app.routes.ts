import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/form.component';
import { ProductLayoutComponent } from './components/product-layout/layout.component';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/product.effects';
import { reducer } from './store/product.reducer';
import { storeFeatureKey } from './models/store.model';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,

    },
    {
        path: 'products',
        // providers: [importProvidersFrom(
        //     StoreModule.forFeature('counter', reducer),
        // )
        // ],
        component: ProductLayoutComponent,
        children: [
            {
                path: '',
                component: ProductListComponent,
            },
            {
                path: ':id',
                component: ProductFormComponent
            }
        ]
    },

];