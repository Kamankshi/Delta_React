// import { useRef, useEffect, useMemo } from "react";
// import Markdown from "react-markdown";
// import styles from "./Chat.module.css";

// const WELCOME_MESSAGE_GROUP = [
//   {
//     role: "assistant",
//     content: "Hello! How can I assist you right now?",
//   },
// ];

// export function Chat({ messages }) {
//   const messagesEndRef = useRef(null);
//   const messagesGroups = useMemo(
//     () =>
//       messages.reduce((groups, message) => {
//         if (message.role === "user") groups.push([]);
//         groups[groups.length - 1].push(message);
//         return groups;
//       }, []),
//     [messages]
//   );

//   useEffect(() => {
//     const lastMessage = messages[messages.length - 1];

//     if (lastMessage?.role === "user") {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   return (
//     <div className={styles.Chat}>
//       {[WELCOME_MESSAGE_GROUP, ...messagesGroups].map(
//         (messages, groupIndex) => (
//           // Group
//           <div key={groupIndex} className={styles.Group}>
//             {messages.map(({ role, content }, index) => (
//               // Message
//               <div key={index} className={styles.Message} data-role={role}>
//                 <Markdown>{content}</Markdown>
//               </div>
//             ))}
//           </div>
//         )
//       )}

//       <div ref={messagesEndRef} />
//     </div>
//   );
// }

import { useRef, useEffect, useMemo } from "react";
import Markdown from "react-markdown";
import styles from "./Chat.module.css";

const WELCOME_MESSAGE_GROUP = [
  {
    role: "assistant",
    content: "Hello! How can I assist you right now?",
  },
];

export function Chat({ messages }) {
  const messagesEndRef = useRef(null);

  // Create message groups with better handling of user messages
  const messagesGroups = useMemo(() => {
    const groups = messages.reduce((groups, message) => {
      if (message.role === "user") groups.push([]);
      groups[groups.length - 1]?.push(message);
      return groups;
    }, []);
    return groups;
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.Chat}>
      {/* Render the welcome message first */}
      {!messages.length && (
        <div className={styles.Group}>
          {WELCOME_MESSAGE_GROUP.map(({ role, content }, index) => (
            <div key={index} className={styles.Message} data-role={role}>
              <Markdown>{content}</Markdown>
            </div>
          ))}
        </div>
      )}

      {/* Render all message groups */}
      {messagesGroups.map((group, groupIndex) => (
        <div key={groupIndex} className={styles.Group}>
          {group.map(({ role, content }, index) => (
            <div key={index} className={styles.Message} data-role={role}>
              <Markdown>{content}</Markdown>
            </div>
          ))}
        </div>
      ))}

      {/* Add the scrolling reference */}
      <div ref={messagesEndRef} />
    </div>
  );
}
