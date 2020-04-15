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
import { Nav } from './styles';

export default function Menu() {
  return (
    <Nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo">
          <div className="nav-link">
            <span className="link-text logo-text">Antenas</span>
            <FaSatelliteDish />
          </div>
        </li>

        <li className="nav-item">
          <NavLink to="/cadi" className="nav-link">
            <FaCuttlefish />
            <span className="link-text">CADI</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/po" className="nav-link">
            <FaBriefcase />
            <span className="link-text">Empresário</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/professor" className="nav-link">
            <FaUserGraduate />
            <span className="link-text">Professor</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/student" className="nav-link">
            <FaUserNinja />
            <span className="link-text">Aluno</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            <FaSignOutAlt />
            <span className="link-text">Sair</span>
          </NavLink>
        </li>
      </ul>
    </Nav>
  );
}
