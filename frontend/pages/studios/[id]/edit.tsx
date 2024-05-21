import {listStudios, retrieveStudio} from "@/services/apiServices";
import StudioForm from "@/src/components/form/StudioForm";
import {PageWrapper} from "@/src/components/page-wrapper/PageWrapper";
import {StudioCreateReservation} from "@/src/components/studio-create-reservation/StudioCreateReservation";
import {StudioDetails} from "@/src/components/studio-details/StudioDetails";
import {IStudio} from "@/src/constants/types";
import {RootState} from "@/store";
import {GetStaticPaths, GetStaticProps} from "next";
import {useRouter} from "next/router";
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";


const StudioPage: React.FC = () => {
  const router = useRouter();
  const [studio, setStudio] = useState<IStudio | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {user} = useSelector((state: RootState) => state.user);
  
  useEffect(() => {
    (user && user?.user_type !== 'studio_owner') && router.replace('/404');
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const {id} = router.query;
        const params = {
          id: +(id as string),
        };
        
        const {data} = await retrieveStudio({params});
        setStudio(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
      setLoading(false);
    }
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady, router.query]);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  return studio
    ? <PageWrapper>
      <StudioForm isEdit initialValues={{
        name: studio.name,
        location: studio.location,
        capacity: studio.capacity,
        images: studio.images,
        id: studio.id
      }}/>
    </PageWrapper>
    : <div>Loading</div>
  
}

export default StudioPage;
