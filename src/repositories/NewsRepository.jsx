import { ApiClient } from "../api/axios";

export function NewsRepository() {
  // CSRF保護の初期化
  // const csrf = () => ApiClient.get("/sanctum/csrf-cookie");

  const getNewsList = async (conditions) => {
    try {
      const getLists = () =>
        ApiClient.get(
          "/news?offset=" + conditions.offset + "&limit=" + conditions.limit,
        );
      const { data } = await getLists();
      return data.response;
    } catch (e) {
      // TODO エラー処理はどうする?
      if (e.response && e.response.status === 422) {
        console.log(e);
      }
    }
  };

  return { getNewsList };
}
