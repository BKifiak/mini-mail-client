import { Email } from "../AppTypes";

type EmailListItemProps = {
  email: Email;
  onSelect: (email: Email) => void;
};

export default function EmailListItem({ email, onSelect }: EmailListItemProps) {
  const { id, avatar, subject, sender, date } = email;

  return (
    <div
      key={id}
      className="flex items-center px-4 py-3 border-b border-slate-300 cursor-pointer hover:bg-gray-100"
      onClick={() => onSelect(email)}
    >
      <img src={avatar} alt="" className="w-10 h-10 rounded-full mr-4" />
      <div className="flex flex-col flex-1 min-w-0">
        <div className="font-semibold truncate">{subject}</div>
        <div className="text-sm text-gray-600 truncate">{sender}</div>
        <div className="text-xs text-gray-400">{date}</div>
      </div>
    </div>
  );
}
