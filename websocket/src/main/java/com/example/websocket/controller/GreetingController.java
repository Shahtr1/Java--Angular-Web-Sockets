package com.example.websocket.controller;

import com.example.websocket.model.Greeting;
import com.example.websocket.model.HelloMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.util.Random;

@Controller
public class GreetingController {

    private final SimpMessagingTemplate messagingTemplate;
    private final Random random = new Random();

    @Autowired
    public GreetingController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }


    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }


    @Scheduled(fixedRate = 5000) // Send notification count every 5 seconds (adjust the rate as needed)
    public void sendNotificationCount() {
        int notificationCount = random.nextInt(100); // Implement your logic to get notification count here;
        messagingTemplate.convertAndSend("/topic/notifications-count", "Notification Count: " + notificationCount);
    }

}
