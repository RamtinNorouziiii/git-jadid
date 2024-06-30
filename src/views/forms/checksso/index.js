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
  console.log(window.location.hash.split("Ticket=")[1].split("#")[0])
  useEffect(() => {


     setLoading(true)
    axios.get(`${process.env.BASE_URL}/Authentication/cheackssoticket?ticket=${window.location.hash.split("Ticket=")[1].split("#")[0]}`,{

         withCredentials:false,
        
       }).then((res)=>{
       
        localStorage.setItem("COOKIE_FPL",res.data?.response?.token)
         setLoading(false)
         window.location.href="/#/form"
       }).catch((err)=>{
         window.location.href="/#/login"
       })
     
    

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
  axios.get(`${process.env[`BASE_URL_${process.env.APP_MODE}`]}/weatherforecast/GetVW_Get_BrMast?br=${codeShobe || null}&no_acc=${accountNumber || null}&name=${nameKarmandy || null}&emply_no=${employeeNumber || null}`,{
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
 <CSpinner  />
    
  
  </>
  

  )
}

const CheckSso = () => {
  return (
    <>
   <CRow>


<CCol xs={12}>
  <CCard className="mb-4"  >
    

      <DocsExample href="forms/validation#tooltips">{Tooltips()}</DocsExample>
   
  </CCard>
</CCol>
</CRow>

   </>
  )
}

export default CheckSso
