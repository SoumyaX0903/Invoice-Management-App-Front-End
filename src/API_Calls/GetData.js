import axios from "axios"
export const getData=async(skip,take,sortfield)=>{
    console.log(sortfield)
    let x=await axios.get("http://localhost:8080/backend/DataLoading?skip="+skip+"&take="+take+"&orderby="+sortfield.field+"&sort="+sortfield.sort);
    console.log(x.data.winterintern)
    return x.data.winterintern;
}
export const getSearchData=async(v)=>{
    let x=await axios.get("http://localhost:8080/backend/SearchData?cust_number="+v)
    console.log(x.data.Search_found.length)
    return x.data.Search_found;
}
export const addData=async(data)=>{
   
    let x= await axios.post("http://localhost:8080/backend/AddData?business_code="+data.business_code
     +"&cust_number="+data.cust_number
     +"&clear_date=" +data.clear_date
     +"&business_year=" +data.business_year
     +"&doc_id=" +data.doc_id
     +"&posting_date=" +data.posting_date
     +"&document_create_date=" +data.document_create_date
     +"&due_in_date=" +data.due_in_date
     +"&doc_type=" +data.doc_type
     +"&posting_id=" +data.posting_id
     +"&total_open_amount=" +data.total_open_amount
     +"&baseline_create_date=" +data.baseline_create_date
     +"&cust_payment_terms=" +data.cust_payment_terms
     +"&invoice_id=" +data.invoice_id
     +"&invoice_currency="+data.invoice_currency)
  
     if(x.data.Insert===1)
     alert("Row added succesfully!")
     else 
     alert("Addition failed!")
  }
export const getAdvancedSearchData=async(data)=>{
    let x=await axios.get("http://localhost:8080/backend/AdvancedSearch?cust_number="+data.cust_number
    +"&invoice_id="+data.invoice_id
    +"&business_year="+data.business_year
    +"&doc_id="+data.doc_id)
    return x.data.Advanced_Search_found;

}
export const editData=async(data)=>{
    let x=await axios.get("http://localhost:8080/backend/EditData?invoice_currency="+data.invoice_currency
    +"&cust_payment_terms="+data.cust_payment_terms
    +"&sl_no="+data.sl_no)
    if(x.data.Update===1)
    alert("Updated succesfully!")
    else 
    alert("failed!")
}
export const deleteData=async(val)=>{
    let x= await axios.get("http://localhost:8080/backend/DeleteData?payload="+val);
    if(x.data.Delete>0)
    alert("Delete successful")
    else
    alert("Delete Unsuccessful")
}
export const getNoOfRows=async()=>{
    let x=await axios.get("http://localhost:8080/backend/GetNoOfRows")
    return x.data.rowcount;
}