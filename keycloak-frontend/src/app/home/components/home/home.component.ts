import { MessageService } from '@core/services/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string = "";

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.getMessage().subscribe(
      {
        next: (data) => this.username = data[`text`],
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }
    );
  }

}
