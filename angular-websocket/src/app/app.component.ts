import { Component } from '@angular/core';
import { WebSocketAPI } from './web-socket-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-websocket';

  webSocketAPI!: WebSocketAPI;
  greeting: any;
  name!: string;
  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(new AppComponent());
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

  handleMessage(message: any) {
    this.greeting = message;
  }
}
