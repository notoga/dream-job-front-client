import axios from "axios";

// axiosの初期設定
export const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
  withXSRFToken: true,
});

// レスポンスのエラー判定処理
ApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    // switch (error?.response?.status) {
    //   case 401:
    //     break;
    //   case 404:
    //     break;
    //   default:
    //     console.log("== internal server error")
    // }
    //
    // const errorMessage = (error.response?.data?.message || "").split(",")
    // throw new Error(errorMessage)
  },
);

// リクエスト処理の共通化
ApiClient.interceptors.request.use(async (request) => {
  // アクセストークンを取得し共通headerに格納
  // request.headers["access-token"] = getAccessToken();
  return request;
});
