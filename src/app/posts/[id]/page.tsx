import PostDetails from "@/components/posts/post-details/PostDetails";

interface Params {
  params: {
    id: string;
  };
}

const ViewPost = ({ params }: Params) => {
  return (
    <>
      <PostDetails postId={params.id} />
    </>
  );
};

export default ViewPost;
