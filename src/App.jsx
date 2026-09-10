import { Button } from 'flowbite-react'
import { deleteProduct, getProductById } from './services/productApi'
import { useState } from 'react';

function App() {

  deleteProduct();

  const [form, setForm] = useState([{
    title: 1,
    desc: 'John Doe',
    price: 100
  }]);

  return (
    <div>
      <h1 className='font-bold text-3xl'>Homepage</h1>
    </div>
  )
}

export default App
