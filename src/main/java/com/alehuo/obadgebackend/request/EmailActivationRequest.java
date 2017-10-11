package com.alehuo.obadgebackend.request;

public class EmailActivationRequest {
    private String hash;

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }
}
