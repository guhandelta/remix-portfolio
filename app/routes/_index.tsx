import { Link, NavLink } from "@remix-run/react"
import { Theme, useTheme } from 'remix-themes'
import { Disclosure } from "@headlessui/react"
import Me from '../../public/me.jpg'
import { SocialMediaIcons } from '~/components/_const'

const IndexPage = () => {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md space-x-5">
        <h1 className="text-3xl font-extrabold leading-9 tracing-light text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md leading-14">
          Home
        </h1>
      </div>

      <div className="items center spacey-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center pt-8">
          <img 
            className="h-40 w-40 rounded-full" 
            loading='lazy'  
            src={Me} 
            alt="Guhan" 
          />
          <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
            Guhaprasaanth Nandagopal
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Hi, I am Guha, a Fullstack Developer
          </p>
          <div className="flex space-x-5 pt-6">
            {SocialMediaIcons.map(({ sno, name, link, icon }) => (
              <a href={link} key={sno} target="_blank">
                {icon}
              </a>
            ))}
          </div>
        </div>
           <div className="prose max-w-none prose-lg pt-8 pb-8 dark:prose-invert xl:col-span-2">
            <p>
              Hi, I am Guhaprasaanth, a web developer and UI/UX designer passionate about creating beautiful, functional, and user-centered digital experiences. With five years of experience in the field. I always seek new and innovative ways to transform complex ideas and user requirements into elegant, user-friendly designs that enhance the user experience. With a deep understanding of responsive design principles, I strive to deliver pixel-perfect UIs across multiple platforms.
            </p>
            <p>
              My expertise extends beyond coding; I possess a keen eye for aesthetics and a strong understanding of user-centered design principles. I believe in the power of collaboration and enjoy working closely with cross-functional teams, including designers and backend developers, to ensure seamless integration of design concepts into functional interfaces.
            </p>
            <p>
              Whether I am working on a website, mobile app, or other digital product, I bring my commitment to design excellence and user-centered thinking to every project I work on. I look forward to the opportunity to bring my skills and passion to your next project.
            </p>
           </div>
      </div>
    </div>
  )
}

export default IndexPage