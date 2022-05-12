import {
  navHome,
  navCoffee,
  navCommunity,
  navUser,
  share,
} from '../assets/icons/index';
import { useNavigate } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();

  const handleToMain = () => {
    navigate('./');
  };
  const handleToBeansList = () => {
    navigate('./beans');
  };

  const handleToMypage = () => {
    navigate('./mypage');
  };
  const handleToPostList = () => {
    navigate('./posts');
  };

  return (
    <>
      <button className='fixed w-12 h-12 rounded-full z-10 bg-slate-400 bottom-104 right-6'>
        <img
          className='mx-auto '
          src={share}
          style={{
            filter:
              'invert(95%) sepia(0%) saturate(21%) hue-rotate(357deg) brightness(104%) contrast(108%)',
          }}
        />
      </button>
      <nav className='fixed flex bottom-0 bg-slate-50 w-full h-84'>
        <button className='flex-auto fill-slate-200' onClick={handleToMain}>
          <img className='mx-auto w-30 -translate-y-7px' src={navHome} />
        </button>
        <button
          className='flex-auto fill-slate-200'
          onClick={handleToBeansList}
        >
          <img className='mx-auto w-30 -translate-y-7px' src={navCoffee} />
        </button>
        <button className='flex-auto fill-slate-200' onClick={handleToPostList}>
          <img className='mx-auto w-30 -translate-y-7px' src={navCommunity} />
        </button>
        <button className='flex-auto fill-slate-200' onClick={handleToMypage}>
          <img className='mx-auto w-30 -translate-y-7px' src={navUser} />
        </button>
      </nav>
    </>
  );
};

export default BottomNav;
