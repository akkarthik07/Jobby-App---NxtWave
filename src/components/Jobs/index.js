import {Component} from 'react'
import Header from '../Header'
import JobProfileSection from '../JobProfileSection'
import JobsListSection from '../JobsListSection'

import './index.css'

class Jobs extends Component {
  state = {
    selectedEmploymentTypes: [],
    selectedSalaryRange: '',
  }

  onChangeEmploymentType = employmentTypeId => {
    this.setState(prevState => {
      const {selectedEmploymentTypes} = prevState
      if (selectedEmploymentTypes.includes(employmentTypeId)) {
        return {
          selectedEmploymentTypes: selectedEmploymentTypes.filter(
            type => type !== employmentTypeId,
          ),
        }
      }
      return {
        selectedEmploymentTypes: [...selectedEmploymentTypes, employmentTypeId],
      }
    })
  }

  onChangeSalaryRange = salaryRangeId => {
    this.setState({selectedSalaryRange: salaryRangeId})
  }

  render() {
    const {selectedEmploymentTypes, selectedSalaryRange} = this.state
    return (
      <>
        <Header />
        <div className="job-container">
          <div className="left-section">
            <JobProfileSection
              onChangeEmploymentType={this.onChangeEmploymentType}
              onChangeSalaryRange={this.onChangeSalaryRange}
              selectedEmploymentTypes={selectedEmploymentTypes}
              selectedSalaryRange={selectedSalaryRange}
            />
          </div>
          <div className="right-section">
            <JobsListSection
              employmentTypes={selectedEmploymentTypes}
              salaryRange={selectedSalaryRange}
            />
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
