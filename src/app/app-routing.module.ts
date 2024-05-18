import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistComponent } from './views/wishlist/wishlist.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'wishlist',
    pathMatch: 'full'
  },
  {
    path: 'wishlist',
    component: WishlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
