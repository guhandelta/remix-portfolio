import { LoaderArgs, json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react";
import { gql } from "graphql-request"
import { hygraph } from "~/utils/Hygraph.server"
import { Post } from "~/utils/interface";
import { blogposts } from "./blogContent";

interface iAppProps{
    posts: Post;
}

export async function loader({ request }: LoaderArgs) {

    const query = gql`
    query Posts {
        posts {
            id
            title
            overview
            slug
            createdAt
            updatedAt
        }
    }     
    `
    const posts:Post = await hygraph.request(query);

    console.log(posts);

    // const sortedPosts = posts.sort((a.date,b.date) => {});
    
    return json({ posts });
}

const Blog = () => {

    const { posts } = useLoaderData() as iAppProps;

    // sorting all the posts from newest to oldest
    const sortedPosts = posts.posts.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    console.log("sortedPosts:\t", sortedPosts.length);
    
    
  return (
    <>
        <div className=" overflow-scroll">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-2 pt-6 pb-8 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
                    >
                        My Personal Blog
                    </h1>
                </div>
            </div>
            <ul>
                {sortedPosts.map(({ createdAt, slug, title, overview}) => (
                    <li key={5} className="py-4">
                        <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                            <div>
                                <p className="text-base font-medium leading-6 text-teal-500">
                                    {new Date(createdAt).toISOString().split("T")[0]}
                                </p>
                            </div>

                            <Link
                                to={`/post/${slug}`}
                                className="space-y-5 xl:col-span-3"
                                prefetch="intent" //Intent prefetching => Prefetches the data only when the user hovers over the post/link
                            >
                                <div className="space-y-5 xl:col-span-3">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
                                            {title}
                                        </h3>
                                    </div>
                                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                        {overview}
                                    </div>
                                </div>
                            </Link>
                        </article>
                    </li>
                ))}
            </ul>
        </div>
    </>
  )
}

export default Blog