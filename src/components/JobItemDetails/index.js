import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker, HiMail} from 'react-icons/hi'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import SkillsCard from '../SkillsCard'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobInfo()
  }

  getJobInfo = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    // console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const updatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
          id: data.job_details.skills.indexOf(eachSkill),
        })),
        title: data.job_details.title,
      }
      console.log(updatedJobDetails)

      const updatedSimilarJobs = data.similar_jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        rating: job.rating,
        title: job.title,
      }))
      // console.log(updatedSimilarJobs)
      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobItemDetails = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails

    console.log(skills)

    return (
      <div className='full-job-item-container'>
        <div className='job-items-container'>
          <div className='logo-image-container'>
            <img
              src={companyLogoUrl}
              alt='job details company logo'
              className='company-logo-image'
            />
            <div className='title-container'>
              <h1 className='company-title-head'>{title}</h1>
              <div className='icon-container'>
                <AiFillStar className='star-icon' />
                <p className='count-rating'>{rating}</p>
              </div>
            </div>
          </div>

          <div className='location-type-salary-container'>
            <div className='location-type-container'>
              <div className='icon-container'>
                <HiLocationMarker className='location-icon' />
                <p className='location-description'>{location}</p>
              </div>
              <div className='icon-container'>
                <HiMail className='employment-icon' />
                <p className='employment-type'>{employmentType}</p>
              </div>
            </div>

            <div className='package-container'>
              <p className='package-per-year'>{packagePerAnnum}</p>
            </div>
          </div>
          <hr className='separator' />
          <div className='job-description-container'>
            <h1 className='job-description-heading'>Description</h1>
            <a href={companyWebsiteUrl} className='visit-link'>
              Visit
              <BiLinkExternal className='bi-link' />
            </a>
          </div>
          <p className='job-description-content'>{jobDescription}</p>
          <h1 className='skills-heading'>Skills</h1>

          <ul className='skills-container'>
            {skills.map(eachSkill => (
              <SkillsCard key={eachSkill.id} skillDetails={eachSkill} />
            ))}
          </ul>

          <h1 className='company-life-heading'>Life at Company</h1>
          <div className='company-life-container'>
            <p className='company-life-description'>
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt='life at company'
              className='company-life-logo'
            />
          </div>
        </div>

        {/* Similar Jobs */}
        <h1 className='similar-jobs-heading'>Similar Jobs</h1>
        <ul className='similar-job-cards'>
          {similarJobs.map(eachItem => (
            <SimilarJobItem key={eachItem.id} similarJobDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className='loader-container' data-testid='loader'>
      <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
    </div>
  )

  renderFailureView = () => (
    <div className='failure-container'>
      <img
        src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
        alt='failure view'
        className='failure-img'
      />
      <h1 className='failure-heading'>Oops! Something Went Wrong</h1>
      <p className='failure-para'>
        We cannot seem to find the page you are looking for
      </p>
      <button
        type='button'
        className='failure-button'
        onClick={this.getJobInfo}
      >
        Retry
      </button>
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className='get-job-details-container'>{this.renderSwitch()}</div>
      </>
    )
  }
}

export default JobItemDetails
