import http from '../http-common';


const getLists = () => {
  return http.get('/lists');
};

// const getList = (id) => {
//   return http.get(`/lists/${id}`);
// };

const createList = (data) => {
  return http.post('/lists', data);
};

// const updateActivity = (id, data) => {
//   return http.put(`/activities/${id}`, data);
// };

const deleteList = (id) => {
  return http.delete(`/lists/${id}`);
};

const ListService = {

};

export default ActivityService;