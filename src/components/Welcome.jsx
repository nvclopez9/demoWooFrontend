import React, { useState, useEffect } from "react";
import { fetchFromApi } from "../helpers/apiHelper"; // API Helper for fetching posts

const WelcomePostsComponent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchFromApi("/wp/v2/posts/?per_page=5"); // Fetch the latest 5 posts
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      {/* Welcome Section */}
      <div className="max-w-3xl w-full bg-green-100 shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-green-800">
          Welcome to Our Store!
        </h1>
        <p className="text-gray-700 mb-4 text-center">
          Discover the latest updates, products, and news from our store. Stay
          tuned for exclusive deals and offers!
        </p>
        <p className="text-gray-700 text-center">
          Here are some of our recent updates:
        </p>
      </div>

      {/* Latest Posts Section */}
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
          Latest Posts
        </h2>

        {loading && (
          <p className="text-center text-gray-600">
            Loading the latest posts...
          </p>
        )}

        {!loading && posts.length > 0 && (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="border-b pb-4 last:border-b-0">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {post.title.rendered}
                  </a>
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Published on: {new Date(post.date).toLocaleDateString()}
                </p>
                {/* Render the full post content */}
                <div
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                ></div>
              </div>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-center text-gray-600">
            No posts available right now. Check back later!
          </p>
        )}
      </div>
    </section>
  );
};

export default WelcomePostsComponent;
