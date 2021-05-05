import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { API } from "aws-amplify";
import { LikeOutlined } from "@ant-design/icons";

const Likes = ({ commentId, username }) => {
  const [likes, setLikes] = useState([]);

  const handleOnClickLike = commentId => {
    const userHasLikedComment =
      likes.filter(like => like.username.S === username).length > 0;
    if (!userHasLikedComment) {
      addLike(commentId);
    } else {
      removeLike();
    }
  };

  const addLike = async commentId => {
    try {
      const config = {
        body: { username, commentId },
        headers: {
          "Content-Type": "application/json"
        }
      };
      await API.post("todos", "/likes", config);
      fetchLikesCountByComment(commentId);
    } catch (err) {
      console.log("error creating like:", err);
    }
  };

  async function removeLike() {
    const likeId = likes.filter(like => like.username.S === username)[0].likeId
      .S;
    try {
      setLikes(likes.filter(like => like.likeId.S !== likeId));
      await API.del("todos", `/likes/${likeId}`);
      fetchLikesCountByComment(commentId);
    } catch (err) {
      console.log("error removing like:", err);
    }
  }

  const fetchLikesCountByComment = async commentId => {
    try {
      const res = await API.get("todos", `/likes?commentId=${commentId}`);
      setLikes(res.Items);
    } catch (err) {
      console.log("error fetching likes");
    }
  };

  useEffect(() => {
    fetchLikesCountByComment(commentId);
  }, []);

  return (
    <Button
      icon={<LikeOutlined />}
      onClick={() => handleOnClickLike(commentId)}
    >
      {likes.length > 0 ? likes.length : <div style={styles.placeholder}></div>}
    </Button>
  );
};

const styles = {
  placeholder: {
    width: "23px"
  }
};
export default Likes;
