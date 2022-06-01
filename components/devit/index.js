import Avatar from 'components/avatar';
import useTimeAgo from 'hooks/useTimeAgo';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Devit({id, avatar, username, name, message, img, createdAt = 0}) {
  const timeAgo = useTimeAgo(createdAt);
  const router = useRouter();

  const handleArticleClick = e => {
    e.preventDefault();
    router.push(`status/${id}`);
  };

  return (
    <>
      <article onClick={handleArticleClick}>
        <div>
          <Avatar
            src={avatar}
            alt={username}
            width={24}
            height={24}
          />
          <div></div>
        </div>
        <section>
          <header>
            <p><strong>{name ? name : username}</strong></p>
            <span>-</span>
            <Link href={`status/${id}`} >
              <a>
                <time>{timeAgo}</time>
              </a>
            </Link>
          </header>
          <p>{message}</p>
          {img && <img src={img} alt='img alt' />}
        </section>
      </article>
      <style jsx>{`
				article {
					display: flex;
					padding: 10px 15px;
					border-bottom: 1px solid #ccc;
				}

				article:hover {
					background-color: #f5f8fa;
					cursor: pointer;
				}

				article div:first-child {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 8px;
					min-width: 40px;
					min-height: 40px;
				}

				article div:first-child div:last-child {
					flex-grow: 1;
					border: 1px solid #0049ff;
				}

				article div:first-child + section {
					padding: 0 0 0 8px;
				}

				section {
					width: 100%;
				}

				header {
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				header a {
					font-size: min(1em, 3.5vw);
					color: #555;
					text-decoration: none;
				}

				header a:hover {
					text-decoration: underline;
				}

				img {
					margin-top: 10px;
					border-radius: 10px;
					height: auto;
					width: 100%;
				}
			`}</style>
    </>
  );
}