import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <>
      <div className="p-1 m-4 rounded-sm w-fit bg-blue-500 text-white font-medium text-xl">
        Hello World
      </div>
      <Pagination
        itemCount={1000}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </>
  );
}
``;
