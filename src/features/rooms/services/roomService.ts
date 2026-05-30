const BASE_URL = "http://localhost:5287/api/Room";

export interface Room {
  id: number;
  number: number;
  roomTypeId: number;
  active: boolean;
}

export interface CreateRoomPayload {
  number: number;
  roomTypeId: number;
  active: boolean;
}

export interface UpdateRoomPayload {
  number: number;
  roomTypeId: number;
  active: boolean;
}

export const roomService = {
  getAll: async (): Promise<Room[]> => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch rooms");
    return res.json();
  },

  create: async (payload: CreateRoomPayload): Promise<{ id: number }> => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create room");
    return res.json();
  },

  update: async (id: number, payload: UpdateRoomPayload): Promise<void> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update room");
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete room");
  },
};