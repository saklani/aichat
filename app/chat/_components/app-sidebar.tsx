import { Sidebar } from "@/components/ui/sidebar"
import { getChats } from "./actions"
import { Content } from "./content"
import { Footer } from "./footer"
import { Header } from "./header" 

export async function AppSidebar() {
  
  return (
    <Sidebar>
      <Header />
      <Content />
      <Footer />
    </Sidebar>
  )
}

