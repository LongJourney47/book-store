"use client";

import { FC, HTMLAttributes, useContext } from "react";
import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
  const { messages } = useContext(MessagesContext);
  const inversMessages = [...messages].reverse();
  return (
    <>
      <div
        {...props}
        // merges the class names
        className={cn(
          "flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch",
          className
        )}
      >
        <div className="flex-1 flexgrow" />
        {inversMessages.map((message) => (
          <div key={message.id} className="chat-message">
            <div
              className={cn("flex items-end", {
                // seperates the messages by either side depending if it is by the user or not
                "justify-end": message.isUserMessage,
              })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden",
                  {
                    'bg-blue-600 text-white': message.isUserMessage,
                    'bg-gray-200 text-gray-900': !message.isUserMessage,
                  }
                )}
              >
                <p className={cn('px-4 py-2 rounded-lg', {
                  
                  'bg-blue-600 text-white': message.isUserMessage,
                  'bg-gray-200 text-gray-900': !message.isUserMessage,
                })}></p>
                {/* <MarkdownLite text={message.text}/> */}
                {message.text}
              </div>
            </div>
          </div>
        ))}
        {/* Chat Message */}
      </div>
    </>
  );
};

export default ChatMessages;
