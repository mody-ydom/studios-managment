import React,{PropsWithChildren} from 'react';
import {S{{ properCase name }} } from './styles/S{{ properCase name }}';

interface I{{ properCase name }}{

}

export const {{ properCase name }}: React.FC<PropsWithChildren<I{{ properCase name }}>> = ({...props}) => {
  console.log(`{{properCase name}} props: `, props);
  return (
    <S{{properCase name}}>
      {props.children}
    </S{{properCase name}}>
  )
}
