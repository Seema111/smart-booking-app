import HelpUsImage from "../../assets/images/help2.jpg";

const HelpPage = () => {
  return (
    <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center justify-content-center">
      <div
        className="col-12 main-about-us"
        style={{
          backgroundImage: `url(${HelpUsImage})`,
          height: "40vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <div className="col-8 m-4">
        <div className="jumbotron rounded text-success">
          <div className="col-12 px-0">
            <h1 className="display-4 font-italic">
              Frequently Asked Questions!
            </h1>
            <p className="lead my-3">
              Welcome to the help page. Here you can find answers to common
              questions and issues.
            </p>
          </div>
          <div className="col-12 px-0">
            <div className="accordion" id="accordionPanelsStayOpenExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseOne"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne"
                  >
                    1. What is home care?
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="panelsStayOpen-headingOne"
                >
                  <div className="accordion-body">
                    Home care is a professional service that provides
                    personalized assistance and support to individuals who
                    prefer to remain in the comfort of their own homes but
                    require assistance with activities of daily living,
                    companionship, or medical care.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseTwo"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseTwo"
                  >
                    2. What services are included in home care?
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingTwo"
                >
                  <div className="accordion-body">
                    Home care services can vary depending on individual needs
                    but commonly include assistance with personal hygiene, meal
                    preparation, medication reminders, light housekeeping,
                    transportation, companionship, and skilled nursing care.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2
                  className="accordion-header"
                  id="panelsStayOpen-headingThree"
                >
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseThree"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree"
                  >
                    3. Who can benefit from home care services?
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingThree"
                >
                  <div className="accordion-body">
                    Home care services are beneficial for individuals of all
                    ages who require assistance due to aging, disability,
                    illness, injury, or post-operative care. They can also
                    provide respite for family caregivers who need temporary
                    relief from caregiving responsibilities.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-heading4">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapse4"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapse4"
                  >
                    4. How do I know if home care is right for me or my loved
                    one?
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapse4"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-heading4"
                >
                  <div className="accordion-body">
                    A comprehensive assessment conducted by a home care agency
                    can help determine the level of care needed and whether home
                    care is the appropriate option. Factors such as medical
                    conditions, safety concerns, and individual preferences are
                    taken into consideration.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-heading5">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapse5"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapse5"
                  >
                    5. How are caregivers selected and trained?
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapse5"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-heading5"
                >
                  <div className="accordion-body">
                    Caregivers undergo thorough background checks, including
                    criminal background and reference checks, before being hired
                    by a home care agency. They receive specialized training in
                    areas such as safety procedures, infection control,
                    communication skills, and client confidentiality.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-heading6">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapse6"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapse6"
                  >
                    6. Can home care services be customized to meet specific
                    needs?
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapse6"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-heading6"
                >
                  <div className="accordion-body">
                    Yes, home care services are tailored to meet the unique
                    needs and preferences of each individual client. A care plan
                    is developed in collaboration with the client, their family,
                    and healthcare professionals to ensure that all aspects of
                    care are addressed.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-heading7">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapse7"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapse7"
                  >
                    7. How is the quality of care monitored?
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapse7"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-heading7"
                >
                  <div className="accordion-body">
                    Home care agencies typically conduct regular quality
                    assurance visits to ensure that clients receive high-quality
                    care and that caregivers adhere to established care plans.
                    Clients and their families are encouraged to provide
                    feedback and voice any concerns or suggestions for
                    improvement.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
