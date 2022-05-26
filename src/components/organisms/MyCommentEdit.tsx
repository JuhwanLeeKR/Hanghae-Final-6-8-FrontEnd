import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/configureStore';
import { RootState } from '../../redux/configureStore';
import { getMyCommentDB } from '../../redux/modules/mypage';
import { commentActionCreators } from '../../redux/modules/comment';
import { RoundBox, Text, Button } from '../atoms';

const MyCommentEdit = () => {
  const appDispatch = useAppDispatch();
  useEffect(() => {
    !isMyCommentListLoaded && appDispatch(getMyCommentDB());
  }, []);

  const { myCommentList, isMyCommentListLoaded } = useSelector(
    (store: RootState) => store.mypage
  );

  const [toggle, setToggle] = useState(false);
  const [commentsId, setCommentsId] = useState(0);

  const handleToggle = (commentsId: number) => {
    setToggle(!toggle);
    setCommentsId(commentsId);
  };

  const handleDeleteComment = () => {
    appDispatch(commentActionCreators.deleteCommentDB(commentsId));
  };

  return (
    <div>
      {myCommentList.map((comment, index) => {
        return (
          <div className='m-2 flex' key={index}>
            <div className='flex justify-between w-full'>
              <p>{comment.content}</p>
              <button
                onClick={() => {
                  handleToggle(comment.commentsId);
                }}
              >
                더보기
              </button>
            </div>
          </div>
        );
      })}
      {toggle === true ? (
        <div className='fixed z-10 touch-none top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)]'>
          <RoundBox round='mainModal' className='flex flex-col pb-36 mt-80'>
            <Text className='text-subH33 font-500'>
              어떤 작업을 하시겠어요?
            </Text>
            <Button
              className='text-white font-500 text-body'
              type='brownPType'
              onClick={handleDeleteComment}
            >
              삭제하기
            </Button>
            <Button
              className='mt-4 text-gray-400 shadow-lg'
              type='bg-gray60'
              onClick={handleToggle}
            >
              닫기
            </Button>
          </RoundBox>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyCommentEdit;
