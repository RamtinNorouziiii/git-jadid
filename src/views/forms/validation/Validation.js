import React, { useState, useRef, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CSpinner,
} from '@coreui/react'
import { SearchOutlined } from '@ant-design/icons';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Button, Input, Space, Table, message } from 'antd';
import Highlighter from 'react-highlight-words'; import { DocsExample } from 'src/components'
import { InputDatePicker } from "jalaali-react-date-picker";
import { exportToExcel } from '../../../utils/exportExcel';
import { FaRegFileExcel } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa6";
import { DetGrid } from '../detgrid';
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const data = [{ "id": 1, "bm": "10", "br": "6663", "no_acc": "10004", "name": "تست یک", "emply_no": "", "dateupdate": "000000" }, { "id": 2, "bm": "10", "br": "6663", "no_acc": "10012", "name": "تست دو", "emply_no": "", "dateupdate": "000000" }, { "id": 3, "bm": "10", "br": "6663", "no_acc": "10020", "name": "تست سه", "emply_no": "", "dateupdate": "780129" }]

  ;


const Tooltips = () => {
  const [mockData, setMockData] = useState([])
  const [toggle, setToggle] = useState(false)
  const navigate = useNavigate()

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [getDetail, setGetDetail] = useState();
  const [nameKarmandy, setNameKarmandy] = useState();
  const [codeShobe, setCodeShobe] = useState();
  const [validated, setValidated] = useState(false)
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [employeeNumber, setEmployeeNumber] = useState(null)
  const [accountNumber, setAccountNumber] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const[loading,setLoading]=useState(false)


  const sidebarShow = useSelector((state) => state.sidebarShow)
  useEffect(() => {


  //   setLoading(true)
  //  axios.get(`${process.env.BASE_URL}/weatherforecast/GetVW_Get_BrMast`,{

  //       withCredentials:false,
  //       headers: {
  //         'Authorization' : `Bearer ${localStorage.getItem("COOKIE_FPL")}`
  //       },
  //     }).then((res)=>{
  //       setMockData(res.data)
  //       setLoading(false)
  //     }).catch((err)=>{
  //       window.location.href="/#/login"
  //     })
     
    

  }, [])

const deleteFilters = ()=>{
  setNameKarmandy("")
  setCodeShobe("")
  setFromDate(null)
  setToDate(null)
  setEmployeeNumber("")
  setAccountNumber("")
  setStartDate(null)
  setEndDate(null)
  setMockData([])
}

  const clickHandler =async ()=>{
    // fetch(`${process.env.BASE_URL}/weatherforecast/GetVW_Get_BrMast`,{
    //   method:"GET",
    // credentials:"same-origin",
    

    // })
    // .then(sts=>console.log(sts.redirected))
    //   .then(response => response.json())
    //   .then(json => setMockData(json))
    

  }
  const handleSearchData = () => {
   
    if (!employeeNumber && !accountNumber && !nameKarmandy) return toast.error("حداقل باید یکی از فیلد های  شماره کارمندی ، شماره حساب یا نام و نام خانوادگی باید پر باشد ! ", {
      style: {
        fontSize: "11px",

      }
    })
  
    setLoading(true)
  axios.get(`${process.env.BASE_URL}/weatherforecast/GetVW_Get_BrMast?br=${codeShobe || null}&no_acc=${accountNumber || null}&name=${nameKarmandy || null}&emply_no=${employeeNumber || null}`,{
    withCredentials:false,
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("COOKIE_FPL")}`
      }, 
  })
  .then((res)=>{
    setMockData(res.data)
    setLoading(false)
   res.data.length===0 && toast.error("موردی یافت نشد!",{
    style:{fontSize:"12px"}
   })
  }).catch((err)=>{
    window.location.href="/#/login"
  })

  
  }
  const columns = [
    {
      title: 'نام و نام خانوادگی',
      dataIndex: 'name',
      key: 'name',

    },
    {
      title: 'شماره کارمندی',
      dataIndex: 'emply_no',
      key: 'emply_no',

      //   ...getColumnSearchProps('age'),
    },
    {
      title: 'شماره حساب',
      dataIndex: 'no_acc',
      key: 'no_acc',

      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'نوع حساب ',
      dataIndex: 'typeAcc',
      key: 'typeAcc',
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'کد شعبه ',
      dataIndex: 'br',
      key: 'br',
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ['descend', 'ascend'],
    },
    // {
    //   title: 'ستون 5',
    //   dataIndex: 'column5',
    //   key: 'column5',
    //   ...getColumnSearchProps('column5'),
    //   // sorter: (a, b) => a.address.length - b.address.length,
    //   // sortDirections: ['descend', 'ascend'],
    // },
    // {
    //   title: 'ستون 6',
    //   dataIndex: 'column6',
    //   key: 'column6',
    //   ...getColumnSearchProps('column6'),
    //   // sorter: (a, b) => a.address.length - b.address.length,
    //   // sortDirections: ['descend', 'ascend'],
    // },
    {
      title: 'صورتحساب',
      dataIndex: '',
      key: 'x',
      render: (e) =>
        <FaFolderOpen style={{ cursor: "pointer" }} onClick={() => { sendDet(e) }} />

      ,
    },
  ];


  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const inputHandlerFromDate = (e) => {
    if(e===null) { 
      
      setFromDate("")
setStartDate("")
    }
   setFromDate(e)
   setStartDate(new Date(e._d).toLocaleDateString("fa-IR",{
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replaceAll("/","").slice(2))
  }
  const inputHandlerToDate = (e) => {
    if(e===null) {
      
      setToDate("")
setEndDate("")
    }
    setToDate(e)
    setEndDate(new Date(e._d).toLocaleDateString("fa-IR",{
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replaceAll("/","").slice(2))
  }

  const sendDet = (e) => {
    console.log(e)
    setGetDetail(e)
    setOpenModalDetail(true)

  }
  return (
    <>
   <> 
     <div  >
      <div  
       style={{border:"1px solid #86888e",padding:"1%",marginBottom:"1%"}} 
       >
    <CForm
      className="row g-3 needs-validation FontClass"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      style={{ fontSize: "11px", fontWeight: "800",fontFamily:"IranSans" }}
    >



      <CCol md={3} className="position-relative">
        <CFormLabel htmlFor="validationTooltip05">شماره کارمندی : </CFormLabel>
        <CFormInput min={0} type="number" id="validationTooltip05" value={employeeNumber} onChange={(e) => { setEmployeeNumber(e.target.value) }} style={{fontSize:"12px"}} />
        <CFormFeedback tooltip invalid>
          Please provide a valid zip.
        </CFormFeedback>
      </CCol>
      <CCol md={3} className="position-relative" >
        <CFormLabel htmlFor="validationTooltip05"  >  شماره حساب : </CFormLabel>
        <CFormInput type="number" min={0} id="validationTooltip05" value={accountNumber} onChange={(e) => { setAccountNumber(e.target.value) }} style={{fontSize:"12px"}} />
        <CFormFeedback tooltip invalid>
          Please provide a valid zip.
        </CFormFeedback>
      </CCol>
      <CCol md={3} className="position-relative" >
        <CFormLabel htmlFor="validationTooltip05"  >  نام و نام خانوادگی : </CFormLabel>
        <CFormInput id="validationTooltip06" value={nameKarmandy} onChange={(e) => { setNameKarmandy(e.target.value) }} style={{fontSize:"12px"}} />
        <CFormFeedback tooltip invalid>
          Please provide a valid zip.
        </CFormFeedback>
      </CCol>
      <CCol md={2} className="position-relative" >
        <CFormLabel htmlFor="validationTooltip05"  > کد شعبه: </CFormLabel>
        <CFormInput type="number" min={0} id="validationTooltip07" value={codeShobe} onChange={(e) => { setCodeShobe(e.target.value) }} style={{fontSize:"12px"}} />
        <CFormFeedback tooltip invalid>
          Please provide a valid zip.
        </CFormFeedback>
      </CCol>

      <CCol md={2} className="position-relative">
        <CFormLabel >از تاریخ :</CFormLabel>
        <InputDatePicker onChange={inputHandlerFromDate} value={fromDate} style={{ minWidth: "140px" }} />

      </CCol>
      <CCol md={1} className="position-relative">

      </CCol>

      <CCol md={2} className="">
        <CFormLabel htmlFor="validationTooltip02">تا تاریخ :</CFormLabel>
        <InputDatePicker onChange={inputHandlerToDate} value={toDate} style={{ minWidth: "140px" }} />
        <CFormFeedback tooltip valid>
          Looks good!
        </CFormFeedback>
      </CCol>

      <CCol style={{ marginTop: "44px",textAlign:"left",display:"flex" }}  >
        <CButton
          onClick={handleSearchData}
          type="submit" style={{ fontSize: "10px", fontWeight: "400", backgroundColor: "#4CAF50", color: "white" }}>
          <FaMagnifyingGlass className='mx-1' />
          جستجو

        </CButton>
        <CButton style={{fontSize:"10px",fontWeight:"400",color:"#FFF",backgroundColor:"#e33044",marginRight:"1%"}} 
        onClick={deleteFilters} 
        >
حذف فیلتر ها
  </CButton>
      </CCol>
     
    </CForm>
   
    {/* <hr  style={{border:"2px solid #000000",opacity:1}} /> */}
    </div>

    <div style={{border:"1px solid #86888e",padding:"1%",marginBottom:"1%"}}  >

    <div className='w-100 text-end' >
      <CButton onClick={() => { exportToExcel(columns, mockData) }} style={{ fontSize: "10px", backgroundColor: "#4CAF50", color: "white" }} >
        {/* <span> خروجی اکسل </span> */}
        <FaRegFileExcel />
      </CButton>

    </div>
    {
      loading
      ?<div className="d-flex justify-content-center" ><CSpinner color="success" /></div> 
      :    <Table className='FontClass' rowClassName={(record, index) => index % 2 === 0 ? 'stripedRow' : 'stripedRow2'} columns={columns} dataSource={[...mockData]} pagination={{ pageSize: 25 }} scroll={{ y: 340 }} bordered style={{ textAlign: "center", fontFamily: "IranSans", fontSize: "20px" }} size="small" />

    }
    </div>
    <CModal
      visible={openModalDetail}
      onClose={() => setOpenModalDetail(false)}
      aria-labelledby="LiveDemoExampleLabel"
      size='xl'
    >
      <CModalHeader style={{ padding: "10px",backgroundColor:"rgb(33, 38, 49)",color:"white" }} >
        <CModalTitle id="LiveDemoExampleLabel" style={{ fontSize: "13px" }} > صورتحساب </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <DetGrid getDetail={getDetail} startdate={startDate} enddate={endDate} fromDate={fromDate ?new Date(fromDate?._d).toLocaleDateString("fa-IR") :null} toDate={toDate ? new Date(toDate?._d).toLocaleDateString("fa-IR"):null} />
      </CModalBody>

    </CModal>


  </div> </>
   
    
  
  </>
  

  )
}

const Validation = () => {
  return (
    <>
   {
localStorage.getItem("COOKIE_FPL")
? <CRow>


<CCol xs={12}>
  <CCard className="mb-4"  >
    <CCardHeader style={{ fontSize: "13px", backgroundColor: "#212631", color: "white" }} >
      گزارش صورتحساب از سامانه FPL2
    </CCardHeader>
    <CCardBody>

      <DocsExample href="forms/validation#tooltips">{Tooltips()}</DocsExample>
    </CCardBody>
  </CCard>
</CCol>
</CRow>
:window.location.href="/#/login"
   }
   </>
  )
}

export default Validation
