import { Component, OnInit } from '@angular/core';
import { WebSocketApiService } from './web-socket-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-websocket';

  active = false;

  count = 0;

  greeting: any;
  name!: string;

  constructor(public webSocketAPI: WebSocketApiService) {}

  ngOnInit() {
    this.webSocketAPI.active.subscribe((res) => {
      this.active = res;
      if (!res) {
        this.count = 0;
      }
    });

    this.webSocketAPI.message.subscribe((res) => {
      if (res) this.greeting = JSON.parse(res).content;
    });

    this.webSocketAPI.count.subscribe((res) => {
      if (res) this.count = this.extractNumberFromString(res?.body);
    });
  }

  extractNumberFromString(inputString: string) {
    const numberPattern = /\d+/g; // Match one or more digits

    const numbers = inputString.match(numberPattern);

    return parseInt(numbers![0]); // Convert the matched string to an integer and return it
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
