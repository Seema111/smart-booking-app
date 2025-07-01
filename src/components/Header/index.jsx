import { useNavigate, Link, NavLink } from 'react-router-dom'
import HomeCareLogo from '../../assets/images/logo_old_age.png'
import { deleteCookie, getCookie } from '../../utils/setCookie'
import { toast } from 'react-toastify'
import './style.scss'

const navItems = [
  { to: '/', label: 'Home', icon: 'bi-house-door' },
  { to: '/caregiving', label: 'Caregiving', icon: 'bi-person-wheelchair' },
  { to: '/lab-services', label: 'Lab Services', icon: 'bi-hospital' },
  { to: '/about-us', label: 'About Us', icon: 'bi-bookmark-heart' },
  { to: '/help', label: 'Help', icon: 'bi-patch-question' },
]

const accountItems = [
  { to: '/my-account', label: 'My Account', icon: 'bi-person-lines-fill' },
  { to: '/my-appointments', label: 'My Appointments', icon: 'bi-journal-medical' },
  { to: '/register', label: 'Register New User', icon: 'bi-person-plus' },
]

const Header = () => {
  const navigate = useNavigate()
  const isUserLoggedIn = Boolean(getCookie('token'))
  const username = getCookie('username')

  const logout = () => {
    deleteCookie('token')
    deleteCookie('username')
    localStorage.removeItem('book-detail')
    toast.success('Logged out successfully!')
    navigate('/login')
  }

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        background:
          'linear-gradient(90deg, #2e8b57 0%, #3cb371 50%, #66cdaa 100%)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        fontWeight: '500',
      }}
    >
      <div className="container-fluid main-header-nav">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center text-white"
          style={{ gap: '0.75rem' }}
        >
          <img
            src={HomeCareLogo}
            alt="Prana Home Care Logo"
            width="70"
            height="70"
            className="rounded-circle shadow"
            style={{ objectFit: 'cover' }}
          />
          <span
            className="homecare-name fw-bold fs-4"
            style={{ letterSpacing: '0.1rem', textShadow: '1px 1px 2px #00000066' }}
          >
            Prana Home Care
          </span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ filter: 'invert(1)' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-3">
            {navItems.map(({ to, label, icon }) => (
              <li key={to} className="nav-item">
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center text-white px-3 rounded-pill transition ${
                      isActive ? 'active-link' : 'link-hover'
                    }`
                  }
                >
                  <i className={`bi ${icon} me-2 fs-5`}></i>
                  <span className="fs-6">{label}</span>
                </NavLink>
              </li>
            ))}

            {isUserLoggedIn ? (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle d-flex align-items-center btn btn-link text-white px-3 rounded-pill"
                  id="accountDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                  style={{ userSelect: 'none' }}
                >
                  <i className="bi bi-person-lock fs-5 me-2"></i>
                  <span className="fs-6">{username || 'Account'}</span>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end shadow-lg"
                  aria-labelledby="accountDropdown"
                  style={{ minWidth: '200px', borderRadius: '0.6rem' }}
                >
                  {accountItems.map(({ to, label, icon }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="dropdown-item d-flex align-items-center"
                      >
                        <i className={`bi ${icon} me-3 fs-5 text-success`}></i>
                        <span>{label}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="dropdown-item d-flex align-items-center text-danger fw-semibold"
                      type="button"
                    >
                      <i className="bi bi-box-arrow-right me-3 fs-5"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className="nav-link d-flex align-items-center text-white px-3 rounded-pill link-hover"
                >
                  <i className="bi bi-person-lock fs-5 me-2"></i>
                  <span className="fs-6">Login</span>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
