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

    var geocoder = new window.google.maps.Geocoder();

    this.get('restaurants').forEach(function(restaurant) {
      geocoder.geocode( { 'address': restaurant.get('address')}, function(results, status) {
        if (status === window.google.maps.GeocoderStatus.OK) {
          if (status !== window.google.maps.GeocoderStatus.ZERO_RESULTS) {
            new window.google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              title: restaurant.get('name')
            });
          } else {
            console.log("No results found");
          }
        } else {
          console.log("Geocode was not successful for the following reason: " + status);
        }
      });
    });


  })
});
