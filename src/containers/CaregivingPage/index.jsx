import LabImg3 from "../../assets/images/nurse.jpg";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllCareGivers } from "../../services/http-request";
import { caregivingData } from "../../utils/dummyData";
import LoaderSpinner from "../../components/Loader";
import { validateResponse } from "../../utils/validateResponse";


/**
 * @description Generates high-quality documentation for code given to it, using the
 * information provided in the dependencies and localStorage. It retrieves data from
 * an API, processes it, and displays it to the user.
 * 
 * @returns { HTML div element containing dynamic data related to caregivers } a React
 * component rendering a list of caregivers with photos, bios, and buttons to book
 * appointments or learn more.
 * 
 * 	* `container`: A CSS container element for holding other elements inside the
 * caregiving page.
 * 	* `overflow-hidden`: An overflow: hidden style property applied to the container
 * element to prevent any excess content from overflowing outside of the element.
 * 	* `<div className="row gy-4 gy-md-0 gx-xxl-5 mb-5">`: This is a CSS grid element
 * that creates a row with four columns, where each column has a gap of 4 pixels and
 * 5 pixels for medium and larger screens, respectively. The `mb-5` class is applied
 * to the container element to add margin bottom of 5 pixels.
 * 	* `{caregivers.data.map((each) => (`): This is an array mapping function that
 * loops through the `caregivers.data` state variable, which stores the caregiving
 * data in an array. The function takes each element from the array as an argument
 * and returns a React component for each element.
 * 	* `<div className="col-12 col-md-4" key={each.uuid}>`: This is a CSS column element
 * that takes up one column of the grid. The `col-md-4` class sets the column size
 * to 4 columns on medium and larger screens, while the `key` attribute sets a unique
 * identifier for each element.
 * 	* `<div className="card border-0 border-bottom border-primary shadow-sm text-cursor
 * mb-5">`: This is a CSS card element that takes up most of the horizontal space in
 * its container. The `border-0` class sets the borders to zero, while the `border-primary`
 * class adds a blue primary border to the element. The `shadow-sm` class adds a light
 * shadow effect to the element. The `text-cursor` class highlights the caregiver's
 * profile picture with a cursor pointer.
 * 	* `<figure>`: This is an HTML figure element that holds the caregiver's profile
 * picture.
 * 	* `<img>`: This is an HTML img element that loads the caregiver's profile picture.
 * The `loading="lazy"` attribute sets the image to load lazily, only when its container
 * is scrolled into view. The `src` attribute sets the source of the image to either
 * the caregiver's profile picture or a placeholder image.
 * 	* `<figcaption>`: This is an HTML figcaption element that holds text content
 * associated with the profile picture.
 * 	* `<div>`: This is an HTML div element that contains the caregiver's bio and other
 * details.
 * 	* `</div>` : This is the closing tag of the div element.
 */

const CaregivingPage = () => {
  const navigate = useNavigate();
  const [caregivers, setCaregivers] = useState({
    loading: true,
    data: caregivingData,
  });

  useEffect(() => {
    try {
      getAllCareGivers()
        .then((res) => {
          validateResponse(res);
          return res.json();
        })
        .then((data) => {
          if (data) {
            console.log(data);
            setCaregivers({
              loading: false,
              data,
            });
          } else {
            toast.error(JSON.stringify(data));
          }
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error(JSON.stringify(error));
    }
  }, []);

  /**
   * @description Stops the propagation of the event and navigates to the book appointment
   * page for the specified UUID.
   * 
   * @param { object } event - Event Fired and stops its propagation
   * 
   * @param { string } uuid - unique identifier of a specific caregiver for whom the
   * appointment booking functionality is being performed, and its inclusion in the
   * function stops the propagation of the event and navigates to the appropriate booking
   * page based on the uuid value.
   */

  const redirectToBookAppointment = (event, uuid) => {
    event.stopPropagation();
    navigate(`/caregiving/${uuid}/book-appointment`);
  };


  /**
   * @description Redirects to the Caregiving page with a specific UUID appended to the
   * URL.
   * 
   * @param { uuid value. } uuid - 36-digit unique identifier of the caregiver for whom
   * the documentation is being generated, and is used to direct the user to the
   * appropriate documentation page.
   * 
   * 	* `/caregiving/${uuid}`: The URL that will be navigated to upon invoking the
   * `navigate` method. This property contains a unique identifier for each caregiver
   * profile in the application's database.
   */

  const getMoreDetails = (uuid) => {
    navigate(`/caregiving/${uuid}`);
  };

  return (
    <>
      <LoaderSpinner loading={caregivers.loading} />
      <div className="container parent-container">
        <div className="row justify-content-md-center">
          <div className="col-12">
            <h1 className="text-center fw-bold text-uppercase d-flex justify-content-center">
              <span className="pr-5">Caregivers</span>
            </h1>
            <p className="display-5 mb-4 mb-md-5 text-center">
              {" "}
              Our Caregivers play an indispensable role in enriching the lives
              of those we serve.
            </p>
            <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
          </div>
        </div>
      </div>
      <div className="container overflow-hidden">
        /**
         * @description Displays information about a caregiver, including their profile
         * picture, ratings, bio, and specialty. A "Book Appointment" button is also provided
         * for booking an appointment with the caregiver.
         * 
         * @param { string } className - class name for each card element, allowing the
         * developer to apply custom CSS styles to the elements.
         */
        <div className="row gy-4 gy-md-0 gx-xxl-5 mb-5">
          {caregivers.data.map((each) => (
            <div className="col-12 col-md-4" key={each.uuid}>
              <div className="card border-0 border-bottom border-primary shadow-sm text-cursor mb-5">
                <div className="card-body pt-5 px-5" title="Learn more">
                  <figure>
                    {each.user.profile.profile_picture ? (
                      <img
                        className="img-fluid rounded rounded mb-4 border border-5"
                        loading="lazy"
                        src={each.user.profile.profile_picture}
                        style={{ height: "200px", width: "200px" }}
                        alt=""
                      />
                    ) : (
                      <img
                        className="img-fluid rounded rounded mb-4 border border-5"
                        loading="lazy"
                        src={LabImg3}
                        alt=""
                      />
                    )}

                    <figcaption>
                      <div
                        className="bsb-ratings text-warning mb-3"
                        data-bsb-star={Math.ceil(Number(each.ratings)) || 5}
                        data-bsb-star-off="0"
                      ></div>
                      <blockquote className="bsb-blockquote-icon mb-4 blockquote-bio">
                        {each.bio}
                      </blockquote>
                      <h4 className="mb-2">
                        {each?.user?.first_name} {each?.user?.last_name}
                      </h4>
                      <h5 className="fs-6 text-secondary mb-1">
                        {each.speciality}
                      </h5>
                      <h5 className="fs-6 text-secondary mb-1">
                        Experience: {each.experience}
                      </h5>
                    </figcaption>
                    <div className="col-12 text-center">

                      /**
                       * @description Is set up to redirect the user to a booking appointment page upon
                       * click, storing the appointment details in local storage using `JSON.stringify()`.
                       * 
                       * @param { string } type - button's type and determines the appearance of the button,
                       * such as "button", " danger", or "primary".
                       * 
                       * @param { string } className - class name of a button, which is used to set the CSS
                       * styling for the button element when it is clicked.
                       * 
                       * @param { event. } onClick - event of clicking the button and invokes the
                       * `redirectToBookAppointment` function with the `event` parameter and the `each.uuid`
                       * value as arguments, then sets the book detail data in local storage using `localStorage.setItem()`.
                       * 
                       * 	* `type`: It is set to `"button"`.
                       * 	* `className`: It is set to `"btn btn-lg btn-success mt-3 w-100"`, indicating
                       * that the button has a class of "btn", "btn-lg", "btn-success", and "mt-3" with a
                       * width of "w-100".
                       * 	* `onClick`: It is set to a function that calls the `redirectToBookAppointment`
                       * function, passing in the event parameter as its argument, followed by the `each.uuid`
                       * variable as an additional argument.
                       * 
                       * 	Note: The `localStorage.setItem` function is used to store the "book-detail" item
                       * in local storage with the value of the deserialized `each` object.
                       */

                      <button
                        type="button"
                        className="btn btn-lg btn-success mt-3 w-100"
                        onClick={(event) => {
                          redirectToBookAppointment(event, each.uuid);
                          localStorage.setItem(
                            "book-detail",
                            JSON.stringify(each),
                          );
                        }}
                      >
                        <i className="bi bi-person-plus pr-5"></i>
                        Book Appointment
                      </button>

                      /**
                       * @description Is intended to provide additional information about a specific code
                       * component by invoking the `getMoreDetails()` function with each unique `uuid`.
                       * 
                       * @param { string } type - type of action to be performed when the button is clicked,
                       * which in this case is to get more details for the provided UUID.
                       * 
                       * @param { string } className - class attribute for the button element, which allows
                       * setting the CSS class name of the button to perform additional actions or styles
                       * when clicked.
                       * 
                       * @param { JavaScript function reference. } onClick - function `getMoreDetails` and
                       * calls it with the passed `each.uuid`.
                       * 
                       * 	* `type`: It specifies the button type, which is `button` in this case.
                       * 	* `className`: It specifies the class name for the button, which is `btn btn-lg
                       * btn btn-outline-info` in this case.
                       * 	* `onClick`: This property specifies the event handler that will be called when
                       * the button is clicked. The function reference `getMoreDetails(each.uuid)` is passed
                       * as the value of `onClick`.
                       */

                      <button
                        type="button"
                        className="btn btn-lg btn btn-outline-info mt-3"
                        onClick={() => getMoreDetails(each.uuid)}
                      >
                        Learn more..
                      </button>
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CaregivingPage;
