
const reaction={
    thumbsUp: '👍',
    clap:'👏',
    heart:'❤️',
    rocket:'🚀',
}

interface PropsPostReaction{
    post: any
}

const PostReaction = ({post}:PropsPostReaction)=>{

    return(<>
    <div style={{display: "flex", flexDirection: "row", rowGap: '5px'}}>
       <span>{reaction.thumbsUp}</span>
       <span>{reaction.clap}</span>
       <span>{reaction.heart}</span>
       <span>{reaction.rocket}</span>
    </div>
    </>)
}

export default PostReaction;