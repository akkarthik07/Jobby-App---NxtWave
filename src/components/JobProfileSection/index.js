import {Component} from 'react'
import ProfileDetails from '../ProfileDetails'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobProfileSection extends Component {
  handleEmploymentTypeChange = event => {
    const {onChangeEmploymentType} = this.props
    onChangeEmploymentType(event.target.value)
  }

  handleSalaryRangeChange = event => {
    const {onChangeSalaryRange} = this.props
    onChangeSalaryRange(event.target.value)
  }

  renderEmploymentTypes = () => (
    <ul className="filter-list">
      {employmentTypesList.map(eachType => (
        <li key={eachType.employmentTypeId}>
          <input
            type="checkbox"
            id={eachType.employmentTypeId}
            value={eachType.employmentTypeId}
            onChange={this.handleEmploymentTypeChange}
          />
          <label
            htmlFor={eachType.employmentTypeId}
            className="employment-type-label"
          >
            {eachType.label}
          </label>
        </li>
      ))}
    </ul>
  )

  renderSalaryRanges = () => (
    <ul className="filter-list">
      {salaryRangesList.map(range => (
        <li key={range.salaryRangeId}>
          <input
            type="radio"
            name="salary"
            id={range.salaryRangeId}
            value={range.salaryRangeId}
            onChange={this.handleSalaryRangeChange}
          />
          <label htmlFor={range.salaryRangeId} className="salary-type-label">
            {range.label}
          </label>
        </li>
      ))}
    </ul>
  )

  render() {
    return (
      <div className="job-profile-container">
        <ProfileDetails />
        <hr className="horizontal-line" />
        <div>
          <h3 className="filter-heading">Type of Employment</h3>
          {this.renderEmploymentTypes()}
        </div>
        <hr className="horizontal-line" />
        <div>
          <h3 className="filter-heading">Salary Range</h3>
          {this.renderSalaryRanges()}
        </div>
      </div>
    )
  }
}

export default JobProfileSection
