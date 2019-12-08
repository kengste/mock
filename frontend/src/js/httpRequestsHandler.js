/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */

const buildJSONForGETRequest = () => {
  return {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
};

const buildJSONForPOSTRequest = params => ({
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(params)
});

class HttpRequestsHandler {
  async getData(url) {
    const requestOptions = buildJSONForGETRequest();
    const prepended = `${window.location.protocol}//${window.location.host}`;
    const response = await fetch(`${prepended}/api/${url}`, requestOptions);
    return response.json();
  }

  async postData(url, data) {
    const requestOptions = buildJSONForPOSTRequest(data);
    const prepended = `${window.location.protocol}//${window.location.host}`;
    const response = await fetch(`${prepended}/api/${url}`, requestOptions);
    if ((response || {}).statusText === "OK") {
      return response;
    }
    return response.json();
  }
}

export const httpRequestsHandler = new HttpRequestsHandler();
