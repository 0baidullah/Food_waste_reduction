
// import React, { useEffect, useState, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getAllUsers,
//   deleteUserById,
//   getTopSellers,
// } from "../../store/user/userSlice";


// const UserLocation = () => {
//   const [users, setUsers] = useState([]);
//   const dispatch = useDispatch();
//   const { allUser, topSellers, reset } = useSelector((state) => state.user);





//   const data = React.useMemo(
//     () =>
//       Array.isArray(allUser?.data)
//         ? allUser.data.map((user) => ({
//             profilePicture: user.profilePicture,
//             fullName: user.fullName,
//             userType: user.userType,
//             paymentVerified:
//               user.paymentVerified === false ? "Unverified" : "Verified",
//             actions: user._id,
//           }))
//         : [],
//     [allUser]
//   );
//   console.log("data", data);




//   // const totalAdmins=allUser?.data?.filter((user) => user.userType === "admin").length;

// const userlocations = allUser?.data?.map((user) => user.location);
//   console.log("userlocafdsssstions", userlocations);

// return (

//     <>
//         <button className=" bg-orange-400" >heloo</button>
//     </>

//     );

// };



// export default UserLocation;

import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, getTopSellers } from "../../store/user/userSlice";

const PAKISTAN_GEOJSON_URL = "https://raw.githubusercontent.com/datasets/geopolitical-borders/master/data/countries.geojson"; // Replace with actual URL

const UserLocation = () => {
  const [map, setMap] = useState(null);
  const dispatch = useDispatch();
  const { allUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getTopSellers());
  }, [dispatch]);

  useEffect(() => {
    if (!map) {
      const mapInstance = L.map("map").setView([31.54972, 74.34361], 5); // Centered in Pakistan
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance);
      setMap(mapInstance);
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      // Clear previous markers, circles, and GeoJSON layers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Circle || layer instanceof L.GeoJSON) {
          map.removeLayer(layer);
        }
      });

      // Add user locations and circles
      allUser.data?.forEach((user) => {
        if (user.location) {
          const { lat, lng } = user.location;
          L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`<b>${user.fullName}</b><br>Lat: ${lat}, Lng: ${lng}`);

          L.circle([lat, lng], {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.5,
            radius: 200, // 200 meters
          }).addTo(map);
        }
      });

      // Fetch and add Pakistan boundary
      fetch(PAKISTAN_GEOJSON_URL)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // Find the feature for Pakistan
          const pakistanFeature = data.features.find(feature => feature.properties.name === "Pakistan");
          if (pakistanFeature) {
            L.geoJSON(pakistanFeature, {
              style: {
                color: "green",
                weight: 3,
                fillOpacity: 0.1
              }
            }).addTo(map);
          } else {
            console.error("Pakistan feature not found in GeoJSON data.");
          }
        })
        .catch(error => {
          console.error("Error fetching Pakistan GeoJSON:", error);
        });
    }
  }, [map, allUser]);

  return (
    <div>
      <h1>User Locations</h1>
      <div id="map" style={{ height: "500px" }}></div>
    </div>
  );
};

export default UserLocation;
