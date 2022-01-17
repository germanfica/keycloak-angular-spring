import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooRoutingModule } from './foo-routing.module';
import { ListaComponent } from './components/lista/lista.component';
import { DetailComponent } from './components/detail/detail.component';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaComponent,
    DetailComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    FooRoutingModule,
    FormsModule
  ]
})
export class FooModule { }
