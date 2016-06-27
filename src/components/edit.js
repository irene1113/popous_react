import React, {Component} from 'react';

export default class Edit extends Component{
  constructor(props){
    super(props);
    this.state = {};
    this.submitForm = this.submitForm.bind(this);
    this.changeFileName1 = this.changeFileName1.bind(this);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () =>{
      if(xhttp.readyState == 4 && xhttp.status == 200){
        var object = JSON.parse(xhttp.responseText);
        this.setState(
          {
            idname:object.idname,
            id:object._id,
            img:'',
            imgData:object.imgContentType,
            imgname:object.imgname
          }
        );
        if(this.state.imgData.toString() == 'null'){
          this.setState({
            img:"assets/img/" + object.imgname +".jpg"
          });
        }
        else{
          this.setState({
            img:object.imgContentType
          });
        }
      }
    }
    xhttp.open("GET","/memberInfo");
    xhttp.send();
  }

  changeFileName1(){
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    var input = document.getElementById('edit-img-input');
    document.getElementById('edit-img-name').innerHTML = input.files[0].name;
    var output = document.getElementById('edit-img-preview');
    if(output.className.search("display-none") == -1){
      output.className += " display-none";
    }
    this.canvas.classList.remove("display-none");
    output.onload = function(){
      this.setState({
        imgFile : input.files[0]
      });
      var width = output.naturalWidth;
      var height = output.naturalHeight;
      if(width <= height){
        var mini = width;
        console.log(width + ";" + height + ";" + mini);
        var img = new Image();
        img.onload = function() {
          this.clipImage(img, 0, (height/2)-(mini/2), mini, mini);
        };
        img.onload = img.onload.bind(this);
        img.src = output.src;
      }
      else{
        var mini = height;
        console.log(width + ";" + height + ";" + mini);
        var img = new Image();
        img.onload = function() {
          this.clipImage(img, (width/2)-(mini/2), 0, mini, mini);
        };
        img.onload = img.onload.bind(this);
        img.src = output.src;
      }
    };
    output.onload = output.onload.bind(this);
    output.src = URL.createObjectURL(input.files[0]);
  }

  clipImage(image, clipX, clipY, clipWidth, clipHeight) {
    this.ctx.drawImage(image, clipX, clipY, clipWidth, clipHeight,
    0, 0, 239, 239);
    this.setState({
      imgContentData : this.canvas.toDataURL()
    });
  }
  submitForm(){
    var _this = this;
    if(this.state.imgFile == null){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
          var o = JSON.parse(xhttp.responseText);
          _this.setState({
            update_message : o.update_message,
            update_status : o.update_status
          });
          if(_this.state.update_status == 0){
            _this.setState({
              newidname : _this.state.idname
            });
          }
          else if(_this.state.update_status == 1){
            window.location.href = "/member";
          }
        }
      };
      var newUserInfo = {
            idname: _this.state.newidname.toString()
      };
      xhttp.open("PUT", "/member");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(JSON.stringify(newUserInfo));
    }
    else{
      var reader = new FileReader();
      reader.readAsDataURL(this.state.imgFile);
      reader.addEventListener("load", function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
          if(xhttp.readyState == 4 && xhttp.status == 200){
            var o = JSON.parse(xhttp.responseText);
            _this.setState({
              update_message : o.update_message,
              update_status : o.update_status
            });
            if(_this.state.update_status == 0){
              _this.setState({
                newidname : _this.state.idname
              });
            }
            else if(_this.state.update_status == 1){
              window.location.href = "/member";
            }
          }
        };
        if(_this.state.newidname == undefined){
          _this.setState({
            newidname : _this.state.idname
          });
        }
        var newUserInfo = {
              idname: _this.state.newidname.toString(),
              imgContentData: _this.state.imgContentData
        };
        xhttp.open("PUT", "/member");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(newUserInfo));
      });
    }
  }
  render(){
    return(
      <div id="editModal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
    		<div className="modal-dialog">
    			<div className="modal-content">
    				<div className="modal-header">
    					<button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
    					<i className="fa fa-pencil-square-o" aria-hidden="true"></i><span className="edit-title">編輯你的個人資料</span>
    				</div>
    				<div className="modal-body">
    					<form id="edit-person-form" className="form center-block" method="put" enctype="multipart/form-data">
    						<div className="form-group">
    							<div className= "row form-row-magin">
    								<div id="edit-userphoto-div" className= "margin-center">
                      <canvas id="canvas" width="239" height="239" className="display-none img-responsive displayed margin-center"></canvas>
    									<img src={this.state.img} id="edit-img-preview" className="img-responsive displayed margin-center" alt="" />
    								</div>
    							</div>
    							<div className="row form-row-magin">
    								<div className="col-xs-3 col-sm-3 text-align-center">
    									<h5>修改名字</h5>
    								</div>
    								<div className="col-xs-9 col-sm-6">
    							  	<input value={this.state.newidname}
                      onChange={(event) => this.setState({newidname: event.target.value})}
                      placeholder={this.state.idname} id="edit-idname" type="text" className="edit-name form-control input-lg" />
    								</div>
    								<div className="col-sm-3 text-align-center">
    									<p id="update-err" className="ajax-message">{this.state.update_message}</p>
    								</div>
    							</div>
    							<div className="row form-row-magin">
    								<div className="col-xs-3 col-sm-3 text-align-center">
    									<h5>更新大頭貼</h5>
    								</div>
    								<div className="col-xs-9 col-sm-6 margin-center">
    									<div className="image-upload pull-left list-inline">
    										<label htmlFor="edit-img-input">
    											<i className="fa fa-file-image-o fa-2x" aria-hidden="true">  <span id="edit-img-name" className="itag-img">選擇一張照片</span></i>
    				    				</label>
    				    				<input id="edit-img-input" type="file" name="userPhoto" onChange={this.changeFileName1} />
    									</div>
    								</div>

    							</div>
    						</div>
    						<div className="modal-footer">
    							<div className="row">
    								<div className="col-sm-2 col-xs-12 float-right">
    									<a onClick={this.submitForm} className="btn btn-primary btn-sm btn-block" href="javascript:{}">Submit</a>
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
