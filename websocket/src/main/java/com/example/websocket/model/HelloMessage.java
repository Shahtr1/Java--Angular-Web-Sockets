package com.example.websocket.model;

public class HelloMessage {
    public String name;

    public HelloMessage(){}

    public HelloMessage(String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
