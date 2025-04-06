import { createStore } from "../lib";
import { userStorage } from "../storages";

const 초 = 1000;
const 분 = 초 * 60;
const 시간 = 분 * 60;

export const globalStore = createStore(
  {
    currentUser: userStorage.get(),
    loggedIn: Boolean(userStorage.get()),
    posts: [
      {
        id: 1,
        author: "홍길동",
        time: Date.now() - 5 * 분,
        content: "오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",
        likeUsers: [],
      },
      {
        id: 2,
        author: "김철수",
        time: Date.now() - 15 * 분,
        content: "새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",
        likeUsers: [],
      },
      {
        id: 3,
        author: "이영희",
        time: Date.now() - 30 * 분,
        content: "오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",
        likeUsers: [],
      },
      {
        id: 4,
        author: "박민수",
        time: Date.now() - 30 * 분,
        content: "주말에 등산 가실 분 계신가요? 함께 가요!",
        likeUsers: [],
      },
      {
        id: 5,
        author: "정수연",
        time: Date.now() - 2 * 시간,
        content: "새로 나온 영화 재미있대요. 같이 보러 갈 사람?",
        likeUsers: [],
      },
    ],
    error: null,
  },
  {
    logout(state) {
      userStorage.reset();
      return { ...state, currentUser: null, loggedIn: false };
    },
    toggleLike(state, postId) {
      const { currentUser: user, posts } = state;

      if (!user) {
        alert("로그인 후 이용해주세요");
        return;
      }

      const selectedPost = posts?.find((post) => post.id === postId);
      if (!selectedPost) {
        alert("존재하지 않는 게시글입니다.");
        return;
      }

      const hasLiked = selectedPost.likeUsers?.includes(user?.username);
      if (hasLiked) {
        selectedPost.likeUsers = selectedPost.likeUsers?.filter(
          (id) => id !== user?.username,
        );
      } else {
        selectedPost.likeUsers?.push(user.username);
      }

      return { ...state };
    },
    addPost(state, content) {
      const newPost = {
        id: state.posts?.length + 1,
        time: Date.now(),
        author: state.currentUser.username,
        likeUsers: [],
        content,
      };

      return {
        ...state,
        posts: [newPost, ...state.posts],
      };
    },
  },
);
