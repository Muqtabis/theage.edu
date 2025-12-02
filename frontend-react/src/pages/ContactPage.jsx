import React, { useState, useEffect } from 'react';
import { useForm } from '@formspree/react';
import { Send, Mail, MapPin, Phone, CheckCircle, Car, Sun, Moon, Navigation, Activity } from 'lucide-react';

// ==========================================
// MAP CONFIGURATION
// ==========================================
const DEFAULT_SCHOOL_COORDS = { lat: 17.866025529658344, lng: 76.95108130579983 };

// Custom Map Styles
const lightStyle = [];
const darkStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] }
];

// Global references
let globalMapInstance = null;
let trafficLayerInstance = null;
let userMarkerInstance = null;

function initMap() { console.log("Map script loaded"); }
window.initMap = initMap;

// --- Enhanced Map Hook ---
const useMapControls = (mapContainerId) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTrafficOn, setIsTrafficOn] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const loadMap = () => {
      const mapElement = document.getElementById(mapContainerId);
      
      // Wait for Google API to load
      if (!window.google || !window.google.maps || !mapElement) {
        setTimeout(loadMap, 100); 
        return;
      }

      if (globalMapInstance) return;

      // 1. Initialize Map
      const map = new window.google.maps.Map(mapElement, {
        center: DEFAULT_SCHOOL_COORDS,
        zoom: 15,
        styles: lightStyle,
        disableDefaultUI: true,
        zoomControl: true,
      });
      globalMapInstance = map;

      // 2. Add School Marker
      const marker = new window.google.maps.Marker({
        position: DEFAULT_SCHOOL_COORDS,
        map: map,
        title: 'The Age School',
        animation: window.google.maps.Animation.DROP,
      });

      // 3. Add Info Window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 5px; color: #333;">
            <strong>The Age School</strong><br/>
            Main Campus
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      // 4. Initialize Traffic Layer
      trafficLayerInstance = new window.google.maps.TrafficLayer();
    };

    loadMap();
  }, [mapContainerId]);

  // --- Toggle Traffic ---
  const toggleTraffic = () => {
    if (!trafficLayerInstance || !globalMapInstance) return;
    
    if (isTrafficOn) {
      trafficLayerInstance.setMap(null);
    } else {
      trafficLayerInstance.setMap(globalMapInstance);
    }
    setIsTrafficOn(!isTrafficOn);
  };

  // --- Find User Location ---
  const handleLocateMe = () => {
    if (!navigator.geolocation || !globalMapInstance) {
      alert("Geolocation is not supported");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        if (userMarkerInstance) {
          userMarkerInstance.setPosition(userPos);
        } else {
          userMarkerInstance = new window.google.maps.Marker({
            position: userPos,
            map: globalMapInstance,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeColor: "white",
              strokeWeight: 2,
            },
            title: "You are here",
          });
        }

        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(DEFAULT_SCHOOL_COORDS);
        bounds.extend(userPos);
        globalMapInstance.fitBounds(bounds);
        setIsLocating(false);
      },
      () => {
        alert("Unable to retrieve location.");
        setIsLocating(false);
      }
    );
  };

  // --- Dark Mode ---
  const toggleMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (globalMapInstance) {
      globalMapInstance.setOptions({ styles: newDarkMode ? darkStyle : lightStyle });
    }
  };

  // Static URL for directions to the school
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${DEFAULT_SCHOOL_COORDS.lat},${DEFAULT_SCHOOL_COORDS.lng}`;

  return { directionsUrl, toggleMode, isDarkMode, toggleTraffic, isTrafficOn, handleLocateMe, isLocating };
};

const ContactPage = () => {
  const [state, handleSubmit] = useForm("meorjaja"); 
  const { 
    directionsUrl, toggleMode, isDarkMode, 
    toggleTraffic, isTrafficOn, 
    handleLocateMe, isLocating 
  } = useMapControls('map-in-address-card');

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen w-full p-6 md:p-12">
      
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Get in Touch</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message or visit our campus.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {state.succeeded ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-12 text-center max-w-2xl mx-auto">
            <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
            <h2 className="text-2xl font-bold text-green-900 mb-2">Message Sent!</h2>
            <p className="text-green-700 mb-6">Thanks for reaching out. We'll get back to you shortly.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Send Another
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* FORM */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="name">Name</label>
                  <input id="name" type="text" name="name" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none transition" placeholder="Your Name" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none transition" placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none transition resize-none" placeholder="How can we help?" required />
                </div>
                <button type="submit" disabled={state.submitting} className="w-full flex justify-center items-center px-6 py-3 bg-black text-white font-medium rounded hover:bg-gray-800 transition disabled:opacity-50">
                  <Send size={18} className="mr-2" />
                  {state.submitting ? "Sending..." : "Send Message"}
                </button>
                {state.errors?.length > 0 && <p className="text-red-500 text-sm mt-2">Something went wrong.</p>}
              </form>
            </div>

            {/* MAP & INFO */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded text-center">
                  <Phone className="mx-auto mb-2 text-gray-600" size={24} />
                  <p className="text-xs font-bold text-gray-400 uppercase">Phone</p>
                  <p className="text-sm font-medium">(+91) 12345 67890</p>
                </div>
                <div className="p-4 border border-gray-200 rounded text-center">
                  <Mail className="mx-auto mb-2 text-gray-600" size={24} />
                  <p className="text-xs font-bold text-gray-400 uppercase">Email</p>
                  <p className="text-sm font-medium">info@theageschool.edu</p>
                </div>
              </div>

              {/* MAP CARD */}
              <div className="border border-gray-200 rounded overflow-hidden shadow-sm">
                
                {/* Map Controls */}
                <div className="bg-gray-50 p-3 flex flex-wrap justify-between items-center border-b border-gray-200 gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-red-600" />
                    <h4 className="font-bold text-sm">Our Campus</h4>
                  </div>
                  
                  <div className="flex gap-2">
                     <button 
                      onClick={handleLocateMe} 
                      title="Find my location"
                      className={`p-2 rounded-full transition ${isLocating ? 'bg-blue-100 text-blue-600 animate-pulse' : 'bg-white hover:bg-gray-200 text-gray-600'}`}
                    >
                      <Navigation size={16} className={isLocating ? "animate-spin" : ""} />
                    </button>

                    <button 
                      onClick={toggleTraffic} 
                      title="Toggle Traffic"
                      className={`p-2 rounded-full transition ${isTrafficOn ? 'bg-green-100 text-green-600' : 'bg-white hover:bg-gray-200 text-gray-600'}`}
                    >
                      <Activity size={16} />
                    </button>

                    <button 
                      onClick={toggleMode} 
                      title="Dark Mode"
                      className="p-2 rounded-full bg-white hover:bg-gray-200 text-gray-600 transition"
                    >
                      {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                  </div>
                </div>

                {/* Map Container - GREY BOX FIX IS IN INDEX.HTML */}
                <div className="h-72 w-full bg-gray-200 relative">
                  <div id="map-in-address-card" className="h-full w-full"></div>
                </div>
                
                <a 
                  href={directionsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 bg-gray-50 text-sm font-medium hover:bg-gray-100 transition border-t border-gray-200 text-blue-600"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Car size={16} /> Get Directions on Google Maps
                  </div>
                </a>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;