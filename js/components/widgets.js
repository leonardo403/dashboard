var apiurl  = 'http://dev.4all.com:3050/widgets';
var apimessage = 'http://dev.4all.com:3050/messages';

//extend component
var Widgets = Vue.extend({
	template: '#widgets-template',
	data: function ()
 	{
 		return {
       		widgets: [],
   		};
   	},

    created: function ()
    {	   
	    this.$http.get(apiurl)
	      .then( function(response) { 
	        this.widgets = response.json();
	        console.log(this.widgets);
	      }) 
	      .catch( function(error) { 
	        console.error(error); 
	      });
    }
});

var Chat = Vue.extend({
	template: '#chat-template',
	data: function ()
	{
		return {
			messages: []
		};
	},

	created: function ()
    {	   
	    this.$http.get(apimessage)
	      .then( function(response) { 
	        this.messages = response.json();
	        console.log(this.messages);
	      }) 
	      .catch( function(error) { 
	        console.error(error); 
	      });
    }
});
//registrar component
Vue.component('widgets', Widgets);
Vue.component('chat', Chat);

var vm = new Vue ({
	el: '#app'
});