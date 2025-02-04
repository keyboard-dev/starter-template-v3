import React from 'react';
import NavbarItem from '@theme-original/NavbarItem';
import CustomGitHubAuth from './CustomGitHubAuth';
import CustomCodespacesNavbarItem from './CustomCodespacesNavbarItem';
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';

const ComponentTypesWithCustom = {
  ...ComponentTypes,
  'custom-github-auth': CustomGitHubAuth,
  'custom-codespaces': CustomCodespacesNavbarItem,
};

export default function NavbarItemWrapper(props) {
  if (props.type === 'custom-github-auth') {
    return <CustomGitHubAuth {...props} />;
  }
  if (props.type === 'custom-codespaces') {
    return <CustomCodespacesNavbarItem {...props} />;
  }
  return <NavbarItem {...props} />;
}

export { ComponentTypesWithCustom }; 