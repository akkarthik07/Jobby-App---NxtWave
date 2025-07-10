import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {HiLocationMarker, HiMail} from 'react-icons/hi'

const JobsCard = props => {
  const {jobDetails} = props
  const {
    title,
    companyLogoUrl,
    employmentType,
    rating,
    location,
    id,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-list-items">
        <div className="company-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="designation">{title}</h1>
            <div className="icon-container">
              <AiFillStar className="star-icon" />
              <p className="rating-count">{rating}</p>
            </div>
          </div>
        </div>

        <div className="location-container-flex-content">
          <div className="job-meta-container">
            <div className="icon-container">
              <HiLocationMarker className="location-icon" />
              <p className="location-description">{location}</p>
            </div>
            <div className="icon-container">
              <HiMail className="employment-icon" />
              <p className="employment-type">{employmentType}</p>
            </div>
          </div>

          <div className="package-container">
            <p className="package-per-year">{packagePerAnnum}</p>
          </div>
        </div>

        <hr className="separator" />
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsCard
