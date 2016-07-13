var app = angular.module("myApp", [])
  .filter("createPath", function(){
    return function(id){
        if(id != null)
          return "/" + id;
        return id;
    }
  })
  .controller("myCtrl", function($scope, $http) {
    $scope.zip = "ZIP Code";
    $scope.carlist = [
      {type:"compact", name:"2015 Accent", cost:14745, image:"comps/cars/accent.png", id:"accent"},
      {type:"compact", name:"2015 Elantra", cost:17250, image:"comps/cars/elantra.png", id:"elantra"},
      {type:"compact", name:"2015 Elantra Coupe", cost:19600, image:"comps/cars/elantra_coupe.png", id:"elantra-coupe"},
      {type:"compact", name:"2015 Elantra GT", cost:18800, image:"comps/cars/elantra_gt.png", id:"elantra-gt"},
      {type:"compact", name:"2015 Veloster", cost:18000, image:"comps/cars/veloster.png", id:"veloster"},
      {type:"sedan", name:"2015 Sonata", cost:21150, image:"comps/cars/sonata.png", id:"sonata"},
      {type:"sedan", name:"2015 Azera", cost:34000, image:"comps/cars/azera.png", id:"azera"},
      {type:"crossover", name:"2015 Tucson", cost:21650, image:"comps/cars/tucson.png", id:"tucson"},
      {type:"crossover", name:"2015 Santa Fe", cost:24950, image:"comps/cars/santafe.png", id:"santafe"},
      {type:"hybrid", name:"2015 Sonata Hybrid", cost:26000, image:"comps/cars/sonata_hybrid.png", id:"sonata-hybrid"},
      {type:"hybrid", name:"2015 Tucson Fuel Cell", cost:0, message:"Learn more", image:"comps/cars/tucson_fuel_cell.png", id:"tucson-fuel-cell"},
      {type:"premium", name:"2015 Genesis Coupe", cost:26750, image:"comps/cars/genesis_coupe.png", id:"genesis-coupe"},
      {type:"premium", name:"2015 Genesis", cost:38000, image:"comps/cars/genesis.png", id:"genesis"},
      {type:"premium", name:"2015 Equus", cost:61500, image:"comps/cars/equus.png", id:"equus"},
      {type:"future", name:"Sonata Hybrid/Plug-in", cost:0, message:"Coming soon",image:"comps/cars/sonata_plugin.png", id:"sonata-plugin"},
      {type:"future", name:"Veloster Rally Edition", cost:0, message:"Coming soon",image:"comps/cars/veloster_rally.png", id:"veloster-rally"}
    ];

    $scope.dropdown = function(){
        $('#menu-dropdown').slideDown("slow");
    };
    $scope.slideup = function(){
        $('#menu-dropdown').slideUp("slow");
    };

    $scope.redirect = function(link){
      window.location.href=link;
    }

    //google api
    //https://maps.googleapis.com/maps/api/geocode/json?latlng=37.383253,-122.078075&sensor=false
    $scope.getlocation = function(){
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition($scope.setlocation);
      } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
    $scope.setlocation = function(position){
      console.log("Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude);
      $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude+"&sensor=false")
      .then(function(response) {
        console.log(response.data.results[0].address_components[6].short_name);
        $scope.zip = response.data.results[0].address_components[6].short_name;
        //$scope.myWelcome = response.data;
      });
    }

    $scope.finddealer = function(){
      if($scope.zip != null && !isNaN($scope.zip) && $scope.zip.length == 5)
        window.location.href = "/find-a-dealer/" + $scope.zip;
      else {
        alert("Please enter a valid zip code");
      }
    }

    $scope.clearzip = function(){
      $scope.zip = "";
    }
  });
