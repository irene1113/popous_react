import React, {Component} from 'react';

export default class SignUp extends Component{
  constructor(props){
    super(props);
    this.state = {};
    this.submitForm = this.submitForm.bind(this);
  }
  submitForm(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if(xhttp.readyState == 4 && xhttp.status == 200){
        var object = JSON.parse(xhttp.responseText);
        this.setState({
          signup_message : object.signup_message,
          signup_status : object.signup_status
        });
        if(this.state.signup_status == 0){
          this.setState({
            idname :"",
            username :  "",
            password : ""
          });
        }
        else if(this.state.signup_status == 1){
          window.location.href =  "/member";
        }
      }
    };
    var newUser = {
          idname: this.state.idname.toString(),
          username: this.state.username.toString(),
          password: this.state.password.toString(),
          imgname: (Math.floor((Math.random() * 10) + 1)).toString(),
          imgContentData: "null",
          imgContentType: "image/png"
        };

    xhttp.open("POST", "/signup");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(newUser));
  }
  render(){
    return(
      <div className="row">
        <div id="invisible-div" className="display-none">
        </div>
        <div className="row">
            <div id="signup-box" className="col-md-5 col-sm-10 col-xs-10" >
                <div className="signup-screen">
                    <div className="signup-title">
                      <h2>註冊</h2>
                    </div>
                    <form id="signup_form" method="post" action="/signup" encType="multipart/form-data">
                        <div className="signup-form">
                          <div className="row">
                            <div className="signup-p col-md-2 col-sm-2 col-xs-2 text-align-center">
                              <p>名字</p>
                            </div>
                            <div className="control-group col-md-8 col-sm-10 col-xs-10">
                                <input value={this.state.idname}
                                      onChange={(event) => this.setState({idname: event.target.value})} id="signup-id" name="idname" type="text" className="login-field" placeholder="名字" />
                                <label className="login-field-icon fui-user" for="signup-id"></label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="signup-p col-md-2 col-sm-2 col-xs-2 text-align-center">
                              <p>帳號</p>
                            </div>
                            <div className="control-group col-md-8 col-sm-10 col-xs-10">
                            <input value={this.state.username}
                                  onChange={(event) => this.setState({username: event.target.value})} id="signup-name" name="username" type="text" className="login-field" placeholder="帳號" />
                                <label className="login-field-icon fui-user" for="signup-name"></label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="signup-p col-md-2 col-sm-2 col-xs-2 text-align-center">
                              <p>密碼</p>
                            </div>
                            <div className="control-group col-md-8 col-sm-10 col-xs-10">
                            <input value={this.state.password}
                                  onChange={(event) => this.setState({password: event.target.value})} id="signup-pass" name="password" type="password" className="login-field" placeholder="密碼" />
                                <label className="login-field-icon fui-lock" for="signup-pass"></label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-3 col-sm-3 col-xs-3">
                            </div>
                            <div className="col-md-5 col-sm-5 col-xs-5 text-align-center">
                              <p id="signup-err">{this.state.signup_message}</p>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-4">
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-3 col-sm-3 col-xs-3">
                            </div>
                            <div className="signup-btn col-md-5 col-sm-5 col-xs-5">
                              <a onClick={this.submitForm} className="btn btn-primary btn-large btn-block" href="javascript:{}">create</a>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-4">
                            </div>
                          </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
