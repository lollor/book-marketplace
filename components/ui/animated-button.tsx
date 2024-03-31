import { LazyMotion, domAnimation, m } from 'framer-motion'

type Props = {
   children: React.ReactNode
}

export default function Page({children}: Props) {
   return (
      <LazyMotion features={domAnimation}>
         <m.button>
            {children}
         </m.button>
      </LazyMotion>
   )
}