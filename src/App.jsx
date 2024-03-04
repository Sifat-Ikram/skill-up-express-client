import { Outlet } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'

function App() {

  return (
    <div>
      <Navbar />
      <div className='min-h-screen'>
      <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  )
}

export default App
