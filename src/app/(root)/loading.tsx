import Spinner from "@/Components/Spinner";

const loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100dvh-5rem)]">
      <Spinner />
    </div>
  );
};

export default loading;
