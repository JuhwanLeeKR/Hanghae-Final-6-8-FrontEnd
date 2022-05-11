import {
  navHome,
  navCoffee,
  navCommunity,
  navUser,
  share,
} from '../assets/icons/index';

const BottomNav = () => {
  return (
    <>
      {/* 나중에 처리하고 absolute fixed로 바꿔야합니다. */}
      <button className='absolute w-12 h-12 rounded-full z-10 bg-slate-400 bottom-104 right-6'>
        <img className='mx-auto' src={share} />
      </button>
      <nav className='absolute flex bottom-0 bg-slate-50 w-full h-84'>
        <button className='flex-auto fill-slate-200'>
          <img className='mx-auto w-30 -translate-y-7px' src={navHome} />
        </button>
        <button className='flex-auto fill-slate-200'>
          <img className='mx-auto w-30 -translate-y-7px' src={navCoffee} />
        </button>
        <button className='flex-auto fill-slate-200'>
          <img className='mx-auto w-30 -translate-y-7px' src={navCommunity} />
        </button>
        <button className='flex-auto fill-slate-200'>
          <img className='mx-auto w-30 -translate-y-7px' src={navUser} />
        </button>
      </nav>
    </>
  );
};

export default BottomNav;
