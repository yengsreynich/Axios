import NavbarComponent from './NavbarComponent'
import { Outlet } from 'react-router'
import FooterComponent from './FooterComponent'

export default function RootLayout() {
  return (
    <div className="max-w-8xl flex flex-col">
      <NavbarComponent />
      <main className="mx-auto grow container">
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  )
}
