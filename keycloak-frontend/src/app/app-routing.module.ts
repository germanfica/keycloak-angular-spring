import { SignupGuard } from '@core/guards/signup.guard';
import { FooGuard } from '@core/guards/foo.guard';
import { SignupComponent } from './signup/signup.component';
import { CreateComponent } from './foo/components/create/create.component';
import { UpdateComponent } from './foo/components/update/update.component';
import { DetailComponent } from './foo/components/detail/detail.component';
import { ListaComponent } from './foo/components/lista/lista.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'lista',
        component: ListaComponent,
        canActivate: [FooGuard],
        data: {
          requiredRoles: ['admin', 'user']
        }
      },
      {
        path: 'detail/:id', component: DetailComponent,
        canActivate: [FooGuard],
        data: { requiredRoles: ['admin', 'user'] }
      },
      {
        path: 'update/:id', component: UpdateComponent,
        canActivate: [FooGuard],
        data: { requiredRoles: ['admin'] }
      },
      {
        path: 'create', component: CreateComponent,
        canActivate: [FooGuard],
        data: { requiredRoles: ['admin'] }
      },
    ]
  },

  { path: 'signup', component: SignupComponent, canActivate: [SignupGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
