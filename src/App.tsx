import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ShoppingCartContextProvider } from './context/ShoppingCartContext'
import About from './pages/About'
import Home from './pages/Home'
import Store from './pages/Store'


const App = () =>
    <ShoppingCartContextProvider>
        <Navbar/>
        <Container className="mb-4">
            <Routes>
                <Route path="/" element={ <Home/> }/>
                <Route path="/store" element={ <Store/> }/>
                <Route path="/about" element={ <About/> }/>
            </Routes>
        </Container>
    </ShoppingCartContextProvider>

export default App
