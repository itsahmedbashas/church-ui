import api from "./AxiosConfigs";

export const AdminAPI = {
  // used to get Admin Look Up values
  getAdminLookup: async (id, searchText) => {
    let url = `/admin?id=${id}`;
    if (searchText && searchText != null) {
      url = url + `&searchText=${searchText}`;
    }

    const response = await api.request({
      url: url,
      method: "GET",
    });
    return response.data;
  },
  // used to save Admin Lookup values
  saveAdminLookup: async (lookupDetails) => {
    const response = await api.request({
      url: `/admin`,
      method: "POST",
      data: lookupDetails,
    });
    return response.data;
  },
  // used to update Admin Lookup values
  updateAdminLookup: async (lookupDetails) => {
    const response = await api.request({
      url: `/admin`,
      method: "PUT",
      data: lookupDetails,
    });
    return response.data;
  },
  deleteAdminLookup: async (lookupDetails) => {
    const response = await api.request({
      url: `/admin/${lookupDetails.lookupId}/${lookupDetails.id}`,
      method: "DELETE",
    });
    return response.data;
  },
};
