import {Footer} from "@/src/components/footer/Footer";
import {Header} from "@/src/components/header/Header";
import {SPageWrapperContainer} from "@/src/components/page-wrapper/styles/SPageWrapperContainer";
import {RootState} from "@/store";
import React, {PropsWithChildren} from 'react';
import {useSelector} from "react-redux";
import {SPageWrapper} from './styles/SPageWrapper';


export const PageWrapper: React.FC<PropsWithChildren> = ({...props}) => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <SPageWrapper>
      {user?.id && <Header/>}
      <SPageWrapperContainer>
        {props.children}
      </SPageWrapperContainer>
      <Footer/>
    </SPageWrapper>
  )
}
