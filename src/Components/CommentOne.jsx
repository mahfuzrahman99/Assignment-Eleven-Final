/* eslint-disable react/prop-types */
const CommentOne = ({ comment }) => {
  const { userName, userComment, userPhoto } = comment;
  return (
    <div>
      <div className="rounded-lg shadow-xl overflow-hidden mx-auto w-64 my-2 p-3 h-[270px] overflow-y-auto relative">
        <div className="flex justify-center items-center sticky top-0 bg-white z-10">
          <img
            src={userPhoto}
            className="h-16 w-16 rounded-full border-4 border-white shadow-xl"
            alt=""
          />
        </div>
        <div className="space-y-2 my-2">
          <h1>Name: {userName}</h1>
          <p>
            Comment:
            <br />
            {userComment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentOne;
