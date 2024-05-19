import {SReservationNavLink} from "@/src/components/reservation-nav/styles/SReservationNavLink";
import Link from "next/link";
import {useRouter} from "next/router";
import React from 'react';
import {SReservationNav} from './styles/SReservationNav';

interface IReservationNav {
  links: {
    href: string,
    label: string
  }[]
}

export const ReservationNav: React.FC<IReservationNav> = ({links}) => {
  const {pathname} = useRouter();
  return (
    <SReservationNav>
      {links.map(({label, href}) =>
        <Link key={href} href={href}>
          <SReservationNavLink isActive={pathname === href}>
            {label}
          </SReservationNavLink>
        </Link>)}
    </SReservationNav>
  )
}
