import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import TableSkeleton from "../../components/TableSkeleton";



export default function HistoryPage() {
  const [history, sethistory] = useState<String[]>([]);
  const componentRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_HISTORY_API}?page=${currentPage}`
      );
      sethistory(data.data);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevState) => prevState + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevState) => prevState - 1);
    }
  };

  function convertToRupiah(amountInRupiah: number){
    const formattedAmount = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amountInRupiah).replace(/,00$/, '');
    return formattedAmount;
}

  return (
    <div className="flex flex-col px-6 py-5 items-center justify-center">
      <div className="relative overflow-x-auto border-1 border-black shadow-md sm:rounded-lg">
        <table className="w-full mt-3 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-gray-700 text-center font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3">
                Kode Produk
              </th>
              <th scope="col" className="py-3">
                Nama PDAM
              </th>
              <th scope="col" className="py-3">
                Nominal Pembayaran
              </th>
              <th scope="col" className="py-3">
                Biaya Admin
              </th>
              <th scope="col" className="py-3">
                Total Bayar
              </th>
              <th scope="col" className="py-3">
                Keterangan
              </th>
              <th scope="col" className="py-3">
                Download Struk
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableSkeleton />
            ) : (
              history.map((data: any) => (
                <tr
                  key={data.id}
                  className="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700"
                >
                <th
                    scope="row"
                    className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.kodeproduk}
                  </th>
                  <th
                    scope="row"
                    className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.pdamname}
                  </th>
                  <td className="px-10 py-4 max-w-[200px] break-words">
                    {convertToRupiah(Number(data.nominal))}
                  </td>
                  <td className="px-10 py-4 max-w-[200px] break-words">
                    {convertToRupiah(Number(data.biayaadmin))}
                  </td>
                  <td className="px-10 py-4">
                    {convertToRupiah(Number(data.totalbayar))}
                  </td>
                  <td className="px-10 py-4">
                    {data.keterangan}
                  </td>
                  <td className="px-10 py-4">
                    <a
                      href={data.urlstruk}
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Download Struk
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-3 mb-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            type="button"
            className="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-blue-700 hover:text-white px-3"
          >
            <div className="flex flex-row align-middle">
              <svg
                className="w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="ml-2">Prev</p>
            </div>
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            type="button"
            className="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-blue-700 hover:text-white px-3"
          >
            <div className="flex flex-row align-middle">
              <span className="mr-2">Next</span>
              <svg
                className="w-5 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}