import axios from "axios";
import SERVER_URL from "../../config";

class UserDataService {
  getAll() {
    let headers =  {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    return axios({ url: `${SERVER_URL}/users`, headers: headers, method: 'GET'});
  }

  get(id) {
    let headers =  {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    return axios({ url: `${SERVER_URL}/users/${id}`, headers: headers, method: 'GET'});
  }

  create(data) {
    let headers =  {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    return axios({ url: `${SERVER_URL}/users/`, data: data, headers: headers, method: 'POST'});
  }

  update(id, data) {
    let headers =  {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    return axios({ url: `${SERVER_URL}/users/${id}`, data: data, headers: headers, method: 'PUT'});
  }

  delete(id) {
    let headers =  {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    return axios({ url: `${SERVER_URL}/users/${id}`, headers: headers, method: 'DELETE'});
  }

  deleteAll() {
    let headers =  {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    return axios({ url:`${SERVER_URL}/users`, headers: headers, method: 'DELETE'});
  }
<<<<<<< Updated upstream

<<<<<<< Updated upstream
  login(data) {
    return http.post(`/login`, data);
  }

=======
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
}

export default new UserDataService();