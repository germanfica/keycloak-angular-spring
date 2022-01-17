import { Foo } from '@core/models/foo';
import { FooService } from '@core/services/foo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  foo: Foo = {} as Foo;
  fooName: string = "";

  constructor(
    private fooService: FooService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    this.foo = new Foo(-1, this.fooName);
    this.fooService.create(this.foo).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.volver();
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }
    );
  }

  volver(): void {
    this.router.navigate(['foo/list']);
  }


}
