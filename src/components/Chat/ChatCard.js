import React from "react";
import { formatRelative } from "date-fns";
import "./assets/Chat.css";

const ChatCard = ({ author, text, createdAt }) => {
    return (
        <>
            <div class="comment-thread">
                <div class="comment" id="comment-1">
                    <div class="comment-heading">
                        {/* <div class="comment-voting">
                            <button type="button">
                                <span aria-hidden="true">&#9650;</span>
                                <span class="sr-only">Vote up</span>
                            </button>
                            <button type="button">
                                <span aria-hidden="true">&#9660;</span>
                                <span class="sr-only">Vote down</span>
                            </button>
                        </div> */}
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

            {/* <div>
            {text}
            <p>{author}</p>
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
        </div> */}
        </>
    );
};

export default ChatCard;
