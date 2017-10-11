package com.alehuo.obadgebackend.response;

import java.util.ArrayList;

/**
 * When a RESTFul controller sends a response, it needs to extend this abstract class.
 * By this way we can create a standardized RESTFul response and add additional parameters to it, if needed.
 */
public abstract class RestResponse {

    /**
     * Did the request succeed?
     */
    public boolean success = true;

    /**
     * Message to be sent back.
     */
    public String message = "";

    /**
     * Error list.
     */
    public ArrayList<String> errors;

    /**
     * Rest response.
     *
     * @param succ Success.
     * @param msg  Message.
     * @param err  Error list.
     */
    public RestResponse(boolean succ, String msg, ArrayList<String> err) {
        success = succ;
        message = msg;
        errors = new ArrayList<>(err);
    }

    /**
     * Rest response.
     *
     * @param succ Success.
     * @param msg  Message.
     */
    public RestResponse(boolean succ, String msg) {
        this(succ, msg, new ArrayList<>());
    }

    /**
     * Rest response that defaults to a true success state.
     *
     * @param msg Message.
     */
    public RestResponse(String msg) {
        this(true, msg);
    }

    /**
     * Adds an error.
     *
     * @param msg Error message.
     */
    public void addError(String msg) {
        errors.add(msg);
    }
}
