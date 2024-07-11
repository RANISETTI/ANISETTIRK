import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { Key, LogOut, Settings, User } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutService,
  logoutProxyService,
} from "../../../../../services/auth/logout";
import { loginFailed } from "../../../../auth/slices/LoginSlice";

export default function NavbarUser() {
  const user = useSelector((state) => state.user);
  const {
    accessToken,
    userDetails: {
      first_name: firstName,
      email,
      previous_login: previousLogin,
      type,
    },
  } = user;
  const router = useRouter();

  const dispatch = useDispatch();

  const logout = () => {
    if (user.sessionid) {
      // parichay user
      logoutProxyService(user.accessToken, user.userString, user.sessionid)
        .then((res) => {
          console.log("res frim logout", res);
        })
        .finally(() => {
          //     dispatch(loginFailed());
        });
    }
    // logoutService(accessToken)
    //   .finally(() => {
    //     dispatch(loginFailed());
    //     if (router.pathname !== '/') {
    //       router.push('/');
    //     } else {
    //       router.reload();
    //     }
    //   });
    console.log("user details ", user);
  };

  return (
    <Dropdown className="nav-item" align="end">
      <span className="d-inline-block d-sm-none">
        <Dropdown.Toggle as="a" className="nav-link">
          <Settings size={18} className="align-middle" />
        </Dropdown.Toggle>
      </span>
      <span className="d-none d-sm-inline-block">
        <Dropdown.Toggle as="a" className="nav-link">
          <img
            src="/images/avatar-default.png"
            width={25}
            className="rounded-circle me-1"
            alt={firstName || email}
          />
          <span className="text-dark">{firstName || email}</span>
        </Dropdown.Toggle>
      </span>
      <Dropdown.Menu drop="flex-end">
        {/*   <Dropdown.Item>
          <User size={18} className="align-middle me-2" />
          Profile
        </Dropdown.Item>
        <Dropdown.Item>
          <PieChart size={18} className="align-middle me-2" />
          Analytics
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Settings & Privacy</Dropdown.Item>
        <Dropdown.Item>Help</Dropdown.Item>
  */}
        {type === "VENDOR" && (
          <Dropdown.Item onClick={() => router.push("/dashboard/my-profile")}>
            <User size={18} className="align-middle me-2" />
            My Profile
          </Dropdown.Item>
        )}
        <Dropdown.Item
          onClick={() => router.push("/dashboard/change-password")}
        >
          <Key size={18} className="align-middle me-2" />
          Change Password
        </Dropdown.Item>
        <Dropdown.Item onClick={logout}>
          <LogOut size={18} className="align-middle me-2" />
          Sign out
        </Dropdown.Item>
        <Dropdown.Divider />
        {previousLogin ? (
          <Dropdown.Item>
            <p className="last-login">
              Last login: &nbsp;
              {moment(previousLogin).format("DD-MMM-YYYY hh:mm a")}
            </p>
          </Dropdown.Item>
        ) : (
          ""
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
