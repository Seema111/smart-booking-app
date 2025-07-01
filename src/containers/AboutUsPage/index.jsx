import { motion } from 'framer-motion'
import AboutUsImage from '../../assets/images/about-us.png'
import './style.scss'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6
    }
  })
}

const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      <motion.div
        className="about-us-hero col-12"
        style={{
          backgroundImage: `url(${AboutUsImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '70vh'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="col-12 py-5 px-3 px-md-5">
        <div className="row justify-content-center">
          <motion.div
            className="col-12 col-xl-10 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h1 className="fw-bold mb-4">OUR STORY</h1>
            <p className="lead text-secondary mb-3">
              At Prana Home Care, our story is rooted in a deep commitment to enriching the lives of our elderly
              residents. We envisioned a place where compassion meets innovation—where every resident is a cherished
              member of our extended family.
            </p>
            <p className="fs-5 text-secondary">
              Founded by a passionate team with healthcare experience, we began with a powerful vision: to create a
              haven where seniors thrive with dignity, joy, and belonging. Inspired by personal stories and driven to
              elevate care, Prana Home Care was born— a sanctuary built on empathy, respect, and integrity.
            </p>
            <p className="fs-5 text-secondary">
              Our caregivers embody our mission, crafting personalized care plans and offering emotional, social, and
              spiritual support. Every service is designed to honor each resident’s life story and individuality.
            </p>
          </motion.div>

          <div className="row mt-5 g-4 justify-content-center">
            {[
              {
                title: 'Trusted Services',
                desc: 'Compassionate Care, Tailored for You',
                icon: 'gear-fill'
              },
              {
                title: 'Hear our story',
                desc: 'Let go hand in hand for the betterment of all.',
                icon: 'heart-pulse'
              },
              {
                title: 'Bigger Vision',
                desc: 'Bring back to society with simple methods.',
                icon: 'phone-flip'
              },
              {
                title: 'Community',
                desc: 'Skilled doctors and human resources in our care.',
                icon: 'chat-text'
              }
            ].map((item, index) => (
              <motion.div
                className="col-12 col-md-6 col-lg-5"
                key={item.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <div className="d-flex align-items-start p-4 shadow-sm rounded bg-white h-100">
                  <div className="me-4 text-primary">
                    <i className={`bi bi-${item.icon}`} style={{ fontSize: '2rem' }} />
                  </div>
                  <div>
                    <h4 className="fw-semibold mb-2">{item.title}</h4>
                    <p className="text-secondary mb-0">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
