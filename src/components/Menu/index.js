import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaSatelliteDish,
  FaUserAlt,
  FaBriefcase,
  FaCogs,
  FaDoorOpen,
} from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { Typography } from '@material-ui/core';
import { useAuth } from '../../contexts/auth';
import './styles.scss';

export default function Menu({ rootHash }) {
  const { signOut } = useAuth();
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
          <NavLink exact to={`/${rootHash}`} className="nav-link">
            <GoGraph />
            <Typography component="span" className="link-text">
              Dashboard
            </Typography>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to={`/${rootHash}/profile`} className="nav-link">
            <FaUserAlt />
            <Typography component="span" className="link-text">
              Perfil
            </Typography>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to={`/${rootHash}/projects`} className="nav-link">
            <FaBriefcase />
            <Typography component="span" className="link-text">
              Projetos
            </Typography>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to={`/${rootHash}/settings`} className="nav-link">
            <FaCogs />
            <Typography component="span" className="link-text">
              Configurações
            </Typography>
          </NavLink>
        </li>

        <li className="nav-item">
          <div
            className="nav-link"
            onClick={signOut}
            onKeyPress={signOut}
            role="button"
            tabIndex="0"
          >
            <FaDoorOpen />
            <Typography component="span" className="link-text">
              Sair
            </Typography>
          </div>
        </li>
      </ul>
    </nav>
  );
}
