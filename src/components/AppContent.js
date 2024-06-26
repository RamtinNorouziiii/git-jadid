import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
//import routes from '../routes'
import { useSelector, useDispatch } from 'react-redux'
import Validation from '../views/forms/validation/Validation'
import Login from '../views/pages/login/Login'
import CheckSso from '../views/forms/checksso'
import SaeiComp from '../views/forms/saei'

const AppContent = () => {
  const sidebarShow = useSelector((state) => state.sidebarShow)

    return (
    <CContainer className={sidebarShow ? "px-4":""} lg style={{maxWidth:"2000px"}}  >
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {/* {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })} */}
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/form" element={<Validation />} />
          <Route path="/saei" element={<SaeiComp />} />

          <Route path="/checksso" element={<CheckSso />} />


        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
