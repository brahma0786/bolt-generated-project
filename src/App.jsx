import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './Components/Navbar/Navbar'
import ProjectDashboard from './pages/Dashboard/ProjectDashboard'
import Form from './pages/Form/Form'
import OnBoarding from './pages/OnBoarding/OnBoarding'
import ReportForm from './pages/ReportForm'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/new' element={<OnBoarding />} />
        <Route path='/feedbackform' element={<ReportForm />} />
        <Route path="/form" element={<Form />} />
        <Route path='/' element={<NavBar />} >
          <Route path="/dashboard" element={<ProjectDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App
