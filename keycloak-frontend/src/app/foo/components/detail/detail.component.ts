import { Foo } from '@core/models/foo';
import { ActivatedRoute, Router } from '@angular/router';
import { FooService } from '@core/services/foo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

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

  volver(): void {
    this.router.navigate(['/lista']);
  }

}
