"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import LocationPickerMap from "./LocationPickerMap";
import { Location } from "../../admin/locations/page";

type Props = {
  initialData: Location | null;
  onClose: () => void;
  onSaved: () => void;
};

export default function LocationForm({ initialData, onClose, onSaved }: Props) {
  const [form, setForm] = useState({
    name_en: initialData?.name_en ?? "",
    name_ar: initialData?.name_ar ?? "",
    lat: initialData?.lat ?? 30.0444,
    lng: initialData?.lng ?? 31.2357,
    active: initialData?.active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (initialData) {
      await supabase.from("locations").update(form).eq("id", initialData.id);
    } else {
      await supabase.from("locations").insert([form]);
    }

    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <input
        placeholder="Name EN"
        value={form.name_en}
        onChange={(e) => setForm({ ...form, name_en: e.target.value })}
        className="border p-2 w-full rounded"
        required
      />

      <input
        placeholder="Name AR"
        value={form.name_ar}
        onChange={(e) => setForm({ ...form, name_ar: e.target.value })}
        className="border p-2 w-full rounded"
        required
      />

      <LocationPickerMap
        lat={form.lat}
        lng={form.lng}
        onPick={(lat, lng) => setForm({ ...form, lat, lng })}
      />

      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={form.active}
          onChange={(e) => setForm({ ...form, active: e.target.checked })}
        />
        Active
      </label>

      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
          Cancel
        </button>
        <button className="px-4 py-2 bg-black text-white rounded">
          Save
        </button>
      </div>
    </form>
  );
}
