import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CModal, CModalBody, CModalHeader, CModalTitle, CSpinner } from "@coreui/react"
import { InputDatePicker } from "jalaali-react-date-picker";
import { Button, Input, Row, Space, Table, message } from 'antd';
import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { FaFolderOpen, FaRegFileExcel } from "react-icons/fa6";
import { exportToExcel } from "../../../utils/exportExcel";
import { p2e } from "../../../utils/convertorNumber";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addSlashes } from "../../../utils/digitSeprator";
import PrevModalPdf from "../prevComp";
const data = [{ "id": 1, "bm": "10", "br": "8823", "no_acc": "3708713", "date": "1374/10/17", "qty": "4557", "new_qty": "768869", "no_sand": "830430", "kind_code": "79", "tim": "082500" }, { "id": 2, "bm": "10", "br": "8823", "no_acc": "3714750", "date": "1398/12/5", "qty": "11504", "new_qty": "2888475", "no_sand": "700", "kind_code": "79", "tim": "151553" }, { "id": 3, "bm": "10", "br": "8823", "no_acc": "3700025", "date": "1403/03/20", "qty": "290", "new_qty": "55865", "no_sand": "821228", "kind_code": "79", "tim": "125456" }];

export const DetGrid = ({ getDetail,startdate,enddate,fromDate,toDate }) => {
  var max;
  var min ;
  var tmp ;

  const navigate = useNavigate()

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [requestToggle, setRequestToggle] = useState(false);
  const [showPrevModal, setShowPrevModal] = useState(false);

  const [maxMinTime, setMaxMinTime] = useState({maxTime:null,minTime:null});

const[loading,setLoading]=useState(false)
  const [mockData, setMockData] = useState([])

console.log(startdate)

  useEffect(() => {
setLoading(true)
  if (requestToggle) {
    axios.get(`${process.env[`BASE_URL_${process.env.APP_DEVELOPE}`]}/weatherforecast/GetTranAll?br=${getDetail?.br || null}&no_acc=${getDetail?.no_acc || null}&emply_no=${getDetail?.emply_no || null}&bm=${getDetail?.bm || null}&startdate=${startdate&&p2e(startdate) || ""}&enddate=${enddate&&p2e(enddate) || ""}`,{
      withCredentials:false,
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("COOKIE_FPL")}`
      },
    })
    .then((res)=>{
     if(res.data.length>0){
      setMockData(res.data)
      tmp = res.data.map(obj => obj.date_circl*1);
      
      max = Math.max(...tmp);
      
       min = Math.min(...tmp);
       setMaxMinTime({maxTime:`${max}`,minTime:`${min}`})
       setLoading(false)
     }else{
      
      setLoading(false)
      return message.error("داده ایی موجود نمباشد")
     }
      
    }).catch(err=>window.location.href="/#/login")
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
      title: ' مبلغ بدهکار  ',
      dataIndex: 'debit',
      key: 'debit',
      width: "10%",
      render: (e, index, _index) => (<>{Number(e).toLocaleString()}</>)

    },
    {
      title: ' مبلغ  بستانکار ',
      dataIndex: 'credit',
      key: 'credit',
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
{
  loading 
  ?
  <>
  <div className="d-flex justify-content-center" ><CSpinner color="success" /></div>
    </>
  : mockData.length!==0
  ? <> 
  <CForm className="row g-3 " style={{ fontSize: "11px" }} >
   <CCol md={12} className="text-center" > بانک ملت </CCol>
   <CCol md={12} className="text-center" >  {`${mockData[0]?.branchName} (${mockData[0]?.br})`} </CCol>
   <CCol md={12} className="text-center" >  {mockData[0]?.typeAcc}</CCol>
   <CCol md={12} className="text-center" >   گزارش صورتحساب   </CCol>





 <Row style={{justifyContent:"center"}} >
 <CCol md={3} className="position-relative" style={{textAlign:"left"}} >
   {/* <CFormLabel >از تاریخ :</CFormLabel>
   <InputDatePicker disabled style={{minWidth:"30px"}} /> */}
   <labe   > از تاریخ  : </labe>
   <span>{addSlashes(String(maxMinTime.minTime)) || null}</span>
 </CCol>
 <CCol md={1}  >
 </CCol>



 <CCol md={3} className="" style={{textAlign:"right"}}>
   {/* <CFormLabel htmlFor="validationTooltip02">تا تاریخ :</CFormLabel>
   <InputDatePicker disabled   style={{minWidth:"30px"}}  /> */}
   <labe   > تا تاریخ  : </labe>
   <span>{addSlashes(String(maxMinTime.maxTime)) || null}</span>
 </CCol>
 </Row>
<Row style={{justifyContent:"center"}}>
<CCol md={4}  style={{textAlign:"left"}} >  شماره حساب  :
<span>{ mockData[0]?.no_acc || null}</span>
</CCol>
<CCol md={1}  >
 </CCol>
   <CCol md={4}  style={{textAlign:"right"}}  > نام صاحب حساب :
   <span>{ mockData[0]?.customerName || null}</span>
    </CCol>
</Row>

</CForm>
<div className="my-2" style={{ float: "left" }} >
<CButton onClick={() => { exportToExcel(columns, data) }} style={{ fontSize: "10px", backgroundColor: "#4CAF50", color: "white" }} >
 {/* <span> خروجی اکسل </span> */}
 <FaRegFileExcel />
</CButton>

<CButton className="mx-3" onClick={()=>{setShowPrevModal(true)}} style={{ fontSize: "10px", backgroundColor: "#ff3131", color: "white" }} >
 {/* <span> خروجی اکسل </span> */}
خروجی صورتحساب
</CButton>
</div>
<Table rowClassName={(record, index) => index % 2 === 0 ? 'stripedRow' : 'stripedRow2'} columns={columns} dataSource={mockData} pagination={false} scroll={{ y: 340 }} bordered style={{ textAlign: "center", fontFamily: "IranSans", fontSize: "10px" }} size="small" />
</>
  :<p className="text-center" > موردی یافت نشد </p>
 
}
<CModal
      visible={showPrevModal}
      onClose={() => setShowPrevModal(false)}
      aria-labelledby="LiveDemoExampleLabel2"
      size='xl'
    >
      <CModalHeader style={{ padding: "10px",backgroundColor:"rgb(33, 38, 49)",color:"white" }} >
        <CModalTitle id="LiveDemoExampleLabel" style={{ fontSize: "13px" }} > صورتحساب </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <PrevModalPdf getDetail={getDetail} startdate={startdate} enddate={enddate} />
      </CModalBody>

    </CModal>
  </>
  )
}
