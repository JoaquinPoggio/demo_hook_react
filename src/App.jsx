import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function App() {

  // logica de carrito de compras con un useState
  const [carrito, setCarrito] = useState([])
  const [producto, setProducto] = useState('')
  const [precio, setPrecio] = useState(0)
  const [cantidad, setCantidad] = useState(0)


  // agregar productos al carrito
  const agregarProducto = () => {
    setCarrito([...carrito, { producto, precio, cantidad }])
  }

  // eliminar productos del carrito
  const eliminarProducto = (index) => {
    setCarrito(carrito.filter((_, i) => i !== index))
  }

  // total del carrito
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  // vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([])
  }



  return (
  <>
      <Header />
      <h1>demo de practica de react</h1>

      <button className='Button_Agregar'  onClick={agregarProducto}>Agregar Producto</button>
      <button className='Button_Eliminar' onClick={eliminarProducto}>Eliminar Producto</button>
      <button className='Button_Vaciar' onClick={vaciarCarrito}>Vaciar Carrito</button>
      <p>Total: {total}</p>

      <Footer />

  </>
    
   
  )
}

export default App
