import apiClient from "../../../shared/services/apliClient";



export const getAllContacts = async () => {

  const response = await apiClient.get("/HotelContact");

  return response.data;
};

export const createContact = async (
  contact: {
    type: string;
    contact: string;
  }
) => {
  const response =
    await apiClient.post(
      "/HotelContact",
      contact
    );

  return response.data;
};


export const updateContact = async (
  id: number,
  contact: {
    type: string;
    contact: string;
  }
) => {

  const response = await apiClient.put(
    `/HotelContact/${id}`,
    contact
  );

  return response.data;
};

export const deleteContact = async (
  id: number
) => {

  await apiClient.delete(
    `/HotelContact/${id}`
  );
};