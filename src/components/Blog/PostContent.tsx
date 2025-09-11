// src/components/Blog/PostContent.tsx
import React from "react";
import VideoEmbed from "./VideoEmbed";
import { Post, Author } from "@src/types/blog";
import MarkdownRenderer from "./MarkdownRenderer";
import AuthorSignature from "./AuthorSignature";
interface PostContentProps {
    post: Post & { content: string }; // Markdown content
    author: Author;
}

const PostContent: React.FC<PostContentProps> = ({ post, author }) => (
    <article className="pst-ct">
        <div className="pst-ct_tl">
            <h2>{post.title}</h2>
        </div>
        <div className="pst-ct__post">
            {post.videoUrl && (
                <div className="pst-ct_V">
                    <VideoEmbed
                        url={post.videoUrl}
                        title={`Vidéo de ${post.title}`}
                    />
                </div>
            )}
            <div className="pst-ct__cnt">
                <MarkdownRenderer>{post.content}</MarkdownRenderer>
            </div>

            <AuthorSignature author={author} date={post.createdAt} />
        </div>
    </article>
);

export default PostContent;
