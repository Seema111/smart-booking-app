import { motion } from 'framer-motion'
import HomeCareDashboardImg from '../../assets/images/old_ladies.jpg'
import DashboardImage from '../../assets/images/option1.jpg'
import { servicesDummyObject, testimonialsData } from '../../utils/dummyData'
import DashboardMainImage from '../../assets/images/doctor_background.png'
import { getCookie } from '../../utils/setCookie'
import './style.scss'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.15, duration: 0.6, ease: 'easeOut' }
  })
}

const Dashboard = () => {
  const storedToken = getCookie('token')

  return (
    <>
      <section>
        <motion.div
          className="about-us-hero col-12"
          style={{
            backgroundImage: `url(${DashboardMainImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </section>
      <section className="dashboard-hero py-5">
        <div className="container">
          <div className="row align-items-center gx-5">
            <motion.div
              className="col-md-6 mb-4 mb-md-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <img
                src={HomeCareDashboardImg}
                alt="Happy elders at Prana Home Care"
                className="img-fluid rounded-4 shadow-lg hero-img"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              className="col-md-6 text-md-start text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeInUp}
            >
              <h1 className="dashboard-title">Prana Home Care</h1>
              <h2 className="dashboard-subtitle">Compassion Meets Comfort</h2>
              <p className="lead">
                Welcome to Prana Home Care Elderly Care, where compassion meets comfort. Our mission is to provide
                unparalleled care and support, ensuring our beloved seniors enjoy their golden years with joy, dignity
                and peace of mind.
              </p>
              <p>
                We understand the unique needs and desires of the elderly and are committed to creating a nurturing
                environment that feels like home.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-md-start mt-3">
                <a href={storedToken ? '/caregiving' : '/login'} className="btn btn-cta btn-lg">
                  Book Your Appointment
                </a>
                {!storedToken && (
                  <a href="/login" className="align-self-center">
                    Already have an account?
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="services py-5 bg-light">
        <div className="container">
          <motion.div
            className="row justify-content-md-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="col-12 col-md-10 col-lg-8 col-xl-7 text-center">
              <h3 className="fs-4 mb-2 text-secondary text-uppercase">Our Services</h3>
              <h2 className="display-5 mb-4 fw-bold text-dark">Serving with Heart, Caring with Purpose</h2>
              <hr className="w-25 mx-auto mb-5 border-2 border-primary" />
            </div>
          </motion.div>

          <div className="row gy-4 gy-xl-0">
            {servicesDummyObject.map((service, index) => (
              <motion.div
                key={index}
                className="col-12 col-sm-6 col-xl-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                variants={fadeInUp}
              >
                <div className="card border-0 shadow-lg service-card h-100 transition-hover">
                  <div className="card-body text-center p-4 p-xxl-5">
                    {service.image ? (
                      <img src={service.image} alt="service icon" className="mb-4" height="56" width="56" />
                    ) : (
                      <i className={`${service.icon} text-primary fs-1 mb-4`}></i>
                    )}
                    <h5 className="mb-3 fw-semibold text-dark">{service.title}</h5>
                    <p className="mb-4 text-muted small">{service.text}</p>
                    <a href="/about-us" className="fw-bold text-decoration-none link-primary">
                      Learn More <i className="bi bi-arrow-right-short fs-5"></i>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="about-us-banner"
        style={{ backgroundImage: `url(${DashboardImage})` }}
        aria-label="About Prana Home Care"
      >
        <motion.h1
          className="display-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          About Prana Home Care
        </motion.h1>
      </section>

      <section className="testimonials py-5 bg-light">
        <div className="container">
          <motion.div
            className="row justify-content-center mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="col-12 text-center">
              <h3 className="fs-4 mb-2 text-secondary text-uppercase">Testimonials</h3>
              <h2 className="display-5 mb-4 fw-bold text-dark">What Our Clients Are Saying</h2>
              <hr className="w-25 mx-auto mb-5 border-2 border-primary" />
            </div>
          </motion.div>

          <div className="row gy-4">
            {testimonialsData.map(({ text, stars, name, img }, idx) => (
              <motion.div
                className="col-12 col-md-6 col-xl-4"
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeInUp}
              >
                <div className="card shadow-sm h-100 border-0 rounded-4">
                  <div className="card-body p-4 d-flex flex-column justify-content-between">
                    <div>
                      <div className="mb-3">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`bi ${i < stars ? 'bi-star-fill text-warning' : 'bi-star text-muted'} me-1`}
                          />
                        ))}
                      </div>
                      <blockquote className="blockquote mb-4 text-secondary fw-normal fst-italic">“{text}”</blockquote>
                    </div>
                    <figure className="d-flex align-items-center m-0 mt-auto pt-3 border-top">
                      <img
                        src={img}
                        alt={name}
                        width="48"
                        height="48"
                        className="rounded-circle me-3 border border-2 border-primary"
                      />
                      <figcaption className="mb-0 fw-semibold text-dark">{name}</figcaption>
                    </figure>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard
