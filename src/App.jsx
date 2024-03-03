import { Outlet } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'

function App() {

  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  )
}

export default App
