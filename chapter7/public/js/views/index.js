define(['SocialNetView', 'text!templates/index.html', 'views/status', 'models/Status'], function(SocialNetView, indexTemplate, StatusView, Status) {
	var indexView = Backbone.View.extend({
		el: $('#content'),

      evants: {
         "submit form": "updateStatus"
      },

      initialize: function(){
         this.collection.on('add', this.onStatusAdded, this);
         this.collection.on('reset', this.onStatusCollectionReset, this);
      },

      onStatusCollectionReset: function(collection){
         var that = this;
         collection.each(function(model){
            that.onStatusAdded(model);
         });
      },

      onStatusAdded: function(status){
         var statusHTML = (new StatusView({model: status})).render().el;
         $(statusHTML).prependTo('.status_list').hide().fadeIn('slow');
      },

      updateStatus: function(){
         var statusText = $('input[name=status]').val();
         var statusCollection = this.collection;
         $.post('/accounts/me/status', {
            status: statusText
         }, function(data){
            statusCollection.add(new Status({status:statusText}));
         });
         return false;
      },

		render: function() {
			this.$el.html(indexTemplate);
		}
	});

	return indexView;
});