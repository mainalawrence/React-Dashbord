import React from 'react';
import "./styles.css";
export default function PrintInvoice({ }) {
    const HandlePrint=()=>{
        window.print();
    }
    return (
        <div className='print-container'>
            <button onClick={HandlePrint} className='print-btn btn'>
                Print
            </button>
            <div className='d-flex flex-row justify-content-between'>
                {/* header */}
                <div>
                    <img
                        src="https://via.placeholder.com/100x50"
                        alt="Company Logo"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <div className=' flex-column'>
                        <h4>TechPut</h4>
                        <h4>kimathi str, bazar</h4>
                        <h4>Email:mainalawrence32@gmail.com</h4>
                    </div>
                </div>
                <div className='' style={{
                    
                }}>
                    <h4><b>Invoice:</b>TechPut</h4>
                    <h4><b>Date Issued:</b>TechPut</h4>
                    <h4><b>Date Due:</b>TechPut</h4>
                </div>

            </div>
            {/* addresses */}
            <div className='d-flex flex-row justify-content-between'>
                <div>
                    <h3><b>Invoice To:</b></h3>
                    <h4>name</h4>
                    <h4>ramaka</h4>
                    <h4>Contact</h4>
                    <h4>email</h4>
                </div>
                <div>
                    <h3><b>Bill To:</b></h3>
                    <h4><b>Account Name</b>{ }</h4>
                    <h4><b>Bank name:</b>{ }</h4>
                    <h4><b>Account No</b>{ }</h4>
                    <hr />
                    <h4><b>Mpesa Paybill:</b>{ }</h4>
                    <h4><b>Account No</b>{ }</h4>
                </div>
            </div>
            {/* Table */}
            <div>

            </div>

            {/* Summary */}
            <>

            </>

        </div>
    )
}
