import { Message } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { ReactNode, createContext, useState } from "react";
// will encompass mulitple components to avoid needing to repeatedly pass props to different files
// helps avoids prop drilling
export const MessagesContext = createContext<{
  // all components will have access and can manipulate the messages
  messages: Message[];
  // shows the loading
  isMessageUpdating: boolean;
  // will push the data from openai into the chat
  addMessage: (message: Message) => void;
  // removes messages if a problem occurs.
  removeMessage: (id: string) => void;
  // updates message has the data is recieved
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  //   shows the loading state to the user
  setIsMessageUpdating: (isUpdating: boolean) => void;
}>({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
});

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nanoid(),
      text: "Hello, how can I help you?",
      isUserMessage: false,
    },
  ]);

//   const addMessage = (message: Message) => {
//     setMessages((prev) => {
//       [...prev, message];
//     });
//   };

const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message])
  }

//   const removeMessage = (id: string) => {
//     setMessages((prev) => {
//       prev.filter((message) => {
//         message.id !== id;
//       });
//     });
//   };
const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id))
  }


  const updateMessage = (
    id: string,
    updateFn: (prevText: string) => string
  ) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return { ...message, text: updateFn(message.text) }
        }
        return message
      })
    )
  }

  return (
    <MessagesContext.Provider
      value={{
        messages,
        addMessage,
        removeMessage,
        updateMessage,
        isMessageUpdating,
        setIsMessageUpdating,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
