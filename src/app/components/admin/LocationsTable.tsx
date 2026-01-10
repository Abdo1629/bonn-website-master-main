"use client";

import { supabase } from "../../lib/supabaseClient";
import { Location } from "../../admin/locations/page";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  locations: Location[];
  onEdit: (loc: Location) => void;
  onRefresh: () => void;
};

export default function LocationsTable({ locations, onEdit, onRefresh }: Props) {
  const deleteLocation = async (id: string) => {
    if (!confirm("Delete this location?")) return;
    await supabase.from("locations").delete().eq("id", id);
    onRefresh();
  };

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Name</th>
            <th>Lat</th>
            <th>Lng</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {locations.map((loc) => (
            <tr key={loc.id} className="border-t">
              <td className="p-3">{loc.name_en}</td>
              <td>{loc.lat.toFixed(4)}</td>
              <td>{loc.lng.toFixed(4)}</td>
              <td>{loc.active ? "Active" : "Disabled"}</td>
              <td className="flex gap-2 p-2">
                <button onClick={() => onEdit(loc)}>
                  <Pencil size={16} />
                </button>
                <button onClick={() => deleteLocation(loc.id)}>
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
