import axios from 'axios'
import React, { useEffect, useState } from 'react'

function PrevModalPdf({getDetail,startdate,enddate}) {
    const [loading,setLoading]=useState(false)
    const [mockData,setMockData]=useState(false)
const [toggle,setToggle]=useState(false)
   
  return (
    <div>
       <iframe src={`${process.env[`BASE_URL_${process.env.APP_DEVELOPE}`]}/weatherforecast/GetReportFpl?br=${getDetail?.br || null}&no_acc=${getDetail?.no_acc || null}&bm=${getDetail?.bm || null}&startdate=${startdate&&p2e(startdate) || ""}&enddate=${enddate&&p2e(enddate) || ""}`} width="100%" height="600px" title="PDF Viewer" />
    </div>
  )
}

export default PrevModalPdf
