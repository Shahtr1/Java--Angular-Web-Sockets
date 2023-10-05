import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebSocketApiService {
  message = new BehaviorSubject<any>(undefined);
  count = new BehaviorSubject<any>(undefined);
  active = new BehaviorSubject<boolean>(false);

  webSocketEndPoint = 'http://localhost:8084/ws';
  greeting = '/topic/greetings';
  notificationsCount = '/topic/notifications-count';
  stompClient: any;
  constructor() {}
  _connect() {
    console.log('Initialize WebSocket Connection');
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect(
      {},
      function (frame: any) {
        _this.active.next(true);

        _this.stompClient.subscribe(_this.greeting, function (sdkEvent: any) {
          _this.onMessageReceived(sdkEvent);
        });

        _this.stompClient.subscribe(
          _this.notificationsCount,
          function (sdkEvent: any) {
            _this.onCountReceived(sdkEvent);
          }
        );
        //_this.stompClient.reconnect_delay = 2000;
      },
      this.errorCallBack
    );
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
      this.active.next(false);
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error: any) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message: any) {
    console.log('calling logout api via web socket');
    this.stompClient.send('/app/hello', {}, JSON.stringify(message));
  }

  onMessageReceived(message: any) {
    console.log('Message Received from Server :: ' + message);
    this.message.next(message.body);
  }

  onCountReceived(count: any) {
    console.log('Count Received from Server :: ' + count);
    this.count.next(count);
  }
}
