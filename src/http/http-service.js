
const structureQueryParams = query => {
    let queryStrings = "?";
    const keys = Object.keys(query);
    keys.forEach((key, index) => {
      queryStrings += key + "=" + query[key];
      if (query[keys[index]]) {
        queryStrings += "&";
      }
    });
    return queryStrings;
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
            Accept: "application/json",
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