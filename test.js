var quadtree = require('quadtree');
var Factual = require('factual-api');
var factual = new Factual('SEQDH9X3sOycBDUzKubGqgzFVOybhdHPgAJrYggu', 'mwjLAzVZsaPOwavzkXBeu44B1VEYNAfRGczh3wow');

var coordinate = {
    lat: 41.877741,
    lng: -87.740936
};

var boundingBox = quadtree.bbox(quadtree.encode(coordinate, 4));
console.log(boundingBox);

var smaller = quadtree.envelop(boundingBox, 4);
console.log(smaller);
console.log(quadtree.bbox(smaller));
console.log(boundingBox['maxlat'] + ','+  boundingBox['minlat']);
var top_right = boundingBox['maxlat'] + ','+  boundingBox['minlat'];
var bottom_left = boundingBox['maxlat'] + ','+  boundingBox['minlat'];
//geo={"$within":{"$rect":[[maxlat,minlng],[minlat,maxlng]]}}
factual.get('/t/places-us', {filters:{category_ids:{"$includes":2}}, "include_count":"true", geo:{"$within":{"$rect":[[top_right], [bottom_left]]}}}, function (error, res) {
  console.log("show "+ res.included_rows +"/"+ res.total_row_count +" rows:");
  //console.log(res);
  /*var precision = 7;
  var coordinate = {
      lat: 41.877741,
      lng: -87.740936
  };
  var encoded = quadtree.encode(coordinate, precision); // returns "20310230"
  var boundingBox = quadtree.bbox(encoded);
  console.log(encoded)
  console.log(boundingBox)
  var enveloped = quadtree.envelop(boundingBox, precision);
  console.log(enveloped[0])
  console.log (quadtree.bbox(enveloped[1]));*/
});

    var precision = 1;
