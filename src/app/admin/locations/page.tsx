"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import LocationsTable from "../../components/admin/LocationsTable";
import LocationForm from "../../components/admin/LocationForm";
import { Plus } from "lucide-react";

export type Location = {
  id: string;
  name_en: string;
  name_ar: string;
  lat: number;
  lng: number;
  active: boolean;
};

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Location | null>(null);

  const fetchLocations = async () => {
    const { data } = await supabase.from("locations").select("*");
    setLocations(data || []);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Locations</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
        >
          <Plus size={18} />
          Add Location
        </button>
      </div>

      {showForm && (
        <LocationForm
          initialData={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            fetchLocations();
          }}
        />
      )}

      <LocationsTable
        locations={locations}
        onEdit={(loc) => {
          setEditing(loc);
          setShowForm(true);
        }}
        onRefresh={fetchLocations}
      />
    </div>
  );
}
