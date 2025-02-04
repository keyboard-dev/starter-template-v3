import React from 'react';
import NavbarItem from '@theme-original/NavbarItem';
import CustomGitHubAuth from './CustomGitHubAuth';

export default function NavbarItemWrapper(props) {
  if (props.type === 'custom-github-auth') {
    return <CustomGitHubAuth {...props} />;
  }
  return <NavbarItem {...props} />;
} 