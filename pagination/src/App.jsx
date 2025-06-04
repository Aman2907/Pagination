import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [products, setProduct] = useState([]);
  const [ page, setPage] = useState(1);

  const fetchProduct = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    console.log(data)

    if (data && data.products) {
      setProduct(data.products)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (<div>
    {
      products.length > 0 && (
        <div className='products'>
          {
            products.slice(page * 9- 9, page * 9).map((prod) => {
              return (
                <span className='products--single'>
                  <img src={prod.thumbnail} alt={prod.title} />
                  <span>{prod.title}</span>
                </span>
              )
            })
          }
        </div> 
      )
    }
    {
      products.length>0 && <div className='pagination'>
           <span> 👈 </span>
           {

           }
            <span>1</span>
           <span>⏩ </span>
      </div>
    }
  </div>
  )
}

export default App
