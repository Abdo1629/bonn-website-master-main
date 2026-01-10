"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { supabase } from "../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Location = {
  id: number;
  lat: number;
  lng: number;
  name_ar?: string;
  name_en?: string;
  active?: boolean;
  info?: string;
};

// Dynamic imports for Leaflet
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

// Custom futuristic Pin
const futuristicIcon = new L.DivIcon({
  className: "futuristic-pin",
  html: `
    <div class="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#00f6ff] via-[#0075ff] to-[#002fff] flex items-center justify-center shadow-xl hover:scale-125 transition-transform duration-300">
      <span class="absolute w-3 h-3 rounded-full bg-white animate-ping"></span>
      <span class="absolute w-3 h-3 rounded-full bg-white"></span>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function FuturisticMap() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selected, setSelected] = useState<Location | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await supabase
        .from("locations")
        .select("*")
        .eq("active", true);
      setLocations(data ?? []);
    };
    fetchLocations();
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto my-16 p-4 rounded-2xl shadow-2xl bg-gradient-to-br from-[#001f4d] via-[#002f7d] to-[#0046b0] overflow-hidden">
      
      {/* Subtle moving particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent)]"
        />
      </div>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "500px", width: "100%" }}
        scrollWheelZoom={true}
        className="rounded-xl"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {locations.map(loc => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={futuristicIcon}
            eventHandlers={{
              click: () => setSelected(loc),
            }}
          >
            <Popup>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="text-white font-bold text-center"
              >
                {loc.name_en}
              </motion.div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Modal عند click */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-[#001f4d] text-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-2">{selected.name_en}</h2>
              <p className="text-white/80 mb-4">{selected.info || "No additional info"}</p>
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-[#00f6ff] text-[#002f7d] rounded-lg font-bold hover:scale-105 transition-transform"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
