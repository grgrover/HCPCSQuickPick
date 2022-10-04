import { useState, useEffect, useRef } from 'react'
import './invoice.css'
import ButtonAppBar from './Appbar.jsx'
import Demographics from './Demographics.jsx'
import axios from 'axios';
import LCodesAll from './Lcodes/LCodesAll.jsx'
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function Output({ formData, priceArray, levelR, levelL, totalCost, patientCost }) {
  const printRef = useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('estimate.pdf');
  };

  useEffect(() => {
    handleDownloadPdf()
  }, [])

  var currentDate = new Date()
  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  currentDate = currentDate.toLocaleDateString('en-us', options);
  var weekDate = new Date(Date.now() + (6.048e+8))
  weekDate = weekDate.toLocaleDateString('en-us', options);


  return (

    <div className="invoice-box" ref={printRef}>
      <table>
        <tbody>
          <tr className="top">
            <td colSpan="4" style={{ width: "100%" }}>
              <table width='100%'>
                <tr>
                  <td className="title">
                    <img src="../../logo.png" alt="Company logo" style={{ width: '100%', maxWidth: '300px' }} />
                  </td>

                  <td colSpan="2" style={{ textAlign: 'right' }}>
                    {currentDate}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr className="information">
            <td colSpan="4">
              <table>
                <tr>
                  <td>
                    Sparksuite, Inc.<br />
                    12345 Sunny Road<br />
                    Sunnyville, TX 12345
                  </td>

                  <td colSpan="2" style={{ textAlign: 'right' }}>
                    Hanger Clinic.<br />
                    John Doe MSPO, CPO<br />
                    jdHanger@example.com
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr className="heading">
            <td>Demographics</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr className="item">
            <td colSpan="2">Right Amputation Level: {levelR}</td>

            <td colSpan="2" style={{ textAlign: 'right' }}>Left Amputation Level: {levelL}</td>
          </tr>
          <tr className="item">
            <td>Height: {formData.height}in</td>
            <td>K-Level: {formData.kLevel}</td>
            <td>Weight: {formData.weight}lbs</td>
            <td></td>
          </tr>

          <tr className="heading">
            <td>HCPCS</td>
            <td>Description</td>
            <td>Quantity</td>
            <td>Price</td>
          </tr>


          {priceArray.map((price, index) => (

            < tr className="item" key={index}>
              <td>{price.hcpcs}</td>
              <td>{price.description}</td>
              <td>{price.quantity} x {price.unitCost}</td>
              <td>{price.unitTotal}</td>
            </tr>
          ))}
          <tr className="heading">
            <td>  </td>
            <td></td>
            <td colSpan="2" style={{ textAlign: 'right' }}>Total: {totalCost}</td>

          </tr>
          <tr className="heading">
            <td></td>
            <td colspan="3" style={{ textAlign: 'right' }}>Maximum Patient Responsibilty: {patientCost}</td>
          </tr>
          <tr className="heading">
            <td colspan="3" style={{ textAlign: 'left' }}>Signature: </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div >

  )
}

export default Output
