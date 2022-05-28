import { useEffect, useState } from 'react';
import {
  editPostDB,
  PostsState,
  addPostDB,
  PostsItemDataParams,
} from '../../redux/modules/posts';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/configureStore';
import { useForm } from 'react-hook-form';
import { camera, left } from '../../assets/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configureStore';
import { Button } from '../../components/atoms';
import { setMoveToLogin } from '../../utils/setMoveToLogin';

const AddEditPost = () => {
  const { isLogin } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    !isLogin && setMoveToLogin();
  }, []);

  // 수정하려고 들어왔을 때
  const postsIdparams = useParams();

  const navigate = useNavigate();

  const appDispatch = useAppDispatch();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  // 커뮤니티 태그
  const [inputTag, setInputTag] = useState<string>('');
  const [tagName, setTagName] = useState<Array<string>>([]);

  // 이미지 파일 전송용
  const [file, setFile] = useState<File[]>([]);
  // 이미지 미리보기용
  const [previewImage, setPreviewImage] = useState<any>();

  const getOnLoadFileFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files;

    if (file && file.length) {
      setFile((existing) => existing.concat(Array.from(file)));
    }

    const reader = new FileReader();
    const toPreviewFile = file![0];
    reader.readAsDataURL(toPreviewFile);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  // 수정용 포스트
  const postList: PostsState = { list: [] };
  let post: PostsItemDataParams | undefined = {
    postsId: 0,
    nickname: '',
    postsImage: '',
    title: '',
    content: '',
    tagName: [],
    createdAt: '',
    modifiedAt: '',
  };
  // 게시글수정 url경우
  if (postsIdparams.postsId) {
    postList.list = useSelector((store: RootState) => store.posts.list);
    post = postList.list.find((post: PostsItemDataParams) => {
      return post.postsId === Number(postsIdparams.postsId);
    });
  }
  useEffect(() => {
    setTitle(post ? post.title : '');
    setContent(post ? post.content : '');
    setTagName(post ? post.tagName : []);
    setPreviewImage(post ? post.postsImage : '');
  }, []);

  useEffect(() => {
    if (tagName.length !== 0) {
      (
        document.getElementById('tagNameValid') as HTMLInputElement
      ).style.display = 'none';
    }
  }, [tagName]);

  useEffect(() => {
    if (!postsIdparams.postsId) {
      if (file.length !== 0) {
        (
          document.getElementById('fileValid') as HTMLInputElement
        ).style.display = 'none';
        return;
      }
    }
  }, [file]);

  // 커뮤니티 타이틀 set
  const getInputTitleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  // 커뮤니티 태그 set
  const getInputTagNameFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTag(e.target.value);
  };
  // 태그 추가
  const addTag = () => {
    const text = document.getElementById('tagName') as HTMLInputElement;
    if (text.value === '') {
      (
        document.getElementById('tagNameValid') as HTMLInputElement
      ).style.display = 'block';
      return;
    }
    setInputTag(text.value);
    setTagName([inputTag, ...tagName]);
    setInputTag('');
  };

  // 태그 지우기
  const deleteTag = (tag: string) => {
    setTagName(tagName.filter((t) => t !== tag));
  };

  // 커뮤니티 내용 set
  const getInputContentFrom = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleBacktoPrev = () => {
    navigate(-1);
  };

  // react-hool-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onValid = (data: any) => {
    if (tagName.length === 0) {
      (
        document.getElementById('tagNameValid') as HTMLInputElement
      ).style.display = 'block';
      return;
    }
    // 수정의 경우, 이미지 안 바꿀 수 있어서 등록의 경우만 파일체크
    if (!postsIdparams.postsId) {
      if (file.length === 0) {
        (
          document.getElementById('fileValid') as HTMLInputElement
        ).style.display = 'block';
        return;
      }
    }

    // 게시물 수정
    if (postsIdparams.postsId) {
      const formData = new FormData();
      formData.append('posts_id', post!.postsId!.toString());
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('tag_name', tagName.toString());
      formData.append('posts_image', file[0]);
      appDispatch(editPostDB({ formData, navi: navigate, previewImage }));
    } else {
      // 게시물 등록
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('tag_name', tagName.toString());
      formData.append('posts_image', file[0]);
      appDispatch(addPostDB({ formData, navi: navigate, previewImage }));
    }
  };

  return (
    <div>
      <button className='m-2 p-2' onClick={handleBacktoPrev}>
        <img src={left} />
      </button>
      {postsIdparams.postsId ? (
        <h1 className='text-center mb-5 text-[18px]'>게시물 수정</h1>
      ) : (
        <h1 className='text-center mb-5 text-[18px]'>새 게시물</h1>
      )}
      <form onSubmit={handleSubmit(onValid)}>
        <div className='bg-white shadow-xl rounded-30px pt-5 pb-5 pl-5 pr-5'>
          <div className='flex flex-col w-full border-b pt-5 pb-5 '>
            <div className='flex mb-5'>
              <div className='relative mr-3'>
                <img
                  className='w-24 h-24'
                  src={previewImage ? previewImage : camera}
                />
                <label
                  className='absolute top-0 left-0 w-24 h-24 opacity-0'
                  htmlFor='inputFile'
                >
                  파일업로드
                </label>
                <input
                  id='inputFile'
                  className='hidden'
                  type='file'
                  onChange={getOnLoadFileFrom}
                  accept='image/*'
                />
              </div>
              <div className='w-48 h-24'>
                <input
                  {...register('title', { required: '제목을 입력해주세요' })}
                  type='text'
                  placeholder='제목을 입력해주세요'
                  onChange={getInputTitleFrom}
                  value={title}
                />
                {errors.title ? (
                  <p className='text-[red]'>{errors.title.message}</p>
                ) : (
                  <></>
                )}

                <textarea
                  {...register('content', { required: '내용을 입력해주세요' })}
                  className='h-20 w-full resize-none outline-none'
                  placeholder='당신의 커피를 보여주세요...'
                  onChange={getInputContentFrom}
                  value={content}
                />
                {errors.content ? (
                  <p className='text-[red]'>{errors.content.message}</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <p id='fileValid' style={{ display: 'none', color: 'red' }}>
              이미지를 선택해주세요
            </p>
            <div className='HashWrapOuter flex justify-between mt-10'>
              <input
                id='tagName'
                type='text'
                className='HashInput outline-none mb-1'
                placeholder='태그 입력 후 추가버튼'
                onChange={getInputTagNameFrom}
                value={inputTag}
              />
              <button
                className='p-3 rounded-xl shadow-xl'
                type='button'
                onClick={addTag}
              >
                추가
              </button>
            </div>
            <p id='tagNameValid' style={{ display: 'none', color: 'red' }}>
              태그를 입력해 주세요
            </p>
            <div>
              {tagName.length !== 0 ? (
                tagName.map((tag, index) => {
                  return (
                    <span
                      className='inline-block bg-lime-800 text-white mr-1 rounded-md text-sm font-bold p-1 cursor-pointer'
                      key={index}
                      onClick={() => {
                        deleteTag(tag);
                      }}
                    >
                      {tag}
                    </span>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>

          <Button
            className='text-white font-500 text-sub2 mt-12'
            type='brownPType'
          >
            {postsIdparams.postsId ? '수정하기' : '등록하기'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEditPost;
