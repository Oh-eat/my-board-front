# My Board - 나만의 게시판 (front)

*back 관련 코드는 다음 링크로! https://github.com/Oh-eat/my-board-back*

리액트 입문서 '리액트를 다루는 기술'에 담겨 있는 블로그 제작 예제를 제 나름대로 재탄생시켜 보았습니다. 블로그 형식의 앱을 게시판 형식으로 바꾸고, 이것저것 넣으려고 했습니다만... 그렇게 많은 기능을 추가하진 못했습니다. 능력 부족을 실감했습니다. 별것 아닌 변화임에도 시간은 엄청나게 잡아먹은 만큼, 리액트와 한 걸음 더(?) 가까워진 느낌입니다.


## 활용
- axios
- qs
- quill
- react
- react-dom
- react-icons
- react-redux
- react-router-dom
- react-scripts
- redux
- redux-actions
- redux-saga
- styled-components


## 달라진 점
- 회원가입은 선택

  기존 블로그 예제에서는 회원가입/로그인 없이는 단순 열람만이 가능했지만, 그런 제약을 없앴습니다.
  누구든지 임시 사용자명과 비밀번호를 입력하면 별다른 제한 없이 활동이 가능합니다.

- 댓글 기능 추가

  포스트에 댓글을 남길 수 있습니다.

- 사용자 권한 도입

  언뜻 봐서는 눈치채기 힘든 변화이고 솔직히 뚜렷한 차이는 없지만... 사용자에 따라 권한이 다릅니다.
  1. 관리자 권한이 있으면 작성자 여부와 상관없이 어떠한 포스트나 댓글이라도 수정하거나 삭제할 수 있습니다.
  1. 회원은 자신의 포스트와 댓글에 관한 처리 권한을 가집니다.
  1. 비회원 역시 자신의 포스트와 댓글에 관한 처리 권한을 가집니다. 단, 포스트와 댓글 각각에 입력된 비밀번호를 통해서만 가능합니다. 이로 인해 본인이 아니더라도 비밀번호만 맞출 수 있다면 누구든 처리 권한을 획득할 수 있습니다.

- 페이지네이션 기능 강화

  현재 페이지가 표시되고 바로 전 또는 바로 후로만 이동 가능했던 기존 페이지네이션과는 달리 한번에 여러 페이지를 뛰어넘을 수 있습니다. 덤으로 처음이나 끝으로 직행할 수도 있습니다.
