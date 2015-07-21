import Ember from 'ember';

export default Ember.Component.extend({

  insertMap: Ember.on('didInsertElement', function() {
    var options = {
      center: new window.google.maps.LatLng(
        this.get('latitude'),
        this.get('longitude')
      ),
      zoom: 13,
      mapTypeId: window.google.maps.MapTypeId.HYBRID
    };
    new window.google.maps.Map(this.$('.map-canvas')[0], options);
  })
});
