import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker, HiMail} from 'react-icons/hi'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-items">
      <div className="similar-job-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-company-logo"
        />
        <div className="title-container">
          <h1 className="similar-job-title">{title}</h1>
          <div className="icon-container">
            <AiFillStar className="star-icon" />
            <p className="count-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-heading">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>

      <div className="location-type-container">
        <div className="icon-container">
          <HiLocationMarker className="location-icon" />
          <p className="location-description">{location}</p>
        </div>

        <div className="icon-container">
          <HiMail className="employment-icon" />
          <p className="employment-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
