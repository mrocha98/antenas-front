import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaSatelliteDish,
  FaCuttlefish,
  FaBriefcase,
  FaUserNinja,
  FaUserGraduate,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Typography } from '@material-ui/core';
import './styles.scss';

export default function Menu() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo">
          <div className="nav-link">
            <Typography
              component="span"
              variant="h5"
              className="link-text logo-text"
            >
              Antenas
            </Typography>
            <FaSatelliteDish />
          </div>
        </li>

        <li className="nav-item">
          <NavLink to="/cadi" className="nav-link">
            <FaCuttlefish />
            <Typography component="span" className="link-text">
              CADI
            </Typography>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/po" className="nav-link">
            <FaBriefcase />
            <Typography component="span" className="link-text">
              Empresário
            </Typography>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/professor" className="nav-link">
            <FaUserGraduate />
            <Typography component="span" className="link-text">
              Professor
            </Typography>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/student" className="nav-link">
            <FaUserNinja />
            <Typography component="span" className="link-text">
              Aluno
            </Typography>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/" exact className="nav-link">
            <FaSignOutAlt />
            <Typography component="span" className="link-text">
              Sair
            </Typography>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
