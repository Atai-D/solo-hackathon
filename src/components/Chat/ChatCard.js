import React from "react";
import { formatRelative } from "date-fns";
import "./assets/Chat.css";

const ChatCard = ({ author, text, createdAt }) => {
    return (
        <>
            <div class="comment-thread">
                <div class="comment" id="comment-1">
                    <div class="comment-heading">
                        <div class="comment-info">
                            <div class="comment-author">{author}</div>
                            <p class="m-0">
                                {createdAt?.seconds ? (
                                    <span>
                                        {formatRelative(
                                            new Date(createdAt.seconds * 1000),
                                            new Date()
                                        )}
                                    </span>
                                ) : (
                                    ""
                                )}
                            </p>
                        </div>
                    </div>

                    <div class="comment-body">{text}</div>
                </div>
            </div>
        </>
    );
};

export default ChatCard;
