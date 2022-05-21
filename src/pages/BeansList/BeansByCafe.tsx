import { up, down } from '../../assets/icons';
import { GridBox, RoundBox, Text } from '../../components/atoms';
import { logoCopickSquare } from '../../assets/logo';
import { BeansToastPopup } from '../../components/organisms';
import { useState } from 'react';

const BeansByCafe = () => {
  const [isActivePopup, setIsActivePopup] = useState(false);
  const handleClosePopup = () => {
    setIsActivePopup(false);
  };
  const handleIsActivePopup = () => {
    setIsActivePopup(true);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const beansFormdata = [
    {
      bean_id: 1,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
    {
      bean_id: 2,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
    {
      bean_id: 3,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
    {
      bean_id: 4,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
    {
      bean_id: 5,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
    {
      bean_id: 6,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
    {
      bean_id: 7,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
    {
      bean_id: 8,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
    {
      bean_id: 9,
      bean_name: '파이크 플레이스 로스트',
      bean_description: '코코아와 구운 견과류의 은은한 향',
      type: 1,
    },
  ];

  return (
    <>
      <form className='relative' onSubmit={handleSubmit}>
        <button
          placeholder='모든 카페 보기'
          className='w-full bg-brownP h-[43px] bg-transparent text-white placeholder-inherit rounded-full px-5 text-left'
        >
          모든 카페 보기
          <div className='absolute right-4 top-2'>
            <img
              style={{
                filter:
                  'invert(94%) sepia(100%) saturate(0%) hue-rotate(240deg) brightness(108%) contrast(101%)',
              }}
              src={down}
            />
          </div>
        </button>
      </form>
      <GridBox className='gap-2.5 mt-5 pb-32' type='flexBasic'>
        {beansFormdata.map((item) => (
          <RoundBox
            key={item.bean_id}
            className='flex items-center'
            type='beansRoundBox'
          >
            <div className='mr-7 rounded-full overflow-hidden w-16'>
              <img src={logoCopickSquare} />
            </div>
            <div className=''>
              <Text className='text-gray90 text-body'>{item.bean_name}</Text>
              <Text className='line-clamp-1 text-caption text-gray80'>
                {item.bean_description}
              </Text>
            </div>
          </RoundBox>
        ))}
      </GridBox>
      {isActivePopup ? <BeansToastPopup onClick={handleClosePopup} /> : null}
    </>
  );
};

export default BeansByCafe;
