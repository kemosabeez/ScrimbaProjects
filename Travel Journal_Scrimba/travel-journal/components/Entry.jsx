function Entry(props) {
    return(
    <section className="entry-section">
        <div className="main-img-container">
             <img src={props.details.img.src} alt={props.details.img.src} className="main-img" />
        </div>
        <div className="entry-section-contents">
            <div className="entry-section-header">
            
            <h2><img src="../public/marker.png" alt="marker-logo" className="marker-logo" />{props.details.country}</h2>
            {props.details.googleMapsLink && <a href={props.details.googleMapsLink}>View on Google Maps</a>}
       </div>
       <div className="entry-section-body">
            <h1>{props.details.title}</h1>
            <p>Dates: {props.details.dates}</p>
            <span>
                {props.details.text}
            </span>
       </div>
        </div>       
        
    </section>
    )
}
export default Entry                            