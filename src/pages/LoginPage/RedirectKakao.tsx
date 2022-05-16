import { useEffect } from 'react';
import { Spinner } from '../../components/organisms';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { loginKakao } from '../../redux/modules/user';

const RedirectKakao = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();

  const code = new URL(location.href).searchParams.get('code')!;

  console.log(code);
  useEffect(() => {
    const kakaoDispatch = async () => {
      try {
        await appDispatch(loginKakao(code));
        navigate('/main', { replace: true });
      } catch (err) {
        console.log(err);
      }
    };
    kakaoDispatch();
  }, [appDispatch, navigate]);

  return <Spinner />;
};

export default RedirectKakao;
