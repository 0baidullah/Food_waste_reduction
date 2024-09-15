// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { reset } from "../store/auth/authSlice";
// import { getAllAuctions } from "../store/auction/auctionSlice";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { getAllCategories } from "../store/category/categorySlice";
// import { getAllCities } from "../store/city/citySlice";
// import axios from "axios";


// const SearchLocationCategory = () => {
//   const [filter, setFilter] = useState({
//     location: "",
//     category: "",
//     itemName: "",
//   });

//   const { categories } = useSelector((state) => state.category);
//   const { cities } = useSelector((state) => state.city);


//   const [auctionData, setAuctionData] = useState([]);

//   const { auction, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auction
//   );
//   console.log("auctionDatain serach", auctionData);
//   // console.log(data.map(auctionData => auctionData.points));
  
//   console.log(auctionData.map(item => item.seller.location));

//   useEffect(() => {
//     if (isSuccess) {
//       setAuctionData(auction);
//     } else if (isError) {
//       toast.error(message);
//     }
//   }, [auction]);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllCategories());
//     dispatch(getAllCities());
//   }, []);

//   // console.log(categories, "categories")
//   // console.log(cities, "cities")

//   const SearchByFilter = () => {
//     console.log(filter, "filter ssss ");

//     dispatch(getAllAuctions(filter));
//   };

  

//   const [city, setCity] = useState('');

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;

//           console.log(latitude, longitude, "latitude, longitude");
      
//           try {
//             const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=49263bed8f0342478e723a8fabe41d3b`);
      
//             console.log(response, " response from location,  ,,,,,,,,,,");
      
//             if (response.data && response.data.results && response.data.results[0]) {
//               let district = response.data.results[0].components.district;
//               district = district?.slice(0, -8)?.trim();
//               setCity(district);
//             }
//           } catch (error) {
//             console.error('Error getting city name:', error);
//           }
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//         },
//         {
//           enableHighAccuracy: true
//         }
//       );
//     }
//   }, []);
  
  
//   console.log(city);

//   return (
//     <div className="flex justify-center items-center my-5 min-h-[100px]">
//       <div className="flex-col   sm:flex-row sm:items-center   bg-[#061224] text-[#7386a8] rounded-md p-2">
//         <select
//           required
//           id="category"
//           className="bg-[#061224] px-2 text-[#7386a8] w-full block sm:w-auto sm:inline  py-3  rounded-lg outline-none border border-border-info-color cursor-pointer"
//           onChange={(e) => setFilter({ ...filter, location: e.target.value })}
//         >
//           <option value="">Select Location</option>
//           {
//                 city && <option value={city} >
//                 Current Location
//                 </option>
//               }
//           {cities.data &&
//             cities.data.map((category) => (
//               <>
             
//                <option key={category._id} value={category._id}>
//                 {category.name}
//               </option>
//               </>
             
//             ))}
//         </select>

//         <select
//           required
//           id="category"
//           className="bg-[#061224] px-2 text-[#73a880] w-full mt-2 sm:w-auto   sm:ml-4 block sm:inline   py-3  rounded-lg outline-none border border-border-info-color cursor-pointer"
//           onChange={(e) => setFilter({ ...filter, category: e.target.value })}
//         >
//           <option value="">Select Category</option>
//           {categories.data &&
//             categories.data.map((category) => (
//               <option key={category._id} value={category._id}>
//                 {category.name}
//               </option>
//             ))}
//         </select>
//         <input
//           type="text"
//           placeholder="Search Name"
//           className="bg-[#061224] py-3 px-3 text-[#7386a8] mt-2 block sm:w-auto sm:inline rounded-lg  border border-border-info-color sm:mx-4 outline-none placeholder:text-[#7386a8]"
//           value={filter.itemName}
//           onChange={(e) => setFilter({ ...filter, itemName: e.target.value })}
//         />
//         <button
//           className="bg-theme-color mt-2  hover:bg-color-danger text-white text-sm font-bold  rounded-md my-auto px-3 py-2  text-center no-underline border-none"
//           onClick={() => SearchByFilter()}
//         >
//           Search
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchLocationCategory;


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllAuctions } from "../store/auction/auctionSlice";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { getAllCategories } from "../store/category/categorySlice";
// import { getAllCities } from "../store/city/citySlice";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import 'leaflet/dist/images/marker-icon.png';
// import 'leaflet/dist/images/marker-shadow.png';

// // Custom red marker icon
// const redMarkerIcon = new L.Icon({
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//   shadowSize: [41, 41],
// });

// // Custom blue marker icon
// const blueMarkerIcon = new L.Icon({
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//   shadowSize: [41, 41],
// });

// // Component to adjust the map view to fit all marker bounds
// const FocusOnMarkers = ({ bounds }) => {
//   const map = useMap();
//   useEffect(() => {
//     if (bounds) {
//       map.fitBounds(bounds, { padding: [50, 50] });
//     }
//   }, [bounds, map]);

//   return null;
// };

// const SearchLocationCategory = () => {
//   const [filter, setFilter] = useState({
//     location: "",
//     category: "",
//     itemName: "",
//   });

//   const { categories } = useSelector((state) => state.category);
//   const { cities } = useSelector((state) => state.city);
//   const [auctionData, setAuctionData] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const [city, setCity] = useState('');
//   const [bounds, setBounds] = useState(null);

//   const { auction, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auction
//   );

//   useEffect(() => {
//     if (isSuccess) {
//       setAuctionData(auction);
//     } else if (isError) {
//       toast.error(message);
//     }
//   }, [auction, isSuccess, isError, message]);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllCategories());
//     dispatch(getAllCities());
//   }, [dispatch]);

//   const SearchByFilter = () => {
//     dispatch(getAllAuctions(filter));
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ lat: latitude, lng: longitude });

//           try {
//             const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`);
//             if (response.data && response.data.results && response.data.results[0]) {
//               let district = response.data.results[0].components.district;
//               district = district?.slice(0, -8)?.trim();
//               setCity(district);
//             }
//           } catch (error) {
//             console.error('Error getting city name:', error);
//           }
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//         },
//         {
//           enableHighAccuracy: true
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   useEffect(() => {
//     if (userLocation) {
//       let boundsArray = [[userLocation.lat, userLocation.lng]];

//       auctionData.forEach(item => {
//         if (item.seller.location) {
//           boundsArray.push([item.seller.location.lat, item.seller.location.lng]);
//         }
//       });

//       if (boundsArray.length > 0) {
//         setBounds(L.latLngBounds(boundsArray));
//       }
//     }
//   }, [userLocation, auctionData]);

//   return (
//     <div className="flex flex-col items-center my-5 min-h-[100px]">
//       <div className="flex-col sm:flex-row sm:items-center bg-[#061224] text-[#7386a8] rounded-md p-2">
//         <select
//           required
//           id="category"
//           className="bg-[#061224] px-2 text-[#7386a8] w-full block sm:w-auto sm:inline py-3 rounded-lg outline-none border border-border-info-color cursor-pointer"
//           onChange={(e) => setFilter({ ...filter, location: e.target.value })}
//         >
//           <option value="">Select Location</option>
//           {userLocation && <option value="current">Current Location</option>}
//           {cities.data &&
//             cities.data.map((city) => (
//               <option key={city._id} value={city._id}>
//                 {city.name}
//               </option>
//             ))}
//         </select>

//         <select
//           required
//           id="category"
//           className="bg-[#061224] px-2 text-[#73a880] w-full mt-2 sm:w-auto sm:ml-4 block sm:inline py-3 rounded-lg outline-none border border-border-info-color cursor-pointer"
//           onChange={(e) => setFilter({ ...filter, category: e.target.value })}
//         >
//           <option value="">Select Category</option>
//           {categories.data &&
//             categories.data.map((category) => (
//               <option key={category._id} value={category._id}>
//                 {category.name}
//               </option>
//             ))}
//         </select>
//         <input
//           type="text"
//           placeholder="Search Name"
//           className="bg-[#061224] py-3 px-3 text-[#7386a8] mt-2 block sm:w-auto sm:inline rounded-lg border border-border-info-color sm:mx-4 outline-none placeholder:text-[#7386a8]"
//           value={filter.itemName}
//           onChange={(e) => setFilter({ ...filter, itemName: e.target.value })}
//         />
//         <button
//           className="bg-theme-color mt-2 hover:bg-color-danger text-white text-sm font-bold rounded-md my-auto px-3 py-2 text-center no-underline border-none"
//           onClick={() => SearchByFilter()}
//         >
//           Search
//         </button>
//       </div>

//       <div className="w-full sm:w-3/4 lg:w-1/2 mt-4">
//         <MapContainer
//           center={[30.3753, 69.3451]} // Center on Pakistan
//           zoom={5} // Adjust zoom level as needed
//           style={{ height: "500px", width: "100%" }} // Adjust height as needed
//           scrollWheelZoom={true} // Enable scroll zoom
//           zoomControl={true} // Enable zoom controls
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           {userLocation ? (
//             <>
//               <Marker position={[userLocation.lat, userLocation.lng]} icon={blueMarkerIcon}>
//                 <Popup>Your current location</Popup>
//               </Marker>
//               <Circle
//                 center={[userLocation.lat, userLocation.lng]}
//                 radius={1000} // Radius in meters
//                 color="red"
//                 fillColor="red"
//                 fillOpacity={0.2}
//               />
//             </>
//           ) : (
//             console.log("userLocation not set")
//           )}
//           {auctionData.map((item) => (
//             item.seller.location ? (
//               <Marker
//                 key={item._id}
//                 position={[item.seller.location.lat, item.seller.location.lng]}
//                 icon={blueMarkerIcon}
//               >
//                 <Popup>Item Seller Location</Popup>
//               </Marker>
//             ) : null
//           ))}
//           <FocusOnMarkers bounds={bounds} />
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default SearchLocationCategory;



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllAuctions } from "../store/auction/auctionSlice";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { getAllCategories } from "../store/category/categorySlice";
// import { getAllCities } from "../store/city/citySlice";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import 'leaflet/dist/images/marker-icon.png';
// import 'leaflet/dist/images/marker-shadow.png';

// // Custom marker icons
// const redMarkerIcon = new L.Icon({
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//   shadowSize: [41, 41],
// });

// const blueMarkerIcon = new L.Icon({
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//   shadowSize: [41, 41],
// });

// // Component to adjust the map view to fit all marker bounds
// const FocusOnMarkers = ({ bounds }) => {
//   const map = useMap();
//   useEffect(() => {
//     if (bounds) {
//       map.fitBounds(bounds, { padding: [50, 50] });
//     }
//   }, [bounds, map]);

//   return null;
// };

// const SearchLocationCategory = () => {
//   const [filter, setFilter] = useState({
//     location: "",
//     category: "",
//     itemName: "",
//   });

//   const [radius, setRadius] = useState(1000); // Default radius in meters

//   const { categories } = useSelector((state) => state.category);
//   const { cities } = useSelector((state) => state.city);
//   const [auctionData, setAuctionData] = useState([]);
//   const [filteredAuctions, setFilteredAuctions] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const [city, setCity] = useState('');
//   const [bounds, setBounds] = useState(null);

//   const { auction, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auction
//   );

//   useEffect(() => {
//     if (isSuccess) {
//       setAuctionData(auction);
//     } else if (isError) {
//       toast.error(message);
//     }
//   }, [auction, isSuccess, isError, message]);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllCategories());
//     dispatch(getAllCities());
//   }, [dispatch]);

//   const SearchByFilter = () => {
//     dispatch(getAllAuctions(filter));
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ lat: latitude, lng: longitude });

//           try {
//             const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`);
//             if (response.data && response.data.results && response.data.results[0]) {
//               let district = response.data.results[0].components.district;
//               district = district?.slice(0, -8)?.trim();
//               setCity(district);
//             }
//           } catch (error) {
//             console.error('Error getting city name:', error);
//           }
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//         },
//         {
//           enableHighAccuracy: true
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   useEffect(() => {
//     if (userLocation) {
//       let boundsArray = [[userLocation.lat, userLocation.lng]];
//       const filtered = auctionData.filter(item => {
//         if (item.seller.location) {
//           const distance = L.latLng(userLocation.lat, userLocation.lng).distanceTo(L.latLng(item.seller.location.lat, item.seller.location.lng));
//           const matchesCity = !filter.location || (filter.location === "current" && city === item.seller.location.name);
//           const matchesCategory = !filter.category || item.category._id === filter.category;
//           const matchesName = !filter.itemName || item.name.toLowerCase().includes(filter.itemName.toLowerCase());

//           if (matchesCity && matchesCategory && matchesName) {
//             if (distance <= radius) {
//               boundsArray.push([item.seller.location.lat, item.seller.location.lng]);
//             }
//             return true;
//           }
//         }
//         return false;
//       });

//       setFilteredAuctions(filtered);

//       if (boundsArray.length > 0) {
//         setBounds(L.latLngBounds(boundsArray));
//       }
//     }
//   }, [userLocation, auctionData, radius, filter]);

//   return (
//     <div className="flex flex-col items-center my-5 min-h-[100px]">
//       <div className="flex-col sm:flex-row sm:items-center bg-[#061224] text-[#7386a8] rounded-md p-2">
//         <select
//           required
//           id="category"
//           className="bg-[#061224] px-2 text-[#7386a8] w-full block sm:w-auto sm:inline py-3 rounded-lg outline-none border border-border-info-color cursor-pointer"
//           onChange={(e) => setFilter({ ...filter, location: e.target.value })}
//         >
//           <option value="">Select Location</option>
//           {userLocation && <option value="current">Current Location</option>}
//           {cities.data &&
//             cities.data.map((city) => (
//               <option key={city._id} value={city._id}>
//                 {city.name}
//               </option>
//             ))}
//         </select>

//         <select
//           required
//           id="category"
//           className="bg-[#061224] px-2 text-[#73a880] w-full mt-2 sm:w-auto sm:ml-4 block sm:inline py-3 rounded-lg outline-none border border-border-info-color cursor-pointer"
//           onChange={(e) => setFilter({ ...filter, category: e.target.value })}
//         >
//           <option value="">Select Category</option>
//           {categories.data &&
//             categories.data.map((category) => (
//               <option key={category._id} value={category._id}>
//                 {category.name}
//               </option>
//             ))}
//         </select>
//         <input
//           type="text"
//           placeholder="Search Name"
//           className="bg-[#061224] py-3 px-3 text-[#7386a8] mt-2 block sm:w-auto sm:inline rounded-lg border border-border-info-color sm:mx-4 outline-none placeholder:text-[#7386a8]"
//           value={filter.itemName}
//           onChange={(e) => setFilter({ ...filter, itemName: e.target.value })}
//         />
//         <button
//           className="bg-theme-color mt-2 hover:bg-color-danger text-white text-sm font-bold rounded-md my-auto px-3 py-2 text-center no-underline border-none"
//           onClick={() => SearchByFilter()}
//         >
//           Search
//         </button>
//       </div>

//       <div className="flex flex-col items-center mt-4">
//         <label htmlFor="radius" className="text-[#7386a8]">Select Range:</label>
//         <input
//           type="range"
//           id="radius"
//           min="5000"
//           max="13000"
//           step="50"
//           value={radius}
//           onChange={(e) => setRadius(parseInt(e.target.value))}
//           className="w-full"
//         />
//         <span className="text-[#7386a8]">{radius} meters</span>
//       </div>

//       <div className="w-80 sm:w-3/4 lg:w-1/2 mt-4">
//         <MapContainer
//           center={[30.3753, 69.3451]} // Center on Pakistan
//           zoom={1} // Adjust zoom level as needed
//           style={{ height: "500px", width: "100%" }} // Adjust height as needed
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />

//           {userLocation && (
//             <Marker position={[userLocation.lat, userLocation.lng]} icon={blueMarkerIcon}>
//               <Popup>Your location</Popup>
//               <Circle
//                 center={[userLocation.lat, userLocation.lng]}
//                 radius={radius}
//                 color="red"
//                 fillOpacity={0.2}
//               />
//             </Marker>
//           )}

//           {filteredAuctions.map((item) => (
//             item.seller.location && (
//               <Marker key={item._id} position={[item.seller.location.lat, item.seller.location.lng]} icon={blueMarkerIcon}>
//                 <Popup>
//                   {item.name} - {item.category.name} <br />
//                   Seller: {item.seller.name}
//                 </Popup>
//               </Marker>
//             )
//           ))}

//           <FocusOnMarkers bounds={bounds} />
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default SearchLocationCategory;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuctions } from "../store/auction/auctionSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllCategories } from "../store/category/categorySlice";
import { getAllCities } from "../store/city/citySlice";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';

const redMarkerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const blueMarkerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const FocusOnMarkers = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);

  return null;
};

const SearchLocationCategory = () => {
  const [filter, setFilter] = useState({
    location: "",
    category: "",
    itemName: "",
  });

  const [radius, setRadius] = useState(1000);
  const { categories } = useSelector((state) => state.category);
  const { cities } = useSelector((state) => state.city);
  const [auctionData, setAuctionData] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [city, setCity] = useState('');
  const [bounds, setBounds] = useState(null);

  const { auction, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auction
  );

  useEffect(() => {
    if (isSuccess) {
      setAuctionData(auction);
    } else if (isError) {
      toast.error(message);
    }
  }, [auction, isSuccess, isError, message]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllCities());
  }, [dispatch]);

  const SearchByFilter = () => {
    dispatch(getAllAuctions(filter));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          try {
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`);
            if (response.data && response.data.results && response.data.results[0]) {
              let district = response.data.results[0].components.district;
              district = district?.slice(0, -8)?.trim();
              setCity(district);
            }
          } catch (error) {
            console.error('Error getting city name:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      let boundsArray = [];
      const filtered = auctionData.filter(item => {
        if (item.seller?.location) {
          const distance = L.latLng(userLocation.lat, userLocation.lng).distanceTo(L.latLng(item.seller.location.lat, item.seller.location.lng));
          const matchesCity = !filter.location || (filter.location === "current" && city === item.seller.location.name);
          const matchesCategory = !filter.category || item.category._id === filter.category;
          const matchesName = !filter.itemName || item.name.toLowerCase().includes(filter.itemName.toLowerCase());

          if (matchesCity && matchesCategory && matchesName && distance <= radius) {
            boundsArray.push([item.seller.location.lat, item.seller.location.lng]);
            return true;
          }
        }
        return false;
      });

      setFilteredAuctions(filtered);

      if (boundsArray.length > 0) {
        setBounds(L.latLngBounds(boundsArray));
      }
    }
  }, [userLocation, auctionData, radius, filter]);

  return (
    <div className="flex flex-col items-center my-5 min-h-[100px]">
      <div className="flex-col sm:flex-row sm:items-center bg-[#061224] text-[#7386a8] rounded-md p-2">
        <select
          required
          id="location"
          className="bg-[#061224] px-2 text-[#7386a8] w-full block sm:w-auto sm:inline py-3 rounded-lg outline-none border border-border-info-color cursor-pointer"
          onChange={(e) => setFilter({ ...filter, location: e.target.value })}
        >
          <option value="">Select Location</option>
          {userLocation && <option value="current">Current Location</option>}
          {cities.data &&
            cities.data.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
        </select>

        <select
          required
          id="category"
          className="bg-[#061224] px-2 text-[#73a880] w-full mt-2 sm:w-auto sm:ml-4 block sm:inline py-3 rounded-lg outline-none border border-border-info-color cursor-pointer"
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.data &&
            categories.data.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <input
          type="text"
          placeholder="Search Name"
          className="bg-[#061224] py-3 px-3 text-[#7386a8] mt-2 block sm:w-auto sm:inline rounded-lg border border-border-info-color sm:mx-4 outline-none placeholder:text-[#7386a8]"
          value={filter.itemName}
          onChange={(e) => setFilter({ ...filter, itemName: e.target.value })}
        />
        <button
          className="bg-theme-color mt-2 hover:bg-color-danger text-white text-sm font-bold rounded-md my-auto px-3 py-2 text-center no-underline border-none"
          onClick={() => SearchByFilter()}
        >
          Search
        </button>
      </div>

      <div className="flex flex-col items-center mt-4">
        <label htmlFor="radius" className="text-[#7386a8]">Select Range:</label>
        <input
          type="range"
          id="radius"
          min="5000"
          max="13000"
          step="50"
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value))}
          className="w-full"
        />
        <span className="text-[#7386a8]">{radius} meters</span>
      </div>

      <div className="w-80 sm:w-3/4 lg:w-1/2 mt-4">
        <MapContainer
          center={userLocation ? [userLocation.lat, userLocation.lng] : [30.3753, 69.3451]}
          zoom={userLocation ? 13 : 5}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {userLocation && (
            <>
              <Marker position={[userLocation.lat, userLocation.lng]} icon={redMarkerIcon}>
                <Popup>Your Location</Popup>
              </Marker>
              <Circle center={userLocation} radius={radius} />
            </>
          )}

          {filteredAuctions.map((item, index) => (
            item.seller?.location && (
              <Marker key={index} position={[item.seller.location.lat, item.seller.location.lng]} icon={blueMarkerIcon}>
                <Popup>
                  <strong>{item.name}</strong><br />
                  <span>{item.seller.location.name}</span><br />
                  <span>Distance: {Math.round(L.latLng(userLocation.lat, userLocation.lng).distanceTo(L.latLng(item.seller.location.lat, item.seller.location.lng)))} meters</span>
                </Popup>
              </Marker>
            )
          ))}

          {bounds && <FocusOnMarkers bounds={bounds} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default SearchLocationCategory;
