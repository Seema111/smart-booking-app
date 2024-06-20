// import HomeCareDashbaordImg from "../../assets/images/oldladies.jpg";
import CarouselImage from "../../components/CarouselImage";
import MealSvg from "../../assets/images/meal.svg";
import DashboardImage from "../../assets/images/option1.jpg";
import "./style.scss";
import { getCookie } from "../../utils/setCookie";

const Dashboard = () => {
  const storedToken = getCookie("token");

  return (
    <>
      <div className="row dashboard-container gx-5">
        <div className="col-md-6 dashboard-container__image">
          {/* <img src={HomeCareDashbaordImg} className="rounded float-end" alt="happy-home-dashboard-img" height={500} /> */}
          <CarouselImage />
        </div>
        <div className="col-md-6 dashboard-container__introduction d-flex flex-column justify-content-center">
          <h1>Happy Home</h1>
          <h2>A closer look at your satisfaction</h2>
          <p>
            Welcome to Happy Home Elderly Care, where compassion meets comfort.
            Our mission is to provide unparalleled care and support, ensuring
            our beloved seniors enjoy their golden years with joy, dignity, and
            peace of mind.
          </p>
          <p>
            At Happy Home, we understand the unique needs and desires of the
            elderly, and we are committed to creating a nurturing environment
            that feels like home.
          </p>
          <div className="d-flex align-items-center">
            <a
              className="btn btn-success btn-lg"
              href={storedToken ? "/caregiving" : "/login"}
              role="button"
            >
              <b> Book Your Appointment</b>
            </a>
            {!storedToken ? (
              <span className="px-3 dashboard-container__introduction__already_account_text">
                <a href="/login">Already have an account?</a>
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <section className="p-5 py-xl-8">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7">
              <h3 className="fs-4 mb-2 text-secondary text-center text-uppercase">
                Our Services
              </h3>
              <h2 className="display-5 mb-5 text-center">
                Serving with Heart, Caring with Purpose
              </h2>
              <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
            </div>
          </div>
        </div>

        <div className="container overflow-hidden">
          <div className="row gy-4 gy-xl-0">
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 border-bottom border-primary shadow-sm">
                <div className="card-body text-center p-4 p-xxl-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="56"
                    height="56"
                    fill="currentColor"
                    className="bi bi-chat-text text-primary mb-4"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                    <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
                  </svg>
                  <h4 className="mb-4">
                    Assistance with Activities of Daily Living (ADLs)
                  </h4>
                  <p className="mb-4 text-secondary">
                    This includes help with tasks such as bathing, dressing,
                    grooming, toileting, and eating.
                  </p>
                  <a
                    href="/about-us"
                    className="fw-bold text-decoration-none link-primary"
                  >
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-right-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 border-bottom border-primary shadow-sm">
                <div className="card-body text-center p-4 p-xxl-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="56"
                    height="56"
                    fill="currentColor"
                    className="bi bi-phone-flip text-primary mb-4"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11 1H5a1 1 0 0 0-1 1v6a.5.5 0 0 1-1 0V2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a.5.5 0 0 1-1 0V2a1 1 0 0 0-1-1Zm1 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a.5.5 0 0 0-1 0v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2a.5.5 0 0 0-1 0v2ZM1.713 7.954a.5.5 0 1 0-.419-.908c-.347.16-.654.348-.882.57C.184 7.842 0 8.139 0 8.5c0 .546.408.94.823 1.201.44.278 1.043.51 1.745.696C3.978 10.773 5.898 11 8 11c.099 0 .197 0 .294-.002l-1.148 1.148a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2a.5.5 0 1 0-.708.708l1.145 1.144L8 10c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575C1.012 8.639 1 8.506 1 8.5c0-.003 0-.059.112-.17.115-.112.31-.242.6-.376Zm12.993-.908a.5.5 0 0 0-.419.908c.292.134.486.264.6.377.113.11.113.166.113.169 0 .003 0 .065-.13.187-.132.122-.352.26-.677.4-.645.28-1.596.523-2.763.687a.5.5 0 0 0 .14.99c1.212-.17 2.26-.43 3.02-.758.38-.164.713-.357.96-.587.246-.229.45-.537.45-.919 0-.362-.184-.66-.412-.883-.228-.223-.535-.411-.882-.571ZM7.5 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1Z"
                    />
                  </svg>
                  <h4 className="mb-4">Social and Recreational Activities</h4>
                  <p className="mb-4 text-secondary">
                    We organize social and recreational activities to help
                    residents stay engaged having social connections.
                  </p>
                  <a
                    href="/about-us"
                    className="fw-bold text-decoration-none link-primary"
                  >
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-right-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 border-bottom border-primary shadow-sm">
                <div className="card-body text-center p-4 p-xxl-5">
                  <div className="text-primary mb-4 custom-image">
                    <img
                      src={MealSvg}
                      className="rounded"
                      alt="happy-home-dashboard-img"
                      height={56}
                      width={56}
                    />
                  </div>
                  <h4 className="mb-4">
                    Meal Preparation and Nutrition Services
                  </h4>
                  <p className="mb-4 text-secondary">
                    Facilities provide nutritious meals and snacks tailored to
                    residents dietary needs and preferences.
                  </p>
                  <a
                    href="/about-us"
                    className="fw-bold text-decoration-none link-primary"
                  >
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-right-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 border-bottom border-primary shadow-sm">
                <div className="card-body text-center p-4 p-xxl-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="56"
                    height="56"
                    fill="currentColor"
                    className="bi bi-heart-pulse text-primary mb-4"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01L8 2.748ZM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5Z" />
                    <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162l-1.874-4.686Z" />
                  </svg>
                  <h4 className="mb-4">
                    Medical Care and Monitoring Overall Wellbeing
                  </h4>
                  <p className="mb-4 text-secondary">
                    We provide basic medical care, such as checking vital signs
                    and monitoring health conditions.
                  </p>
                  <a
                    href="/about-us"
                    className="fw-bold text-decoration-none link-primary"
                  >
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-right-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="col-12 main-about-us"
        style={{
          backgroundImage: `url(${DashboardImage})`,
        }}
      />
      <div className="container dashboard-testimonial">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center fw-bold text-uppercase d-flex justify-content-center">
              <span className="pr-5">Testimonials</span>
            </h1>

            <h2 className="display-5 mb-4 text-center">
              Our valued clients testimonials speak volumes about our works
              power.
            </h2>
          </div>
        </div>
      </div>

      <div className="container overflow-hidden mb-5">
        <div className="row gy-3 gy-lg-4">
          <div className="col-12 col-lg-6">
            <div className="card">
              <div className="card-body p-4 p-xxl-5">
                <div
                  className="bsb-ratings text-warning mb-3"
                  data-bsb-star="5"
                  data-bsb-star-off="0"
                ></div>
                <blockquote className="bsb-blockquote-icon mb-3">
                  I cant express enough gratitude for the caregiving services
                  provided by Happy Home Care. From the moment they stepped into
                  our home, their professionalism, compassion, and dedication
                  were evident. They not only took exceptional care of my loved
                  one but also provided emotional support to our entire family
                  during a challenging time. I highly recommend Happy Home care
                  to anyone in need of compassionate caregiving services
                </blockquote>
                <figure className="d-flex align-items-center m-0 p-0">
                  <img
                    className="img-fluid rounded rounded-circle m-0 border border-5"
                    loading="lazy"
                    src="./assets/img/testimonial-img-1.jpg"
                    alt=""
                  />
                  <figcaption className="ms-3">
                    <h4 className="mb-1 h5">Luna John</h4>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="card">
              <div className="card-body p-4 p-xxl-5">
                <div
                  className="bsb-ratings text-warning mb-3"
                  data-bsb-star="4"
                  data-bsb-star-off="1"
                ></div>
                <blockquote className="bsb-blockquote-icon mb-3">
                  I recently used Happy home care lab services for my medical
                  testing needs, and I couldnt be more impressed. The efficiency
                  and accuracy of their lab services were outstanding. Not only
                  did they provide quick results, but their staff also went
                  above and beyond to ensure I felt comfortable throughout the
                  process. Thanks to [Lab Services Company Name], I now have
                  peace of mind knowing my health is in good hands. I highly
                  recommend their services to anyone seeking reliable and
                  professional lab testing.
                </blockquote>
                <figure className="d-flex align-items-center m-0 p-0">
                  <img
                    className="img-fluid rounded rounded-circle m-0 border border-5"
                    loading="lazy"
                    src="./assets/img/testimonial-img-2.jpg"
                    alt=""
                  />
                  <figcaption className="ms-3">
                    <h4 className="mb-1 h5">Kedar Bahadur</h4>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="card">
              <div className="card-body p-4 p-xxl-5">
                <div
                  className="bsb-ratings text-warning mb-3"
                  data-bsb-star="3"
                  data-bsb-star-off="2"
                ></div>
                <blockquote className="bsb-blockquote-icon mb-3">
                  Choosing Happy Home Care was the best decision we made for our
                  family. Their team of caregivers provided exceptional support
                  and care for our loved one, treating them with the utmost
                  respect and kindness. Their dedication to improving the
                  quality of life for those they serve is truly remarkable. We
                  are forever grateful for the invaluable assistance and
                  companionship they provided. Thank you, Happy Home Care, for
                  your unwavering commitment to excellence.
                </blockquote>
                <figure className="d-flex align-items-center m-0 p-0">
                  <img
                    className="img-fluid rounded rounded-circle m-0 border border-5"
                    loading="lazy"
                    src="./assets/img/testimonial-img-3.jpg"
                    alt=""
                  />
                  <figcaption className="ms-3">
                    <h4 className="mb-1 h5">Ram Shrestha</h4>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="card">
              <div className="card-body p-4 p-xxl-5">
                <div
                  className="bsb-ratings text-warning mb-3"
                  data-bsb-star="5"
                  data-bsb-star-off="0"
                ></div>
                <blockquote className="bsb-blockquote-icon mb-3">
                  I cant thank Happy Home Care enough for their exceptional lab
                  services. From the moment I walked into their facility, I was
                  greeted with professionalism and warmth. The entire process,
                  from sample collection to receiving results, was seamless and
                  efficient. Their state-of-the-art equipment and knowledgeable
                  staff instilled confidence in the accuracy of my test results.
                  I highly recommend Happy Home Care to anyone in need of
                  reliable and timely lab testing.
                </blockquote>
                <figure className="d-flex align-items-center m-0 p-0">
                  <img
                    className="img-fluid rounded rounded-circle m-0 border border-5"
                    loading="lazy"
                    src="./assets/img/testimonial-img-4.jpg"
                    alt=""
                  />
                  <figcaption className="ms-3">
                    <h4 className="mb-1 h5">Shanti Maharjan</h4>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
