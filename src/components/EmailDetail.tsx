import { Email } from "../AppTypes";

type EmailDetailProps = {
  email: Email | null;
};

export default function EmailDetail({ email }: EmailDetailProps) {
  return (
    <div className="px-6 py-4">
      {email ? (
        <>
          <h2 className="text-2xl font-bold mb-2">{email.subject}</h2>
          <div className="text-gray-400 mb-4 text-sm">
            Von: <span className="text-black">{email.sender}</span> &lt;
            {email.email}&gt; am{" "}
            <span className="text-black">{email.date}</span>
          </div>
          <p>{email.body}</p>
        </>
      ) : (
        <h4 className="text-black text-center text-3xl p-4">
          Wähle eine E-Mail aus der Liste aus.
        </h4>
      )}
    </div>
  );
}
