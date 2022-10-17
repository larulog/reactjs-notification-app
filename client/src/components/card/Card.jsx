import React, { useState } from "react";
import "./card.css";
import Heart from "../../images/heart.svg";
import HeartFilled from "../../images/heartFilled.svg";
import Comment from "../../images/comment.svg";
import Share from "../../images/share.svg";
import Info from "../../images/info.svg";

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    setLiked(!liked);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
    });
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullName}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <img
            src={HeartFilled}
            alt=""
            className="cardIcon"
            onClick={handleNotification}
          />
        ) : (
          <img
            src={Heart}
            alt=""
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        )}

        <img
          src={Comment}
          alt=""
          className="cardIcon"
          onClick={() => handleNotification(2)}
        />
        <img
          src={Share}
          alt=""
          className="cardIcon"
          onClick={() => handleNotification(3)}
        />
        <img src={Info} alt="" className="cardIcon infoIcon" />
      </div>
    </div>
  );
};

export default Card;
