import React from 'react';
import clsx from 'clsx';
import { TerminalChatBot } from '../../../components/TerminalChatBot';

export default function FooterLayout({style, links, logo, copyright}) {
  return (
    <>
      <TerminalChatBot />
      <footer
        className={clsx('footer', {
          'footer--dark': style === 'dark',
        })}
        style={{ marginBottom: '300px' }}
      >
        <div className="container container-fluid">
          {links}
          {(logo || copyright) && (
            <div className="footer__bottom text--center">
              {logo && <div className="margin-bottom--sm">{logo}</div>}
              {copyright}
            </div>
          )}
        </div>
      </footer>
    </>
  );
}
