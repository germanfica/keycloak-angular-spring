import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooGuard } from '@core/guards/foo.guard';
import { CreateComponent } from './components/create/create.component';
import { DetailComponent } from './components/detail/detail.component';
import { ListaComponent } from './components/lista/lista.component';
import { UpdateComponent } from './components/update/update.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListaComponent,
    canActivate: [FooGuard],
    data: { requiredRoles: ['admin', 'user'] }
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FooRoutingModule { }
