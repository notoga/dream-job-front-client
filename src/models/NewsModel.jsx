import { NewsRepository } from "../repositories/NewsRepository";

export function NewsFactory() {
  const list = (conditions) => {
    return NewsRepository().getNewsList(conditions);
  };

  const info = () => {
    return NewsRepository().getNewsList();
  };

  return { list, info };
}
