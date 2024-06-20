import HomeCareDashbaordImg from "../../assets/images/oldladies.jpg";
import HomeCareDashbaordImg2 from "../../assets/images/old_care.jpg";

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