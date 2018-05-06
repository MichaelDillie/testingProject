$(document).ready(function () {

    var sectionContainer = $(".section-container");

    function ajaxOne() {
        $.ajax({
            headers: {
                "user-key": "465c36f62f7c99a289666a2388692476"
            },
            url: "https://developers.zomato.com/api/v2.1/locations?query=austin&count=5"
        }).then(function (response) {
            var lat = response.location_suggestions[0].latitude;
            var lon = response.location_suggestions[0].longitude;
            var cityId = response.location_suggestions[0].entity_id;
            // console.log("lat " + lat + " | " + "lon " + lon + " | City ID " + cityId);
            ajaxTwo(lat, lon);
        });
    }

    function ajaxTwo(lat, lon) {
        $.ajax({
            headers: {
                "user-key": "465c36f62f7c99a289666a2388692476"
            },
            url: "https://developers.zomato.com/api/v2.1/geocode?lat=" + lat + "&lon=" + lon + "&count=30"
        }).then(function (response) {
            for (var i = 0; i < response.nearby_restaurants.length; i++) {
                var restaurantImgData = response.nearby_restaurants[i].restaurant.featured_image;
                var restaurantNameData = response.nearby_restaurants[i].restaurant.name;
                var ratingData = response.nearby_restaurants[i].restaurant.user_rating.aggregate_rating;
                var restaurantMenuUrlData = response.nearby_restaurants[i].restaurant.menu_url;
                var restaurantAddressData = response.nearby_restaurants[i].restaurant.location.address;
                var restaurantIdData = response.nearby_restaurants[i].restaurant.R.res_id;


                // Creating the main row
                var mainRow = $("<div>");
                mainRow.addClass("row main-row");

                // Creating col One
                var colOne = $("<div>");
                colOne.addClass("col-md-1 col-one");
                var restaurantImg = $("<img>");
                restaurantImg.addClass("restaurant-img");
                restaurantImg.attr("src", restaurantImgData);
                colOne.append(restaurantImg);

                // Creating col Two
                var colTwo = $("<div>");
                colTwo.addClass("col-md-6 col-two");
                // Restaurant Name
                var restaurantNameRow = $("<div>");
                restaurantNameRow.addClass("row");
                colTwo.append(restaurantNameRow);
                var restaurantName = $("<div>");
                restaurantName.addClass("col-md-12 restaurant-name");
                restaurantName.text(restaurantNameData);
                restaurantNameRow.append(restaurantName);
                // Time open-close
                var timeOpenCloseRow = $("<div>");
                timeOpenCloseRow.addClass("row");
                colTwo.append(timeOpenCloseRow);
                var timeOpenClose = $("<div>");
                timeOpenClose.addClass("col-sm-12 time-open-close");
                timeOpenClose.text("Open 8AM - 10PM");
                timeOpenCloseRow.append(timeOpenClose);
                // Distance
                var distanceRow = $("<div>");
                distanceRow.addClass("row");
                colTwo.append(distanceRow);
                var distance = $("<div>");
                distance.addClass("col-sm-12 distance");
                distance.text("1.3 miles");
                distanceRow.append(distance);

                // Creating col Three
                var colThree = $("<div>");
                colThree.addClass("col-md-5 col-three");
                // Rating
                var ratingRow = $("<div>");
                ratingRow.addClass("row");
                colThree.append(ratingRow);
                var rating = $("<div>");
                rating.addClass("col-md-12 rating");
                rating.text(ratingData);
                ratingRow.append(rating);
                // Menu URL
                var menuUrlRow = $("<div>");
                menuUrlRow.addClass("row");
                colThree.append(menuUrlRow);
                var menuUrl = $("<a>");
                menuUrl.addClass("col-sm-12 menu-url");
                menuUrl.attr("href", restaurantMenuUrlData);
                menuUrl.text(restaurantNameData + " Menu");
                menuUrlRow.append(menuUrl);
                // Address
                var addressRow = $("<div>");
                addressRow.addClass("row");
                colThree.append(addressRow);
                var address = $("<div>");
                address.addClass("col-sm-12 address");
                address.text(restaurantAddressData);
                addressRow.append(address);


                //  Creating the section
                mainRow.append(colOne);

                mainRow.append(colTwo);

                mainRow.append(colThree);

                sectionContainer.append(mainRow);

            }
        })
    }
    ajaxOne();


});