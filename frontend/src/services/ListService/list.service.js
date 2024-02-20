import http from '../http-common';

const getToken = () => {
  const now = new Date(Date.now()).getTime();
  const thirtyMinutes = 1000 * 60 * 60;
  const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
  if (timeSinceLastLogin < thirtyMinutes) {
    return localStorage.getItem("token");
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("lastLoginTime");
    return null;
  }
};

const getLists = () => {
  return http.get('/lists');
};

// const getList = (id) => {
//   return http.get(`/lists/${id}`);
// };

const createList = (data) => {
  return http.post('/lists', data, {
    headers: {
      ...http.defaults.headers.common,
      Authorization: getToken()
    }
  })
};

// const increaseNumberList = (id) => {
//   return http.put(`/lists/${id}`);
// };
// const decreaseNumberList = (id) => {
//   return http.put(`/lists/${id}`);
// };

const getTicket = (id) => {
  return http.put(`/lists/${id}`);
};

const deleteList = (id) => {
  return http.delete(`/lists/${id}`, {
    headers: {
      ...http.defaults.headers.common,
      Authorization: getToken()
    }
  })
};

const ListService = {
  getLists,
  createList,
  deleteList,
  getTicket
};

export default ListService;