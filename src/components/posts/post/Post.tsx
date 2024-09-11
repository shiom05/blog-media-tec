import {
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,
} from "@mui/material";
import PostAuthor from "../post-author/PostAuthor";
import PostDate from "../post-date/PostDate";
import PostReaction from "../post-reaction/PostReaction";

interface Post {
  _id: string;
  createDate: string;
  content: string;
  title: string;
  userId: string;
  user: string;
}

const Post = (post: Post) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {post.title}
        </Typography>
        <Typography variant="h5" component="div">
          {post.content.replace(
            post.content.substring(50, post.content.length),
            "...."
          )}
        </Typography>
        <PostAuthor user={post.user} />
        <PostDate date={post.createDate} />
        <PostReaction post={post} />
      </CardContent>
      <CardActions>
        <Link href={`posts/${post._id}`}>
          <Button size="small">View More</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Post;
