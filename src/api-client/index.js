/*
 * @file: index.js
 * @description: It Contain rest functions for api call .
 * @author: Nk
 */
import axios from "axios";
import { setAuthorizationToken } from "../auth";
import { logout } from "../context/actions/user";
const BASE_URL = "http://localhost:8000/api";
const langHeaders = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'en-US',
    },
  };
};
var logoutErrFlag = false;
class ApiClient {
  static post(url, params, token = false, dispatch = null) {
    if (token) setAuthorizationToken(axios, token);
    return new Promise((resolve, reject) => {
      const baseURL = `${BASE_URL}/${url}`
      axios
        .post(baseURL, JSON.stringify(params), langHeaders())
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          if (error && error.response) {
            if (error.response.statusText === 'Unauthorized') {
              dispatch(logout());
              window.location.href = '/login';
            }
            reject(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static put(url, params, token = false, dispatch = null) {
    if (token) setAuthorizationToken(axios, token);
    return new Promise(function (resolve, reject) {
      const baseURL = `${BASE_URL}/${url}`
      axios
        .put(baseURL, JSON.stringify(params), langHeaders())
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          if (error && error.response && !logoutErrFlag) {
            reject(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static get(url, params, token = false, dispatch = null) {
    if (token) setAuthorizationToken(axios, token);
    let baseURL
    if (params) {
      let query = JSON.stringify(params);
      baseURL = `${BASE_URL}/${url}?${query}`
    } else {
      baseURL = `${BASE_URL}/${url}`
    }
    return new Promise(function (resolve, reject) {
      axios
        .get(baseURL, langHeaders())
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          if (error && error.response) {
            if (error.response.statusText === 'Unauthorized' && dispatch) {
              dispatch(logout());
              window.location.href = '/login';
            }
            reject(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static fetch(url, params, token = null, dispatch = null) {
    setAuthorizationToken(axios, token);
    let query = JSON.stringify(params);
    url = query ? `${url}?${query}` : url;
    return new Promise(function (fulfill, reject) {
      axios
        .get(url, langHeaders())
        .then(function (response) {
          // toast.dismiss();
          fulfill(response.data);
        })
        .catch(function (error) {
          if (error && error.response && !logoutErrFlag) {
            logout(error, dispatch);
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static patch(url, params, token = null, dispatch = null) {
    return new Promise(function (fulfill, reject) {
      axios
        .patch(url, JSON.stringify(params), langHeaders())
        .then(function (response) {
          // toast.dismiss();
          fulfill(response.data);
        })
        .catch(function (error) {
          if (error && error.response && !logoutErrFlag) {
            logout(error, dispatch);
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static delete(url, params, token = false, dispatch = null) {
    if (token) setAuthorizationToken(axios, token);
    return new Promise(function (resolve, reject) {
      const baseURL = `${BASE_URL}/${url}`
     const deleteRequest = { data: params }
      axios
        .delete(baseURL, deleteRequest, langHeaders())
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          if (error && error.response) {
            if (error.response.statusText === 'Unauthorized') {
              dispatch(logout());
              window.location.href = '/login';
            }
            reject(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }
  /*************** Form-Data Method without file for Create ***********/
  static _postFormData(url, params, token = null, dispatch = null) {
    if (token) setAuthorizationToken(axios, token);
    return new Promise(function (resolve, reject) {
      const baseURL = `${BASE_URL}/${url}`
      axios
        .post(baseURL, params, {
          ...langHeaders(),
          ...{ headers: { "Content-Type": "multipart/form-data" } }
        })

        .then(function (response) {
          // toast.dismiss();
          resolve(response.data);
        })
        .catch(function (error) {
          if (error && error.response) {
            if (error.response.statusText === 'Unauthorized') {
              dispatch(logout());
              window.location.href = '/login';
            }
            reject(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }


  /*************** Form-Data Method for Update ***********/
  static _putFormData(url, params, token = null, dispatch = null) {
    if (token) setAuthorizationToken(axios, token);
    return new Promise(function (resolve, reject) {
      const baseURL = `${BASE_URL}/${url}`
      axios
        .put(baseURL, params, {
          ...langHeaders(),
          ...{ headers: { "Content-Type": "multipart/form-data" } }
        })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error, 'error');
          if (error && error.response) {
            // if (error.response.statusText === 'Unauthorized') {
            //   dispatch(logout());
            //   window.location.href = '/login';
            // }
            reject(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  /*************** Form-Data post with file Method ***********/
  static postFormData(url, body, token = null, dispatch = null) {

    setAuthorizationToken(axios, token);
    return new Promise((fulfill, reject) => {
      axios
        .post(url, body, {
          ...langHeaders(),
          ...{ headers: { "Content-Type": "multipart/form-data", slug: localStorage.getItem('SLUG') ? localStorage.getItem('SLUG') : '' } }
        })

        .then((response) => {
          fulfill(response.data);
        })
        .catch((error) => {
          if (error && error.response && !logoutErrFlag) {
            logout(error, dispatch);
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  /*************** Form-Data update with file Method ***********/
  static putFormData(url, body, token = null, dispatch = null) {
    setAuthorizationToken(axios, token);
    return new Promise((fulfill, reject) => {
      axios.put(url, body, {
        ...langHeaders(),
        ...{ headers: { "Content-Type": "multipart/form-data", slug: localStorage.getItem('SLUG') ? localStorage.getItem('SLUG') : '' } }
      }).then((response) => {
        fulfill(response.data);
      }).catch((error) => {
        if (error && error.response && !logoutErrFlag) {
          logout(error, dispatch);
          fulfill(error.response.data);
        } else {
          reject(error);
        }
      });
    });
  }
}

export default ApiClient;
