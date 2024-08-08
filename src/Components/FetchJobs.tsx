// pages/index.tsx
import { GetServerSideProps, NextPage } from 'next';


  
  export const fetchData = async (url: string): Promise<Object[]> => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data: Object[] = await res.json();
    return data;
  };

interface PageProps {
  data: Object[] | null;
  error: string | null;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  try {
    const data = await fetchData('http://51.20.37.103:8000/jobs/');
    return {
      props: {
        data,
        error: null,
      },
    };
  } catch (error: any) {
    return {
      props: {
        data: null,
        error: error.message,
      },
    };
  }
};

const Page: NextPage<PageProps> = ({ data, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div style={{color:'red'}}>Loading...</div>;
  }

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Page;