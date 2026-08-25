"use client";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-sky-600 text-white rounded-br-md"
            : "bg-slate-700/80 text-slate-100 rounded-bl-md"
        }`}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="space-y-2">
            {message.content.split("\n").map((line, i) => {
              if (line.startsWith("```")) return null;

              if (line.startsWith("**") || line.startsWith("###")) {
                return (
                  <p key={i} className="font-semibold text-white">
                    {line.replace(/[#*]/g, "").trim()}
                  </p>
                );
              }

              if (line.startsWith("- ") || line.startsWith("• ")) {
                return (
                  <p key={i} className="pl-3">
                    <span className="mr-1 text-sky-400">&#8226;</span>
                    {line.slice(2)}
                  </p>
                );
              }

              if (line.trim() === "") return <div key={i} className="h-1" />;

              return <p key={i}>{line}</p>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
