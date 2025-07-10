/* eslint-disable */

import '@testing-library/jest-dom'
import {configure} from '@testing-library/react'

<<<<<<< HEAD
=======
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    }
  }

>>>>>>> b8328b89e048058ba29622d7ccbcbc154c60fc4a
configure({testIdAttribute: 'data-testid'})
