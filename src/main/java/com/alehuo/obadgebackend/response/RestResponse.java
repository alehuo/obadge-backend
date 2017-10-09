package com.alehuo.obadgebackend.response;

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
     * Rest response.
     *
     * @param succ Success.
     * @param msg  Message.
     */
    public RestResponse(boolean succ, String msg) {
        success = succ;
        message = msg;
    }

    /**
     * Rest response that defaults to a true success state.
     *
     * @param msg Message.
     */
    public RestResponse(String msg) {
        this(true, msg);
    }
}
