import axios from "axios";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { Card, Container, Form, Spinner, Button } from "react-bootstrap";

import PostHeader from "./postHeader/PostHeader";
import PostFooter from "./postFooter/PostFooter";
import CommentSection from "../comments/commentSection/CommentSection";

import "./Post.style.css";

function Post({ feedEl, innerRef, feed, setFeed, pinned, verified }) {
  const author = feedEl.author;
  const comments = feedEl.comments;
  const post = feedEl.post;
  const liked = feedEl.liked;

  const { t } = useTranslation(["post", "misc"]);

  const [edit, setEdit] = useState(false);

  const [edited, setEdited] = useState(post.edited);
  const [loading, setLoading] = useState(false);

  const editTextInputRef = useRef();

  const handleEdit = (e) => {
    e.preventDefault();

    const editedText = editTextInputRef.current.value;

    if (editedText === "") return;

    setLoading(true);

    axios
      .put("Post/Edit", {
        id: post.id,
        text: editedText,
        verified: post.verified,
        pinned: post.pinned,
        anonymous: post.anonymous,
      })
      .then(() => {
        setLoading(false);
        setEdited(true);
        setFeed((prevState) => {
          return prevState.map((p) => {
            if (p.post.id === post.id) {
              p.post.text = editedText;
              return p;
            } else return p;
          });
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });

    setEdit(false);
  };

  return (
    <Container className="mb-3 mx-auto px-0" ref={innerRef}>
      <Card className={"post shadow-sm rounded" + (pinned && " pinned")}>
        <PostHeader
          author={author}
          post={post}
          feed={feed}
          setFeed={setFeed}
          setEdit={setEdit}
          pinnedProp={pinned}
          verifiedProp={verified}
        />
        <Card.Body>
          {edit ? (
            <Form noValidate onSubmit={handleEdit}>
              <Form.Control
                as="textarea"
                rows={5}
                type="text"
                defaultValue={post.text}
                ref={editTextInputRef}
              ></Form.Control>
              <div className="post-toolbar">
                <Button variant="primary" type="submit" className="mt-2">
                  {loading && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  {t("misc:saveChanges")}
                </Button>
              </div>
            </Form>
          ) : (
            <Card.Text> {post.text} </Card.Text>
          )}
          {edited && (
            <Card.Text style={{ fontSize: "small" }}> {t("edited")} </Card.Text>
          )}
          <PostFooter
            post={post}
            isLiked={liked}
            feed={feed}
            setFeed={setFeed}
          />
        </Card.Body>
        <Card.Footer className="p-0">
          <CommentSection
            postType="post"
            commentType="post"
            author={author}
            topComments={comments}
            post={post}
            feed={feed}
            setFeed={setFeed}
          />
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Post;
