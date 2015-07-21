import Ember from 'ember';

export default Ember.Component.extend({

  insertMap: Ember.on('didInsertElement', function() {
    var centerLatLng = new window.google.maps.LatLng(this.get('latitude'),this.get('longitude'));
    var options = {
      center: centerLatLng,
      zoom: 13,
      mapTypeId: window.google.maps.MapTypeId.HYBRID
    };
    var map = new window.google.maps.Map(this.$('.map-canvas')[0], options);

    this.get('restaurants').forEach(function(restaurant) {
      console.log(restaurant.get('name'));
    });

    new window.google.maps.Marker({
      position: centerLatLng,
      map: map,
      title: 'Hello World!'
    });
  })
});
