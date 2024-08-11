import axios from "axios";
export const LOCATOR = {
  backend: process.env.BACKEND_URL,
};
export const Get = (url: string, accessToken: string | undefined) => {
  consolePrint(url, null);

  return accessToken ?
      axios.get(
        url,
        {headers: { Authorization: `Bearer ${accessToken}` }}
      ) :
    axios.get(url);
}

export const Post = (url: string, data: any) => {
  consolePrint(url, data);
  return axios.post(url, data);
};

const consolePrint = (url: string, data: any): void => {
  console.log(`url`);
  console.log(url);
  console.log(`data`);
  console.log(data);
}
