import React from 'react';
import { Link, Navbar, NavLeft, Icon, NavTitle, NavRight } from 'zmp-framework/react';

const NavbarBack = ({ title, linkRight, labelRight }) => {
  return (
    <Navbar>
      <NavLeft displayName="zmp-navleft">
        <Link className="no-ripple" noLinkClass back>
          <Icon zmp="zi-arrow-left" />
        </Link>
      </NavLeft>
      <NavTitle>{title}</NavTitle>
      {linkRight && labelRight && (
        <NavRight>
          <Link href={linkRight} className="no-ripple" noLinkClass>{labelRight}</Link>
        </NavRight>
      )}
    </Navbar>
  )
}

NavbarBack.displayName = 'zmp-navbar';


export default NavbarBack;
