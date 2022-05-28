import { naver } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { getNaverURL } from '../../redux/modules/user';
import { Button } from '../atoms';

const LoginBtnNaver = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const handleLoginNaver = async () => {
    await appDispatch(getNaverURL());
    navigate('/api/user/login/naver/callback', { replace: true });
  };
  return (
    <Button type='loginBtn' onClick={handleLoginNaver}>
      <img className='mx-auto' src={naver} />
    </Button>
  );
};

export default LoginBtnNaver;
