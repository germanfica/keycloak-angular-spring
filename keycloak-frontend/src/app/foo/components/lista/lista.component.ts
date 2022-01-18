import { FooService } from '@core/services/foo.service';
import { Component, OnInit } from '@angular/core';
import { Foo } from '@core/models/foo';
import { KeycloakService } from '@core/services/keycloak.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  foos: Foo[] = [];

  isAdmin: boolean = {} as boolean;

  constructor(private fooService: FooService, private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.loadFoos();
    this.isAdmin = this.keycloakService.getIsAdmin();
  }

  loadFoos(): void {
    this.fooService.list().subscribe(
      {
        next: (data) => this.foos = data,
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }
    );
  }

  onDelete(id: number): void {
    this.fooService.delete(id).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.loadFoos();
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }
    );
  }

}
