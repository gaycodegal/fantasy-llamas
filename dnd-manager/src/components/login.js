import React, { Component } from 'react';
import '../js/user-requests.js'
class LoginForm extends Component {
    render() {
        return <form id = "login"
        action = "/users/login"
        method = "POST" >
            <
            label
        for = "username" > username: < /label><input id="username" name="username"/ >
            <
            br / >
            <
            label
        for = "password" > password: < /label><input id="password" name="password"/ >
            <
            br / >
            <
            button type = "submit" > submit < /button> <
            /form>
    }
}

export default LoginForm;
//	<script src="/js/user-requests.js"></script>