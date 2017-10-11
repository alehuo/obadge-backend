package com.alehuo.obadgebackend.response;

import com.alehuo.obadgebackend.response.RestResponse;

/**
 * Response used in UserController.
 */
public class UserResponse extends RestResponse {
    public UserResponse(boolean succ, String msg) {
        super(succ, msg);
    }
}