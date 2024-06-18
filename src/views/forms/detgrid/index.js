import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText } from "@coreui/react"
import { InputDatePicker } from "jalaali-react-date-picker";
import { Button, Input, Row, Space, Table } from 'antd';
import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { FaFolderOpen, FaRegFileExcel } from "react-icons/fa6";
import { exportToExcel } from "../../../utils/exportExcel";
import { p2e } from "../../../utils/convertorNumber";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const data = [{ "id": 1, "bm": "10", "br": "8823", "no_acc": "3708713", "date": "1374/10/17", "qty": "4557", "new_qty": "768869", "no_sand": "830430", "kind_code": "79", "tim": "082500" }, { "id": 2, "bm": "10", "br": "8823", "no_acc": "3714750", "date": "1398/12/5", "qty": "11504", "new_qty": "2888475", "no_sand": "700", "kind_code": "79", "tim": "151553" }, { "id": 3, "bm": "10", "br": "8823", "no_acc": "3700025", "date": "1403/03/20", "qty": "290", "new_qty": "55865", "no_sand": "821228", "kind_code": "79", "tim": "125456" }];

export const DetGrid = ({ getDetail,startdate,enddate,fromDate,toDate }) => {
  const navigate = useNavigate()

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [requestToggle, setRequestToggle] = useState(false);

  const [mockData, setMockData] = useState([])

console.log(startdate)

  useEffect(() => {

  if (requestToggle) {
    axios.get(`${process.env.BASE_URL}/weatherforecast/GetTranAll?br=${getDetail?.br || null}&no_acc=${getDetail?.no_acc || null}&emply_no=${getDetail?.emply_no || null}&bm=${getDetail?.bm || null}&startdate=${startdate&&p2e(startdate) || ""}&enddate=${enddate&&p2e(enddate) || ""}`,{
      withCredentials:false,
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("COOKIE_FPL")}`
      },
    })
    .then((res)=>setMockData(res.data)).catch(err=>navigate("/login"))
      // fetch('https://jsonplaceholder.typicode.com/todos')
     // .then(response => response.json())
     // .then(json => setMockData(json))
    //  .then(json => setMockData(data))

  }
  setRequestToggle(true)

  }, [requestToggle])




  const columns = [
    {
      title: 'ردیف',
      dataIndex: '',
      key: '',
      width: "5%",

      render: (e, index, _index) => (<>{_index + 1}</>)
    },


    // {
    //     title: ' تاریخ ',
    //     dataIndex: 'column7',
    //     key: 'column7',
    //     width:"10%",

    //   },
    {
      title: ' تاریخ ',
      dataIndex: 'date_circl',
      key: 'date_circl',
      width: "10%",

    },
    {
      title: ' کد سند ',
      dataIndex: 'kind_code',
      key: 'kind_code',
      width: "10%",

    },
    {
      title: '  شرح سند ',
      dataIndex: 'title',
      key: 'title',
      width: "10%",

    },
    {
      title: '  شماره سند ',
      dataIndex: 'no_sanad',
      key: 'no_sanad',
      width: "10%",

    },
    {
      title: ' مبلغ بدهکار/ بستانکار ',
      dataIndex: 'qty',
      key: 'qty',
      width: "10%",
      render: (e, index, _index) => (<>{Number(e).toLocaleString()}</>)

    },
    {
      title: ' مانده ',
      dataIndex: 'new_qty',
      key: 'new_qty',
      width: "10%",
      render: (e, index, _index) => (<>{Number(e).toLocaleString()}</>)

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

  ];
  return (<>
    <CForm className="row g-3 " style={{ fontSize: "11px" }} >
      <CCol md={3}>
        {/* <CFormInput
      type="text"
      id="validationDefault01"
      label="نام و نام خانوادگی"
     value={getDetail?.name}
      disabled
      style={{fontSize:"11px",textAlign:"center"}}
    /> */}
        <labe   >  نام و نام خانوادگی  : </labe>
        <span>{getDetail?.name}</span>

      </CCol>


      <CCol md={2}>
        {/* <CFormInput
      type="text"
      id="validationDefault01"
      label="شماره حساب"
      value={getDetail?.column5}
      disabled
      style={{fontSize:"11px",textAlign:"center"}}
    /> */}
        <labe   >  شماره حساب : </labe>
        <span>{getDetail?.no_acc}</span>
      </CCol>


      <CCol md={3}>
        {/* <CFormInput
      type="text"
      id="validationDefault01"
      label="شماره کارمندی"
      value={getDetail?.column6}
      disabled
      style={{fontSize:"11px",textAlign:"center"}}
    /> */}
        <labe   >  شماره کارمندی : </labe>
        <span>{getDetail?.emply_no}</span>
      </CCol>
     
      
        <CCol md={2} className="position-relative">
        
          {/* <CFormLabel >از تاریخ :</CFormLabel>
          <InputDatePicker disabled style={{minWidth:"30px"}} /> */}
          <labe   > استان : </labe>
          <span>{getDetail?.bm}</span>
        </CCol>



        <CCol md={2}>
        {/* <CFormInput
      type="text"
      id="validationDefault01"
      label="کد شعبه"
      value={getDetail?.age}
      disabled
      style={{fontSize:"11px",textAlign:"center"}}
    /> */}


        <labe   > کد شعبه : </labe>
        <span>{getDetail?.br}</span>


      </CCol>
        <Row>
        <CCol md={3} className="position-relative">
          {/* <CFormLabel >از تاریخ :</CFormLabel>
          <InputDatePicker disabled style={{minWidth:"30px"}} /> */}
          <labe   > از تاریخ  : </labe>
          <span>{fromDate || null}</span>
        </CCol>


        <CCol md={1} className="position-relative">
       
        </CCol>


        <CCol md={3} className="">
          {/* <CFormLabel htmlFor="validationTooltip02">تا تاریخ :</CFormLabel>
          <InputDatePicker disabled   style={{minWidth:"30px"}}  /> */}
          <labe   > تا تاریخ  : </labe>
          <span>{toDate || null}</span>
        </CCol>
        </Row>
     

    </CForm>
    <div className="my-2" style={{ float: "left" }} >
      <CButton onClick={() => { exportToExcel(columns, data) }} style={{ fontSize: "10px", backgroundColor: "#4CAF50", color: "white" }} >
        {/* <span> خروجی اکسل </span> */}
        <FaRegFileExcel />
      </CButton>
    </div>
    <Table rowClassName={(record, index) => index % 2 === 0 ? 'stripedRow' : 'stripedRow2'} columns={columns} dataSource={mockData} pagination={false} scroll={{ y: 340 }} bordered style={{ textAlign: "center", fontFamily: "IranSans", fontSize: "10px" }} size="small" />

  </>
  )
}