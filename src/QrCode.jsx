import React, { useState } from 'react'

export const QrCode = () => {
  const [img,setImg] = useState("");
  const [loading,setLoading] = useState(false);
  const [QrCode,setQrCode] = useState("");
  const [QrSize, setSize] = useState("");
  async function GenerateQR()
  {
      setLoading(true);
      try
      {
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${QrSize}x${QrSize}&data=${encodeURIComponent(QrCode)}`;
        setImg(url);

      }
      catch(error)
      {
        console.error("Error in generation QR Code"+error);
      }
      finally
      {
        setLoading(false);
      }
      
  }
  function DownloadQR()
  {
    fetch(img).
    then((Response) => Response.blob()).
    then((blob) =>
    {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download="QRCode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error) =>
    {
      console.error("Error in downloading" + error);
    })

  }
  return (
    <div className='app-container'>
      <div className='con'>
        <h1>QR CODE GENERATOR</h1>
        {loading && <p align = "center">Please wait...</p>}
        {img && <img src={img} className="Qr-Code-img"/>}
        <br/><br/><br/>
        <label className='input-label'>Data for QR Code :</label>
        <input type="text" id='dataInput' placeholder='Enter data for QR Code' value={QrCode} onChange={(e) => setQrCode(e.target.value)}/>
        <br/><br/><br/>
        <label className='input-label'>Size (Eg., 150) :</label>
        <input type="text" id='sizeInput' placeholder='Enter Size' value={QrSize} onChange={(e) => setSize(e.target.value)}/>
        <br/><br/><br/>
        <button className='Generate' onClick={GenerateQR} disabled={loading}>Generate QR Code</button>
        <button className='Download' onClick={DownloadQR}>Download QR Code</button>
      </div>
      <p className='footer'>Designed By <a href = "https://creative-hummingbird-952260.netlify.app/" target="_blank">Shunmugha krishnan G S</a></p>
    </div>
  )
}

