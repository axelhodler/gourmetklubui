import Ember from 'ember';

export default Ember.Component.extend({

  insertMap: Ember.on('didInsertElement', function() {
    var gmaps = window.google.maps;
    var centerLatLng = new gmaps.LatLng(this.get('latitude'),this.get('longitude'));
    var options = {
      center: centerLatLng,
      zoom: 13,
      mapTypeId: gmaps.MapTypeId.HYBRID
    };
    var map = new gmaps.Map(this.$('.map-canvas')[0], options);

    var geocoder = new gmaps.Geocoder();

    this.get('restaurants').forEach(function(restaurant) {
      geocoder.geocode( { 'address': restaurant.get('address')}, function(results, status) {
        if (status === gmaps.GeocoderStatus.OK) {
          if (status !== gmaps.GeocoderStatus.ZERO_RESULTS) {
            new gmaps.Marker({
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
