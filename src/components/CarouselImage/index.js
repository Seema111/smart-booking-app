import HomeCareDashbaordImg from "../../assets/images/logo5.png";
import HomeCareDashbaordImg2 from "../../assets/images/background.png";

/**
 * @description Creates a carousel component with two images and captions.
 * 
 * @returns { HTML `div` element } a React component that renders an instance of a
 * Bootstrap carousel with two slide items.
 * 
 * 	* `div`: This is the outermost element of the carousel, which contains all the
 * other elements. It has an `id` attribute set to `"carouselExampleCaptions"` and a
 * `className` set to `"carousel slide"`.
 * 	* `div.carousel-indicators`: This is a container element for the carousel indicators.
 * It has a ` className` set to `"carousel-indicators"` and contains two button elements:
 * 		+ `<button>...</button>`: These are the carousel indicators, which can be clicked
 * to move between slides. Each indicator has an `aria-label` attribute set to the
 * number of the slide it represents, and a `data-bs-target` attribute set to the ID
 * of the current slide.
 * 	* `<div.carousel-inner>`: This is the inner container for the carousel content.
 * It contains two `div` elements:
 * 		+ `<div class="carousel-item active">`: This is the first slide, which has an
 * `src` attribute set to `"HomeCareDashbaordImg"` and an `alt` attribute set to
 * `"homecareladies"`. It also has a `className` set to `"carousel-item"` and an
 * `aria-label` attribute set to the current slide.
 * 		+ `<div class="carousel-item">`: This is the second slide, which has an `src`
 * attribute set to `"HomeCareDashbaordImg2"` and an `alt` attribute set to `"homecare2"`.
 * It also has a `className` set to `"carousel-item"` and an `aria-label` attribute
 * set to the current slide.
 * 	* `<button class="carousel-control-prev">...</button>`: This is the previous
 * button element, which can be clicked to move to the previous slide. It has an
 * `aria-label` attribute set to `"Previous"` and a `data-bs-slide` attribute set to
 * `"prev"`.
 * 	* `<button class="carousel-control-next">...</button>`: This is the next button
 * element, which can be clicked to move to the next slide. It has an `aria-label`
 * attribute set to `"Next"` and a `data-bs-slide` attribute set to `"next"`.
 * 
 * 	Overall, the `CarouselImage` function returns a well-structured carousel component
 * with the necessary elements for navigating between slides using carousel indicators.
 */

const CarouselImage = () => {
    return <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={HomeCareDashbaordImg} className="d-block w-100" alt="homecareladies" />
                <div className="carousel-caption d-none d-md-block">
                    <h5>Smile says it all</h5>
                    <p>SOur elderly ladies smiling.</p>
                </div>
            </div>
            <div className="carousel-item">
                <img src={HomeCareDashbaordImg2} className="d-block w-100" alt="homecare2" />
                <div className="carousel-caption d-none d-md-block">
                    <h5>With essential care and presence</h5>
                    <p>OUr Nursing home</p>
                </div>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
}

export default CarouselImage