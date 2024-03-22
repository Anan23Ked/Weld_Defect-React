
import Navbar from '../components/Navbar'
import Defects from '../components/Defects';
import Params from '../components/Params';
import TempColMap from '../components/TempColMap';
import Video from '../components/Video';
import ConstantData from '../components/ConstantData';
import ThreeAxis from '../components/ThreeAxis';
import '../App.css';

const Layout = () => {
  return (
    <div className='overflow-hidden App'>
      <Navbar />

      <div className='m-1 grid grid-cols-4 grid-rows-3 gap-2'>
        <div className='row-span-2 col-start-1 col-end-2 right-data'>
          <div className=" flex flex-col md:flex-row md:w-1/2">
            <div className="mr-5 mb-5 md:mb-0">
              <Defects />
            </div>
            <div className="mt-3">
              <Params />
            </div>

          </div>
          <div className='mt-3' >
            <ConstantData />
          </div>
        </div>
        <div className='row-span-2 col-start-2 col-end-4 col-spam-2 Video-data'>
          <div className='flex flex-col md:flex-row md:w-full h-full'>
            <div className='display-video'>
              <Video />
            </div>
            <div className='mr-20'>
              <TempColMap />
            </div>
          </div>



        </div>
         <div className=' row-start-3 col-span-4'>
          <ThreeAxis />
        </div>


      </div>




    </div>



  )
}
export default Layout
