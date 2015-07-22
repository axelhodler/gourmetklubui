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
            new CustomMarker(
              results[0].geometry.location,
              map,
              restaurant.get('name')
            );
          } else {
            console.log("No results found");
          }
        } else {
          console.log("Geocode was not successful for the following reason: " + status);
        }
      });
    });

    function CustomMarker(latlng, map, name) {
      this.latlng = latlng;
      this.name = name;
      this.setMap(map);
    }

    CustomMarker.prototype = new gmaps.OverlayView();

    CustomMarker.prototype.draw = function() {

      var self = this;

      var div = this.div;

      if (!div) {
        div = this.div = document.createElement('div');
        div.innerHTML = "<h3>" + self.name + "</h3>";
        div.className = 'marker';

        div.style.position = 'absolute';
        div.style.cursor = 'pointer';
        div.style.color = 'red';

        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
      }

      var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

      if (point) {
        div.style.left = point.x + 'px';
        div.style.top = point.y + 'px';
      }
    };


  })
});
