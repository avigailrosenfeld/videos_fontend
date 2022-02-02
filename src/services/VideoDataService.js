import axios from "axios";
import SERVER_URL from "../../config";

class VideoDataService {
  getAll() {
    let headers =  {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    return axios({ url: `${SERVER_URL}/videos`, headers: headers, method: 'GET'});
  }

  get(id) {
    let headers =  {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    return axios({ url: `${SERVER_URL}/videos/${id}`, headers: headers, method: 'GET'});
  }

  create(data) {
    let headers =  {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    return axios({ url: `${SERVER_URL}/videos`, data: data, headers: headers, method: 'POST'});
  }

  update(id, data) {
    let headers =  {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    return axios({ url: `${SERVER_URL}/videos/${id}`, data: data, headers: headers, method: 'PUT'});
  }

  delete(id) {
    let headers =  {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    return axios({ url: `${SERVER_URL}/videos/${id}`, headers: headers, method: 'DELETE'});
  }

  deleteAll() {
    let headers =  {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    return axios({ url:`${SERVER_URL}/videos`, headers: headers, method: 'DELETE'});
  }
}

export default new VideoDataService();