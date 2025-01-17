import { isMobile } from 'react-device-detect';
import { BgWeb, BgWebFixed } from '../components/molecules';
import { MobileBanner } from '../components/atoms';
import BottomNav from '../components/BottomNav';

interface Children {
  children: React.ReactNode;
}

function DeviceDetect({ children }: Children) {
  return isMobile ? (
    <div className='relative w-full h-full infinityScroll'>
      {children}
      <BottomNav />
      <MobileBanner />
    </div>
  ) : (
    <>
      <div className='w-screen h-screen bg-gray90 bg-center bg-cover bg-no-repeat bg-fixed'>
        <BgWeb />
        <div className='fixed z-10 w-[391px] h-[683px] right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-[38px]'>
          <BgWebFixed />
          <div className='absoulte w-full h-full border-8 border-gray90 box-content max-w-[375px] max-h-[667px]  translate-x-2 rounded-[30px] overflow-hidden translate-y-2 bg-white'>
            <div className='absoulte w-full h-full overflow-scroll no-scrollbar infinityScroll'>
              {children}
            </div>
            <MobileBanner />
            <BottomNav />
          </div>
        </div>
      </div>
    </>
  );
}

export default DeviceDetect;
