import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import MedicalStaffImage from '../../assets/images/medical-staff.png'

import LabImg3 from '../../assets/images/nurse.jpg'
import { getAllCareGivers } from '../../services/http-request'
import { caregivingData } from '../../utils/dummyData'
import LoaderSpinner from '../../components/Loader'
import { validateResponse } from '../../utils/validateResponse'
import './style.scss'

const FadeInOnScroll = ({ children, delay = 0 }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [inView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

const CaregivingPage = () => {
  const navigate = useNavigate()
  const [caregivers, setCaregivers] = useState({
    loading: true,
    data: caregivingData
  })

  useEffect(() => {
    getAllCareGivers()
      .then((res) => {
        validateResponse(res)
        return res.json()
      })
      .then((data) => {
        if (data && Array.isArray(data)) {
          setCaregivers({ loading: false, data })
        } else {
          setCaregivers({ loading: false, data: caregivingData })
        }
      })
      .catch(() => {
        setCaregivers({ loading: false, data: caregivingData })
      })
  }, [])

  const redirectToBookAppointment = (event, uuid) => {
    event.stopPropagation()
    navigate(`/caregiving/${uuid}/book-appointment`)
  }

  const getMoreDetails = (uuid) => {
    navigate(`/caregiving/${uuid}`)
  }

  return (
    <>
      <LoaderSpinner loading={caregivers.loading} />
      <div>
        <motion.div
          className="about-us-hero col-12"
          style={{
            backgroundImage: `url(${MedicalStaffImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '70vh'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
      <div className="container parent-container">
        <div className="row justify-content-center mb-5">
          <div className="col-12 text-center">
            <h1 className="text-uppercase fw-bold">Caregivers</h1>
            <p className="lead text-muted">
              Our Caregivers play an indispensable role in enriching the lives of those we serve.
            </p>
            <hr className="w-50 mx-auto border-dark-subtle" />
          </div>
        </div>

        <div className="row gy-5">
          {caregivers.data.map((each, index) => (
            <div className="col-12 col-md-6 col-xl-4" key={each.uuid}>
              <FadeInOnScroll delay={index * 0.2}>
                <div className="card caregiver-card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
                  <div className="card-body p-4 d-flex flex-column align-items-center text-center">
                    <img
                      className="rounded-circle mb-3 border border-3 border-light shadow"
                      src={each.user?.profile?.profile_picture || LabImg3}
                      alt="caregiver"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                    <h4 className="fw-bold mb-1">
                      {each.user?.first_name} {each.user?.last_name}
                    </h4>
                    <p className="text-muted mb-2">{each.speciality}</p>
                    <p className="small text-muted mb-2">Experience: {each.experience}</p>

                    <div className="mb-3">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`bi ${
                            i < Math.ceil(each.ratings || 5) ? 'bi-star-fill text-warning' : 'bi-star text-muted'
                          } me-1`}
                        />
                      ))}
                    </div>

                    <blockquote className="fst-italic small text-secondary mb-4 px-2 text-truncate-line">
                      {each.bio}
                    </blockquote>

                    <div className="d-flex flex-column gap-2 w-100 mt-auto">
                      <button
                        type="button"
                        className="btn btn-success w-100"
                        onClick={(event) => {
                          redirectToBookAppointment(event, each.uuid)
                          localStorage.setItem('book-detail', JSON.stringify(each))
                        }}
                      >
                        <i className="bi bi-calendar-plus me-2"></i>Book Appointment
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary w-100"
                        onClick={() => getMoreDetails(each.uuid)}
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </FadeInOnScroll>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default CaregivingPage
