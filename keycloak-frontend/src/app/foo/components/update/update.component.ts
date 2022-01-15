import { Foo } from '@core/models/foo';
import { ActivatedRoute, Router } from '@angular/router';
import { FooService } from '@core/services/foo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  foo: Foo = {} as Foo;

  constructor(
    private fooService: FooService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id: number = this.activatedRoute.snapshot.params['id'];
    this.fooService.detail(id).subscribe(
      {
        next: (data) => this.foo = data,
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }
    );
  }

  onUpdate(): void {
    const id: number = this.activatedRoute.snapshot.params['id'];
    this.fooService.update(id, this.foo).subscribe(
      data => {
        console.log(data);
        this.volver();
      },
      err => console.log(err)
    );
  }

  volver(): void {
    this.router.navigate(['/lista']);
  }

}
