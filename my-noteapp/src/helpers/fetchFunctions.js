export const fetchFunction = async (api, body) => {
  try {
    const res = await fetch(api, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    });

    return await res.json();
  } catch (e) {
    console.log(e);
  }
};
export const fetchFunction2 = async (api, type) => {
  // console.log(type,body)
  try {
    const res = await fetch(api, {
      method: type,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

export const fetchFunction3 = async (api, body) => {
  try {
    const res = await fetch(api, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(body)
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};
