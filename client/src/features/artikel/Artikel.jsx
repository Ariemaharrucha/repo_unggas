import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const Artikel = () => {
  const [artikel, setAtikel] = useState([])

  useEffect(()=>{
    const fetchArtkel = async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/artikel`);
      setAtikel(response.data.data)      
    }
    fetchArtkel();
  },[])
  return (
    <div className='space-y-8 p-6'>
      {artikel.map((item) => {
        return (
          <div key={item.artikel_id}>
            <h1>{item.judul}</h1>
            <p>{item.kategori}</p>
            <div className='size-10 overflow-hidden'>
              <img src={`http://localhost:3000/${item.image_artikel}`} alt="" className='h-full w-full object-cover'/>
            </div>
            <button className='p-2 bg-red-500'>
              <Link to={`details/${item.artikel_id}`}>Detail artikel</Link>
            </button>
          </div>
        )
      })}
    </div>
  )
}
