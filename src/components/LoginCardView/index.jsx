import { Row, Col, Button } from 'react-bootstrap'
import { ArrowLeft, Lock } from 'lucide-react'
import 'bootstrap/dist/css/bootstrap.min.css'

export const LoginCardView = ({
  title = 'Welcome Back',
  subtitle = 'Sign in to your account to continue',
  children
}) => {
  return (
    <div className="vh-100 overflow-hidden">
      <Row className="g-0 h-100">
        <Col lg={6} className="d-none d-lg-block position-relative">
          <div
            className="h-100 d-flex align-items-center justify-content-center text-white position-relative"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background: 'rgba(0,0,0,0.2)'
              }}
            ></div>
            <div className="text-center position-relative" style={{ zIndex: 10 }}>
              <div
                className="mx-auto mb-4 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '128px',
                  height: '128px',
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Lock size={64} className="text-white" />
              </div>
              <h2 className="display-4 fw-bold mb-4">Secure Access</h2>
              <p className="lead text-light fs-5 mb-5">
                Your trusted platform for secure authentication and seamless user experience.
              </p>
              <div className="d-flex justify-content-center align-items-center">
                <div
                  className="rounded-circle bg-white bg-opacity-50 me-2"
                  style={{ width: '8px', height: '8px' }}
                ></div>
                <div className="rounded-pill bg-white me-2" style={{ width: '32px', height: '8px' }}></div>
                <div className="rounded-circle bg-white bg-opacity-50" style={{ width: '8px', height: '8px' }}></div>
              </div>
            </div>
          </div>
        </Col>

        <Col lg={6} className="d-flex align-items-center justify-content-center bg-light">
          <div className="w-90" style={{ padding: '2rem', width: '80%' }}>
            <div className="text-center mb-5">
              <h1 className="h1 fw-bold text-dark mb-3">{title}</h1>
              <p className="text-muted fs-6">{subtitle}</p>
            </div>

            {children}

            <div className="text-center">
              <Button variant="link" className="text-muted text-decoration-none d-inline-flex align-items-center">
                <ArrowLeft size={16} className="me-2" />
                Back to Homepage
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default LoginCardView
