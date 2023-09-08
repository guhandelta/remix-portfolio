import { LoaderArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react'
import { gql } from 'graphql-request';
import { BsGithub } from 'react-icons/bs'
import { hygraph } from '~/utils/Hygraph.server';
import { Apps } from '~/utils/interface';

interface iAppProps{
    projects: Apps;
}

export async function loader({} : LoaderArgs) {
    const query = gql`
        query Projects {
            projects {
                title
                summary
                image{
                  url
                }
                link
                github
            }
        }
      
    `;

    const projects = await hygraph.request(query);

    return json({projects});

}

const Projects = () => {

    const { projects } = useLoaderData() as iAppProps;

  return (
    <div className=" divide-y divide-gray-200 dark:divide-gray-700">
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        Personal Projects
      </h1>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-10 pt-8">
      {projects.projects.reverse().map(({id, title, summary, image, link, github}) => (
        <article key={id} className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800 dark:shadow-gray-700/25">
          <img
            src={image.url}
            alt={title}
            className="h-56 w-full object-cover"
          />
          <div className="p-4 sm:p-6">
            <a href={link} target="_blank">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {title}
              </h3>
            </a>

            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {summary}
            </p>

            <a
              href={github}
              target="_blank"
              className="group mt-4 inline-flex items-center gap-1 text-sm fotn-medium text-teal-500"
            >
              GitHub
              <span className="block transition-all group-hover:ms-0.5">
                &rarr;
              </span>
            </a>
          </div>
        </article>
      ))}
    </div>
    <div className="w-full flex flex-row justify-center my-12 py-12 bg-slate-500 font-extrabold text-6xl text-center">
        <a className='' target='_blank' href="https://github.com/guhandelta">
            <BsGithub className='hover:cursor-pointer ' />
        </a>
    </div>
  </div>
  )
}

export default Projects