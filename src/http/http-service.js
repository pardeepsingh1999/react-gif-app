
const structureQueryParams = query => {
    let queryStrings = "?";
    const keys = Object.keys(query);
    keys.forEach((key, index) => {
      queryStrings += key + "=" + query[key];
      if (query[keys[index+1]] || query[keys[index+1]] === 0) {
        queryStrings += "&";
      }
    });
    return queryStrings
};

export const makeGetRequest = async (
    url,
    params = null,
    query = null
    ) => {

        let queryString = "";

        if (query) {
            queryString = structureQueryParams(query);
        }
        console.log(queryString,'queryString')
        let headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        
        return new Promise((resolve, reject) => {
        try {
            fetch(url + queryString, {
            method: "GET",
            headers: headers
            })
            .then(res => res.json())
            .then(jsonResponse => {
                if (jsonResponse.meta.status === 200) { // change this condition according to response structure
                    resolve(jsonResponse);
                } else if(jsonResponse.meta.status === 404) {
                    // console.log(jsonResponse);
                    reject(jsonResponse);
                } else {
                    // console.log(jsonResponse);
                    reject(jsonResponse);
                }
            })
            .catch(e => {
                console.log("XHR GET Error: ", e);
                reject(e);
            });
        } catch (e) {
            console.log(e);
            reject();
        }
    });
};

export const makePostRequest = async (
    url,
    formData,
    query = null
  ) => {

    // let headers  = {
    //     'Content-Type': 'multipart/form-data'
    // }

    // headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
    // headers["Access-Control-Allow-Credentials"] = "true";

    let queryString = "";

    if (query) {
        queryString = structureQueryParams(query);
    }
    
    return new Promise((resolve, reject) => {
      try {
        fetch(url + queryString, {
          method: "POST",
          mode: 'no-cors',
          body: formData
        })
        .then(
            res => res.json(),
            error => {
                reject(error);
            }
        )
        .then(jsonResponse => {
                console.log('post res ', jsonResponse)
                if (jsonResponse.meta.status === 200) { // change this condition according to response structure
                    resolve(jsonResponse);
                } else if(jsonResponse.meta.status === 404) {
                    // console.log(jsonResponse);
                    reject(jsonResponse);
                } else {
                    // console.log(jsonResponse);
                    reject(jsonResponse);
                }
        })
        .catch(error => {
            reject(error);
        });
      } catch (e) {
            console.log(e);
            reject();
      }
    });
};