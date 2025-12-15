
import AICTEInternshipSection from '../components/AICTEInternshipSection'
import HeroSection from '../components/HeroSection'
import InternshipList from '../components/Internship'

const Home = () => {
  return (
   <>
   <HeroSection />
   <div className='h-[100px] bg-blck'>
   </div>
   <InternshipList />
     <AICTEInternshipSection />
   </>
  )
}

export default Home