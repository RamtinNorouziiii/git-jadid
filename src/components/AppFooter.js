import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
     
      <div className='text-center w-100' >
        <span style={{fontSize:"11px"}} >

        {/* کلیه حقوق این وب سایت متعلق به شرکت آوین می‌باشد   */}
        </span>
      
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
