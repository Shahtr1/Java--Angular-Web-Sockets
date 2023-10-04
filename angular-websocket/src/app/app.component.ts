import { Component, OnInit } from '@angular/core';
import { WebSocketApiService } from './web-socket-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-websocket';

  greeting: any;
  name!: string;

  constructor(public webSocketAPI: WebSocketApiService) {}

  ngOnInit() {
    this.webSocketAPI.message.subscribe((res) => {
      if (res) this.greeting = JSON.parse(res).content;
    });
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.webSocketAPI._send(this.name);
  }
}
