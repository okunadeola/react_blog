import { Footer } from 'flowbite-react';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
import CallToAction from './CallToAction';
import { useLocation } from 'react-router-dom';
export default function FooterCom() {
  const location = useLocation();

  console.log(location.pathname.includes('/dashboard'))
  return (
    <>
      {
        !location.pathname.includes('/dashboard') &&
      <Footer container className="border border-t-1 dark:border-[#434040]  border-[#ddd]">
        <div className='w-full max-w-7xl mx-auto'>
          <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
            <div className='mt-5'>
            <div className='p-3'>
              <CallToAction />
            </div>
            </div>
            <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
              <div>
                <Footer.Title title='About' />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href='https://www.100jsprojects.com'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    100 JS Projects
                  </Footer.Link>
                  <Footer.Link
                    href='/about'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Tech Blog
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title='Follow us' />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href='https://www.github.com/sahandghavidel'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Github
                  </Footer.Link>
                  <Footer.Link href='#'>Discord</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title='Legal' />
                <Footer.LinkGroup col>
                  <Footer.Link href='#'>Privacy Policy</Footer.Link>
                  <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className='w-full sm:flex sm:items-center sm:justify-between'>
            <Footer.Copyright
              href='#'
              by="Tech blog"
              year={new Date().getFullYear()}
            />
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
              <Footer.Icon href='#' icon={BsFacebook}/>
              <Footer.Icon href='#' icon={BsInstagram}/>
              <Footer.Icon href='#' icon={BsTwitter}/>
              <Footer.Icon href='https://github.com/sahandghavidel' icon={BsGithub}/>
              <Footer.Icon href='#' icon={BsDribbble}/>

            </div>
          </div>
        </div>
      </Footer>
      }
    </>
  );
}
