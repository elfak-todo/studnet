import axios from "axios";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Card, Spinner } from "react-bootstrap";
import { useState } from "react";

import CommentForm from "../commentForm/CommentForm";
import Comment from "../comment/Comment";

import "./CommentSection.style.css";

function CommentSection({
  postType,
  commentType,
  topComments,
  post,
  feed,
  setFeed,
}) {
  const { t } = useTranslation(["post"]);

  const [comments, setComments] = useState(topComments);
  const [noComments, setNoComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lessComments, setLessComments] = useState(false);

  function seeMoreComments() {
    if (!noComments) {
      setLoading(true);
      axios.get(`Comment/PostOrEvent?${postType}Id=${post.id}`).then((res) => {
        if (res.data.length === 0) {
          setNoComments(true);
          setLoading(false);
          setLessComments(true);
        } else {
          setComments(res.data);
          setLoading(false);
          setLessComments(true);
        }
      });
    } else {
      setLessComments(true);
    }
  }

  function seeLessComments() {
    const l = [];
    comments?.forEach((c) => {
      if (topComments !== null) {
          topComments.forEach((e) => {
            if (e.comment.id === c.comment.id) l.push(e);
          });
      }
    });
    setComments(l);
    setLessComments(false);
  }

  return (
    <div>
      <CommentForm
        postType={postType}
        post={post}
        comments={comments}
        setComments={setComments}
        setNoComments={setNoComments}
        setFeed={setFeed}
      />
      {comments !== null
        ? comments.map((c) => (
            <Comment
              key={c.comment.id}
              author={c.author}
              comment={c.comment}
              isLiked={c.liked}
              comments={comments}
              setComments={setComments}
              post={post}
              feed={feed}
              setFeed={setFeed}
              commentType={commentType}
            />
          ))
        : null}
      {loading && (
        <div className="comments-spinner">
          <Spinner
            className="text-center"
            as="span"
            animation="border"
            size="md"
            role="status"
            aria-hidden="true"
          />
        </div>
      )}
      {noComments && lessComments && (
        <Card.Text className="text-center"> {t("noComments")} </Card.Text>
      )}
      {!lessComments ? (
        <Card.Text className="see-comments-text" onClick={seeMoreComments}>
          {t("seeAllComments")} <FontAwesomeIcon icon={faChevronDown} />
        </Card.Text>
      ) : (
        <Card.Text className="see-comments-text" onClick={seeLessComments}>
          {t("seeLessComments")} <FontAwesomeIcon icon={faChevronUp} />
        </Card.Text>
      )}
    </div>
  );
}

export default CommentSection;
