import { RichText } from "@graphcms/rich-text-react-renderer";
import { LinksFunction, LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { gql } from "graphql-request"
import { hygraph } from "~/utils/Hygraph.server";
import { PostId } from "~/utils/interface";
import Prism from 'prismjs'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import theme from 'prismjs/themes/prism-tomorrow.css'
import linenum from 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import { useEffect } from "react";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: theme },
    { rel: "stylesheet", href: linenum },
];

interface iAppProps{
    post: PostId;
};

export async function loader({ params }: LoaderArgs) {
    const query = gql`
        query Posts {
            post(where: {slug: "${params.slug}"}) {
                id
                overview
                publishedAt
                createdAt
                slug
                title
                body{
                    raw
                }
            }
        }
      
    `;

    const post = await hygraph.request(query);   

    return json({ post });
}

const PostSlug = () => {
    const { post } = useLoaderData() as iAppProps;
    

    useEffect(() => {
        Prism.highlightAll();
    },[]);

    return (
        <div className="xl:divide-y divide-gray-200 dark:divide-gray-700 lg:px-40">
            <header className="pt-6 xl:pb-6">
                <div className="space-y-1 text-center">
                    <div className="space-y-10">
                        <div className="">
                            <p className="text-base font-medium leading-8 text-teal-100">
                            {new Date(post.post.publishedAt).toISOString().split("T")[0]}
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <h1 className="text-3xl font-extrabold leading-9 trackingtight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                            {post.post.title}
                        </h1>
                    </div>
                </div>
            </header>

            <div className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-8">
                <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0 ">
                    <div className="prose max-w-none pt-10 pb-8 dark:prose-invert">
                        <RichText 
                            content={post.post.body.raw}
                            renderers={{
                                // code_block: (({ children }) => {
                                //     return (
                                //         <pre className="line-numbers language-javascript">
                                //             <code>{children}</code>
                                //         </pre>
                                //     );
                                // },
                                
                                img: ({ src, altText, height, width }) => (
                                    <img
                                        src={src}
                                        alt={altText}
                                        width={width}
                                        height={height}
                                        className="rounded-lg"
                                    />
                                ),
                                a: ({ children, openInNewTab, href, rel, ...rest }) => (
                                    <a
                                        href={href}
                                        target={openInNewTab ? "_blank" : "_self"}
                                        {...rest}
                                        className="text-teal-500 hover:text-teal-600"
                                    >
                                        {children}
                                    </a>
                                ),
                                
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostSlug;