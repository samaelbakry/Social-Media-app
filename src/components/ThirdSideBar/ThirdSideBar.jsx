import { Badge } from "@heroui/react";
import { LiaCheckDoubleSolid } from "react-icons/lia";

export default function ThirdSideBar() {
  const notifications = [
    {
      content: "@TinsleyClark started following you",
      time: "thursday 4:20pm",
    },
    {
      content: "@elenor_mac commented on your post",
      time: "Sunday 5:00am",
      message: " keep going you doing great!",
    },
    {
      content: "@elenor_mac liked your post",
      time: "Sunday 5:00am",
    },
  ];
  const messages = [
    { person: "Tinsley Clark", msg: " Lorem ipsum dolor sit amet" },
    { person: "Aila Foley", msg: " Lorem ipsum dolor sit amet" },
    { person: "Madisyn Wilkins", msg: " Lorem ipsum dolor sit amet" },
    { person: "Selene Heath", msg: " Lorem ipsum dolor sit amet" },
  ];

  return (
    <>
      <div className="flex justify-between m-3 p-2">
        <h3 className="font-bold text-lg">Your notifications</h3>
      </div>
      <div className="flex items-center justify-around shadow rounded-xl border-gray-500 p-3">
        <Badge color="danger" content="12" size="sm">
          <span className="cursor-pointer">view all</span>
        </Badge>
        <Badge color="danger" content="2" size="sm">
          <span className="cursor-pointer">mentions</span>
        </Badge>
        <Badge color="danger" content="8" size="sm">
          <span className="cursor-pointer">followers</span>
        </Badge>
        <Badge color="danger" content="2" size="sm">
          <span className="cursor-pointe">invites</span>
        </Badge>
      </div>

      {notifications.map((notify) => (
        <div className="flex justify-between items-center m-4">
          <div className="flex flex-col items-start">
            <span className="font-semibold">{notify.content}</span>
            <span>{notify.time}</span>
            {notify.message && (
              <span className="bg-gray-300 p-2 m-1 rounded-xl">
                {notify.message}
              </span>
            )}
          </div>
        </div>
      ))}
      <hr className="text-gray-300" />

      <div className="m-3 space-y-4 flex justify-between items-center">
        <h3 className="font-bold text-xl">Messages</h3>
        <span>
          <LiaCheckDoubleSolid className="inline-block mx-1 text-violet-900 text-lg" />
          Mark all as read
        </span>
      </div>
      {messages.map((msg) => (
        <div className="bg-gray-100 shadow border border-gray-300 flex flex-col p-3 opacity-60 rounded-2xl m-3 hover:scale-105 hover:opacity-100 duration-500 cursor-pointer">
          <span className="font-bold">{msg.person}</span>
          <span>{msg.msg}</span>
        </div>
      ))}
    </>
  );
}
