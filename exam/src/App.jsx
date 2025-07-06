import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [products, setproducts] = useState([]);
  const [page, setpage] = useState(1)

  const fetching = async () => {
    const raw = await fetch("https://dummyjson.com/products?limit=100");
    const data = await raw.json();

    setproducts(data.products);
  }

  useEffect(() => {
    fetching();
  }, [])

  const selectpage = (selectpag) =>{
    if(selectpag >= 1 && selectpag <= products.length / 10 && selectpag !== page)
    setpage(selectpag)
  }

  return (
    <>
      <div>
        {products.length > 0 && (
          <div className='products'>
            {
              products.slice(page * 10 - 10, page * 10).map((prod) => (
                <span className='productsSingle' key={prod.id}>
                  <img src={prod.thumbnail} alt={prod.title} />
                  <span>{prod.title}</span>
                </span>
              ))}
          </div>
        )}
        {
          products.length > 0 && <div className='pagination'>
            <span onClick={()=> selectpage(page - 1)}>◀️</span>
            {
              [...Array(products.length / 10)].map((_, i) => {
                return <span  onClick={()=> selectpage(i + 1)} key={i}> {i + 1} </span>
              })
            }
          
            <span onClick={()=> selectpage(page + 1)}>	▶️</span>
          </div>
        }
      </div>
    </>
  )
}

export default App
