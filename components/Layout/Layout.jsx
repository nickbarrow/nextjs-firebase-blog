import Head from "next/head";
import { signOut } from "@lib/firebase";
import { useAuth } from "@contexts/auth";
import styles from "./Layout.module.scss";

const Layout = ({ children, image, title, description }) => {
  const [user] = useAuth();

  return (
    <>
      <Head>
        <meta property="og:image" content={image} key="ogimage" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
      </Head>
      <div className={styles.Layout}>
        <nav>
          <span>
            <a href="/">My Next.js Blog</a>
          </span>
          {user && (
            <span>
              <button onClick={() => signOut()}>Sign Out</button>
            </span>
          )}
        </nav>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
