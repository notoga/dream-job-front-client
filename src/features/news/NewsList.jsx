/* 責務はAPI通信をしデータをstateに格納しておく */
import { useEffect, useState } from "react";
import { NewsFactory } from "../../models/NewsModel";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import NewsTypeEnum from "../../enums/NewsType";

export default function NewsList() {
  const limit = import.meta.env.VITE_PAGINATION_LIMIT;
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);

  // TODO useCallbackで最適化出来そう?!
  const handleGetItems = (conditions) => {
    setIsLoading(true);
    NewsFactory()
      .list({
        limit: limit,
        offset: conditions.offset,
      })
      .then((req) => {
        setNews(req.data);
        setTotalCount(req.total_count);
        setPage(conditions.page);
        setIsLoading(false);
      })
      .catch(() => {
        setNews([]);
        setTotalCount(0);
        setPage(0);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleGetItems({ offset: 0, page: 0 });
  }, []);

  return !isLoading ? (
    <>
      {
        <Pagination
          totalCount={totalCount}
          page={page}
          perPage={limit}
          handleGetItems={handleGetItems}
        />
      }
      <p>全件 : {totalCount}件</p>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Body
              </th>
              <th scope="col" className="px-6 py-3">
                publication date
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {news.map((item, key) => (
              <tr
                key={key}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.id}
                </th>
                <td className="px-6 py-4">{NewsTypeEnum[item.type]}</td>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">{item.body}</td>
                <td className="px-6 py-4">{item.publication_start_date}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
}
