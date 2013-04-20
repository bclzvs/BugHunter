$(function(){
	var Bug = Backbone.Model.extend({
		idAttribute: "_id",
		defaults : function(){
			return {
				from : 'á¡Ê¤.Ê×Ò³',
				state : 'new',
				level : 's2',
				message : 'and error occured',
				date : '2013-4-20',
				userAgent : 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:18.0) Gecko/20100101 Firefox/18.0'
			}
		}
		
	});
	
	var BugList = Backbone.Collection.extend({
		Model : Bug,
		//localStorage : new Backbone.LocalStorage("bug-backbone");
		//localStorage: new Backbone.LocalStorage("bug-backbone"),
		comparator: 'title'
	})
	
	var Bugs = new BugList();
	
	var levelClass = {
		's1' : 'error',
		's2' : 'warning'
	};
	var stateClass = {
		'fixed' : 'success'
	};
	var BugView = Backbone.View.extend({
		tagName : 'tr',
		
		template : _.template($('#bugItem-template').html()),
		events : {
			'click .fix' : 'fix'
		},
		initialize : function(){
			this.listenTo(this.model, 'change', this.render);
		},
		render : function(){
			this.$el.html(this.template(this.model.toJSON())).
			removeClass().addClass( stateClass[this.model.get('state')] || 
				levelClass[this.model.get('level')]);
			return this;
		},
		fix : function(){
			this.model.set('state','fixed');
		}
	})
	
	var addBug = function(bug){
		var view = new BugView({model:bug});
		$('.table').append(view.render().$el);
	}
	
	var addBugs = function(bugs){
		_.each(bugs,function(bug){
			addBug(bug);
		})
	}
	
	addBug(new Bug({id:1}))
	addBug(new Bug({id:2,level:'s1'}))
	addBug(new Bug({id:3,state:'fixed'}))
	addBug(new Bug({id:3,level:'s3'}))
	
})
