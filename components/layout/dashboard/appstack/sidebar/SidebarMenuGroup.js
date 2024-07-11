import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function SidebarMenuGroup(props) {
  const {
    header, title, active, setActive, titleIcon: TitleIcon, titlePath, children, value, permissions,
  } = props;

  const router = useRouter();
  const { userDetails: { roles } } = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState('collapsed');

  const renderChildren = children.map((child) => {
    const {
      title: childTitle, path, value: childValue, childPermissions,
    } = child;
    if (childPermissions && childPermissions.length) {
      return (
        <div>
          {
            childPermissions.some((role) => roles  &&  roles.includes(role))
              ? (
                <li className="sidebar-item">
                  <Link href={path} passHref>
                    <a className={`sidebar-link ${router.asPath.includes(path) ? 'active' : ''}`}>
                      <span className="align-middle" depth={1}>{childTitle}</span>
                    </a>
                  </Link>
                </li>
              ) : ''
          }
        </div>
      );
    }
    return (
      <div>
        <li className="sidebar-item">
          <Link href={path} passHref>
            <a className={`sidebar-link ${router.asPath.includes(path) ? 'active' : ''}`}>
              <span className="align-middle" depth={1}>{childTitle}</span>
            </a>
          </Link>
        </li>
      </div>
    );
  });

  if (children.length) {
    if (permissions && permissions.length) {
      return (
        <div>
          {permissions.some((role) => roles  && roles.includes(role))
            ? (
              <div>
                {header && <li className="sidebar-header">{header}</li>}
                <li className={`sidebar-item ${active.includes(value) ? 'active' : 'collapsed'}`}>
                  <a className={`sidebar-link ${active.includes(value) ? '' : collapsed}`} data-bs-toggle="collapse" onClick={() => { setActive(titlePath.split('/')); setCollapsed('collapsed'); }}>
                    <TitleIcon className="feather align-middle" />
                    <span className="align-middle" depth={1}>{title}</span>
                  </a>
                  <Collapse in={active.includes(value) || false}>
                    <ul className="sidebar-dropdown list-unstyled">
                      {renderChildren}
                    </ul>
                  </Collapse>
                </li>
              </div>
            ) : ''}
        </div>
      );
    }
    return (
      <div>
        <div>
          {header && <li className="sidebar-header">{header}</li>}
          <li className={`sidebar-item ${active.includes(value) ? 'active' : 'collapsed'}`}>
            <a className={`sidebar-link ${active.includes(value) ? '' : collapsed}`} data-bs-toggle="collapse" onClick={() => { setActive(titlePath.split('/')); setCollapsed('collapsed'); }}>
              <TitleIcon className="feather align-middle" />
              <span className="align-middle" depth={1}>{title}</span>
            </a>
            <Collapse in={active.includes(value) || false}>
              <ul className="sidebar-dropdown list-unstyled">
                {renderChildren}
              </ul>
            </Collapse>
          </li>
        </div>
      </div>
    );
  }

  return (
    <div>
      {header && <li className="sidebar-header">{header}</li>}
      <li className={`sidebar-item ${active.includes(value) ? 'active' : 'collapsed'}`}>
        <Link href={titlePath} passHref>
          <a className="sidebar-link">
            <TitleIcon className="feather align-middle" />
            <span className="align-middle" depth={1}>{title}</span>
          </a>
        </Link>
      </li>
    </div>
  );
}
