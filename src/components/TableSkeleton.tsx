function TableSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <tr
          key={item}
          className="bg-white  border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 max-w-[150px] mb-2.5"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 max-w-[150px] mb-2.5"></div>
          </td>
          <td className="px-6 py-4 text-center">
            <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 max-w-[150px] mb-2.5"></div>
          </td>
          <td className="px-6 py-4 text-center">
            <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 max-w-[150px] mb-2.5"></div>
          </td>
          <td className="px-6 py-4 text-center">
            <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 max-w-[150px] mb-2.5"></div>
          </td>
          <td className="px-6 py-4 text-center">
            <div className="h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 max-w-[150px] mb-2.5"></div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default TableSkeleton;
