import { Link } from "react-router-dom";

export const Layout = (props) => {
  const { children } = props;
  return (
    <div className="flex h-screen">
      <section className="w-56 border-r-2 space-y-1">
        <Menu link={'chat-apps'}>add-friend</Menu>
        <Menu link={'chat-apps'}>Global-Chat</Menu>
      </section>

      <section className="flex-1 p-4">{children}</section>
    </div>
  );
};

const Menu = (props) => {
  const {link, children} = props;
  return (
  <Link
    to={link}
    className="flex items-center border border-black gap-2 bg-transparent px-3 py-2 font-medium transition duration-200"
  >
    {children}
  </Link>
  )
};
