'use strict'

app.factory(
        'UserService', [
            '$http',
            '$q',
            '$rootScope','$cookieStore',
            function($http, $q, $rootScope,$cookieStore) {
                console.log("UserService...")

                var BASE_URL = 'http://localhost:8081/CareerSiteBackend';
                     

                var Base64 = {
                		
                        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
                        
                        encode: function (input) {
                            var output = "";
                            var chr1, chr2, chr3 = "";
                            var enc1, enc2, enc3, enc4 = "";
                            var i = 0;
                 
                            do {
                                chr1 = input.charCodeAt(i++);
                                chr2 = input.charCodeAt(i++);
                                chr3 = input.charCodeAt(i++);
                 
                                enc1 = chr1 >> 2;
                                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                                enc4 = chr3 & 63;
                 
                                if (isNaN(chr2)) {
                                    enc3 = enc4 = 64;
                                } else if (isNaN(chr3)) {
                                    enc4 = 64;
                                }
                 
                                output = output +
                                    this.keyStr.charAt(enc1) +
                                    this.keyStr.charAt(enc2) +
                                    this.keyStr.charAt(enc3) +
                                    this.keyStr.charAt(enc4);
                                chr1 = chr2 = chr3 = "";
                                enc1 = enc2 = enc3 = enc4 = "";
                            } while (i < input.length);
                 
                            return output;
                        },
                        decode: function (input) {
                            var output = "";
                            var chr1, chr2, chr3 = "";
                            var enc1, enc2, enc3, enc4 = "";
                            var i = 0;
                 
                            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                            var base64test = /[^A-Za-z0-9\+\/\=]/g;
                            if (base64test.exec(input)) {
                                window.alert("There were invalid base64 characters in the input text.\n" +
                                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                                    "Expect errors in decoding.");
                            }
                            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                 
                            do {
                                enc1 = this.keyStr.indexOf(input.charAt(i++));
                                enc2 = this.keyStr.indexOf(input.charAt(i++));
                                enc3 = this.keyStr.indexOf(input.charAt(i++));
                                enc4 = this.keyStr.indexOf(input.charAt(i++));
                 
                                chr1 = (enc1 << 2) | (enc2 >> 4);
                                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                                chr3 = ((enc3 & 3) << 6) | enc4;
                 
                                output = output + String.fromCharCode(chr1);
                 
                                if (enc3 != 64) {
                                    output = output + String.fromCharCode(chr2);
                                }
                                if (enc4 != 64) {
                                    output = output + String.fromCharCode(chr3);
                                }
                 
                                chr1 = chr2 = chr3 = "";
                                enc1 = enc2 = enc3 = enc4 = "";
                 
                            } while (i < input.length);
                 
                            return output;
                        }
                 
                		
                		
                }
                
                
                return {
                	  
                    fetchAllUsers: function() {
                    	console.log("calling fetchAllUsers ")
                            return $http.get(BASE_URL+'/users')
                                    .then(
                                            function(response){
                                                return response.data;
                                            }, 
                                           null
                                    );
                    },
                
                    login:function(user)
                    {
                    	console.log("Started the User Authentication: ");
                    	return $http.get(BASE_URL+"/login/",{
                        	
                        	headers: {  'username':user.username, 'password': user.password},
                        	
                        })
                    
                        .then(
                        		function(response){
                        			$rootScope.currentuser=response;
                        			console.log("Error Code : "+response.data);
                        			return response.data;
                        		},function(errResponse) {
                                    console.error('Error while Fetching the  user');
                                return $q
                                    .reject(errResponse);
                            });
                    },
          
                    logout: function(){
                    	console.log('logout function.......')
                        return $http.post(BASE_URL+'/logout')
                                .then(
                                        function(response){
                                            return response.data;
                                        }, 
                                      null
                                );
                },//logout function
            
           
                    SetCredentials:  function(user) {
                    	console.log("users"+user.username);
                   	 var authdata = Base64.encode(user.username,user.password);
                        $rootScope.globals = {
                            currentUser: {
                            	username:user.username,
                                authdata: authdata,
                                islogged:true,
                                role:user.role,
                            
                            }
                    	
                       };
                        console.log("Done");
                       $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                       console.log("authdata"+authdata);
                       $cookieStore.put('globals', $rootScope.globals);
                      
                   },
                    ClearCredentials: function () {
                        $rootScope.globals = {};
                        $cookieStore.remove('globals');
                        $cookieStore.remove('uid');
                        $http.defaults.headers.common.Authorization = 'Basic';
                    }
                   

                }
            }
        ]);
