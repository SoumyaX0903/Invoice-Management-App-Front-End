import { getData, getNoOfRows, getSearchData } from "./API_Calls/GetData"
import { useState, useEffect } from "react";
import styled from "styled-components";
import { DataGrid } from '@mui/x-data-grid';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { Button, ButtonGroup } from "@mui/material";
import { AddModal } from "./Modals/AddData"
import { AdvSearchModal } from "./Modals/AdvSearch"
import { EditModal } from "./Modals/Edit";
import { DeleteModal } from "./Modals/Deletedata";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./index.css";
const Container = styled.div`
  height: 8vh;
  display: flex;
  align-items:center;
  `

const Left = styled.div`
  text-align:center;
  flex:1;
  margin-left:10px;
  `;

const Center = styled.div`
  flex:1;
  display:flex;
  justify-content:center;
  align-items:center;
  `
const Right = styled.div`
  flex:1;
  text-align: center;
  margin-right:20px;
  `
const Input = styled.input`
  padding: 13px;
  border-radius: 10px;
  `
const Form = styled.form`
  margin-left:10px;
  `
const GridContainer = styled.div`
  height:70vh;
`
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const columns = [
  { field: 'sl_no', headerName: 'Sl_No', width: 70, type: "number", align: "center" },
  { field: 'business_code', headerName: 'Business Code', width: 90, align: "center" },
  { field: 'cust_number', headerName: 'Customer Number', width: 110, type: "number", align: "center" },
  { field: 'clear_date', headerName: 'Clear Date', width: 90, type: "date", align: "center" },
  { field: 'buisness_year', headerName: 'Business Year', width: 90, type: "number", align: "center" },
  { field: 'doc_id', headerName: 'Doc_Id', width: 90, type: "number", align: "center" },
  { field: 'posting_date', headerName: 'Posting Date', width: 100, type: "date", align: "center" },
  { field: 'document_create_date', headerName: 'Document Create Date', width: 130, type: "date", align: "center" },
  { field: 'due_in_date', headerName: 'Due In Date', width: 125, type: "date", align: "center" },
  { field: 'invoice_currency', headerName: 'Invoice Currency', width: 100, align: "center" },
  { field: 'document_type', headerName: 'Document Type', width: 110, align: "center" },
  { field: 'posting_id', headerName: 'Posting_Id', width: 90, type: "number", align: "center" },
  { field: 'total_open_amount', headerName: 'Total Open Amount', width: 120, type: "number", align: "center" },
  { field: 'baseline_create_date', headerName: 'Baseline Create Date', width: 160, type: "date", align: "center" },
  { field: 'cust_payment_terms', headerName: 'Cust Payment Terms', width: 120, align: "center" },
  { field: 'invoice_id', headerName: 'Invoice_Id', width: 120, type: "number", align: "center" },
];

export const Table = () => {
  const [data, setdata] = useState([]);
  const [rowcount, setrowcount] = useState(0)
  const [sortfield, setsortfield] = useState([{ "field": "sl_no", "sort": "asc" }])
  useEffect(async () => {
    setisloading(true)
    setdata(await getData(rowState.page * rowState.pageSize, rowState.pageSize, sortfield[0]))
    setrowcount(await getNoOfRows())
    setisloading(false)
  }, [])

  const [search_val, setsearchval] = useState("");
  const [showadd, setshowadd] = useState(false);
  const [showsearchmodal, setsearchmodal] = useState(false);
  const [showeditmodal, setshoweditmodal] = useState(false);
  const [selectedboxes, setselectedboxes] = useState([]);
  const [showdeletemodal, setshowdeletemodal] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [pgMode, setpgMode] = useState("server");
  const closemodal = () => {
    setshowadd(false)
    setsearchmodal(false)
    setshoweditmodal(false)
    setshowdeletemodal(false)
  }
  const handleSearch = async (e) => {
    e.preventDefault();
    if(search_val.length===0)return;
    setpgMode("client")
    setisloading(true)
    setdata(await getSearchData(search_val));
    setisloading(false)
    setsearchval("")
  }
  const handleRefresh = async () => {
    setpgMode("server")
    setrowState({ ...rowState, "page": 0 })
    setsortfield([{ "field": "sl_no", "sort": "asc" }])
  }
  const [edit, setedit] = useState({})
  const handleEdit = () => {
    let target = selectedboxes[0];
    console.log("SELECTED BOX", selectedboxes[0])
    console.log("Target", target)
    let x = data[target]
    setedit(x);
    console.log(x)
    setshoweditmodal(true)

  }
  const [dele, setdel] = useState("")
  const handleDelete = () => {
    let x = "";
    for (var i = 0; i < selectedboxes.length; i++) {
      let target = selectedboxes[i];
      x += (i !== selectedboxes.length - 1) ? (data[target].sl_no).toString() + "," : (data[target].sl_no).toString();
    }
    console.log(x)
    setdel(x)
    setshowdeletemodal(true)
  }
  const [rowState, setrowState] = useState({
    page: 0,
    pageSize: 10
  });
  useEffect(async () => {
    if (pgMode === "client") return;
    setisloading(true)
    setdata(await getData(rowState.page * rowState.pageSize, rowState.pageSize, sortfield[0]))
    setisloading(false)
  }, [rowState, sortfield])

  return (
    <div className="backcolor">
      <Container>
        <Left>
          <ButtonGroup fullWidth>
            <ThemeProvider theme={darkTheme}>
              <Button sx={{ color: "white" }} size="large" onClick={() => setsearchmodal(true)}>ADVANCED SEARCH</Button>
            </ThemeProvider>
          </ButtonGroup>
        </Left>
        <Center>
          <Button variant="outlined" onClick={handleRefresh}>
            <RefreshOutlinedIcon />
          </Button>
          <Form onSubmit={(e) => handleSearch(e)}>
            <Input name="cust_number" placeholder="Search Customer Number" value={search_val} type="text" onChange={(e) => setsearchval(e.target.value)} />
          </Form>

        </Center>
        <Right>
          <ThemeProvider theme={darkTheme}>
            <ButtonGroup fullWidth>
              <Button sx={{ color: "white" }} size="large" onClick={() => setshowadd(true)}>ADD</Button>
              {selectedboxes.length === 1 ? <Button sx={{ color: "white" }} size="large" onClick={handleEdit}>EDIT</Button> : <Button sx={{ color: "white" }} size="large" disabled>EDIT</Button>}

              {selectedboxes.length >= 1 ? <Button sx={{ color: "white" }} size="large" onClick={handleDelete}>DELETE</Button> : <Button sx={{ color: "white" }} size="large" disabled>DELETE</Button>}

            </ButtonGroup>
          </ThemeProvider>
        </Right>
      </Container>
      
      <ThemeProvider theme={darkTheme}>
        <GridContainer>
          <DataGrid
            rowHeight={35}
            rows={data.map((i, index) => ({ ...i, "id": index }))}
            columns={columns}
            loading={isloading}
            rowCount={pgMode === "server" ? rowcount : data.length}
            selectionModel={selectedboxes}
            sx={{
              color: "white",
              border: "none"
            }}
            pagination
            paginationMode={pgMode}
            {...rowState}
            rowsPerPageOptions={[5, 10, 20, 50]}
            checkboxSelection
            onSelectionModelChange={(newselectedboxes) => setselectedboxes(newselectedboxes)}
            onPageChange={(page) => { setrowState({ ...rowState, page }); setselectedboxes([]); }}
            onPageSizeChange={(pageSize) => setrowState({ ...rowState, pageSize })}
            sortingMode={pgMode}
            sortModel={sortfield}
            onSortModelChange={(newfield) => newfield.length !== 0 ? setsortfield(newfield) : setsortfield([{ ...sortfield[0], sort: "asc" }])}
          />
        </GridContainer>
      </ThemeProvider>
      {showadd && <AddModal setclose={closemodal} handleRefresh={handleRefresh} setrowcount={setrowcount} />}
      {showsearchmodal && <AdvSearchModal setpgMode={setpgMode} loading={setisloading} renderdata={setdata} setclose={closemodal} />}
      {showeditmodal && <EditModal sl={edit.sl_no} invcurr={edit.invoice_currency} custpt={edit.cust_payment_terms} setclose={closemodal} />}
      {showdeletemodal && <DeleteModal setrowcount={setrowcount} handleRefresh={handleRefresh} setclose={closemodal} delrows={dele} />}
    </div>
  );
}