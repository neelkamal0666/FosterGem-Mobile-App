/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
var SITE_URL = "http://fostergem.com/api";
window.onload=init;
function init(){
		var url = "http://localhost/rest_api/getLeads";
	 $.ajax({
            type: 'GET',
            url: url,
            crossDomain: true,           
            success: function(responseData) {
			
            }
           
        });
}
var profile_id = window.localStorage.getItem("profile_id");
var password = window.localStorage.getItem("password");
if(profile_id) {
	//user logged in
	$("#logout_nav_bar").append('<li><a class="logout" id="logout">Log Out</a></li>');
	 $("#main_content").replaceWith('<div id="main_content"><center><img src="img/ajax-loader.gif" /></center></div>');
	getNewsfeed(profile_id,password);
} else {
//alert(profile_id);
}
function getNewsfeed(profile_id,password){
	var server =SITE_URL+'/getNewsfeed/'+profile_id+'/'+password;
		 $.ajax({
	          url: server,
        	  method: 'GET',
           	  cache: true,
              success: function(responseData) {
			    var category=responseData.split("|||");
				$("#main_content").replaceWith('<div id="main_content"></div>');
				for(i=0;i<category.length-1;i++){
					if(category[i] =='') {
						break;
					}
					 $("#main_content").append(category[i]);
					 //feed_count = feed_count+1;
				}
			  $("#include_js").replaceWith('<div id="include_js"><script type="text/javascript" src="http://fostergem.com/scripts/js/fostergem.js"></script></div>');
			  }
       		 });
}
function login(){
	var email = $("#email").val();
	var password =$("#password").val();
	var dataString = '{"email":"'+email+'","password":"'+password+'"}';
	$("#error_message").replaceWith('<div id="error_message"><center><img src="img/ajax-loader.gif" /></center></div>');
	var server =SITE_URL+'/getUser';
		 $.ajax({
	          url: server,
        	  method: 'POST',
			  data: dataString,
           	  cache: true,
              success: function(responseData) {
				if(responseData != 'error') {
					//window.location.href =SITE_URL+'/dashboard';
					var obj = JSON.parse(responseData);
					window.localStorage.setItem("email", email);
					window.localStorage.setItem("password", password);
					window.localStorage.setItem("profile_id", obj.profile_id);
					window.localStorage.setItem("fname", obj.fname);
					window.localStorage.setItem("lname", obj.lname);
					window.localStorage.setItem("gender", obj.gender);
					window.localStorage.setItem("profile_pic", obj.profile_pic);
					$("#logout_nav_bar").append('<li><a class="logout" id="logout">Log Out</a></li>');
					jQuery(document).ready(function() {
					$("#logout").click(logout);
					});
					getNewsfeed(obj.profile_id,password);
				} else {
					$("#error_message").replaceWith('<div class="alert alert-danger" id="error_message"><center>Wrong User Name or Password</center></div>');
				}
			 }
       		 });
		   return false; // <--- important, prevents the link's href (hash in this example) from executing.
}
function logout(){
window.localStorage.clear();
$("#logout").replaceWith('');
window.location.href ='index.html';
}
jQuery(document).ready(function() {
        $("#logout").click(logout);
		
	 });