// src/socket.js
import io from "socket.io-client";

// const socket = io("http://localhost:8000"); 

// for deploy
const socket = io("https://food-waste-reduction-1.onrender.com"); 


export default socket;
